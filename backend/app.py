from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import json
import os

# =======================
# LOAD MODEL & METADATA
# =======================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "ensemble_rf_mlp.joblib")
th_path    = os.path.join(BASE_DIR, "threshold.txt")
stats_path = os.path.join(BASE_DIR, "feature_stats.json")

voter = joblib.load(model_path)
THRESHOLD = float(open(th_path).read().strip())
STATS = json.load(open(stats_path))

COLUMNS = STATS["columns"]          # urutan kolom saat training
MEANS   = STATS["means"]            # default numeric
MODES   = STATS["modes"]            # default categorical
CATS    = set(STATS["categoricals"])  # nama kolom kategorikal
CAT_LVL = STATS.get("cat_levels", {})  # opsi untuk kolom kategorikal

app = Flask(__name__)
# Enable CORS untuk frontend React
CORS(app, resources={r"/*": {"origins": "*"}})

# =======================
# HELPER: bangun 1 baris input
# =======================

def build_input_row(user_data: dict) -> pd.DataFrame:
    """
    user_data: dict dari JSON request (key = nama kolom, value = nilai)
    Kembalikan: DataFrame 1-baris dengan urutan kolom = COLUMNS (tanpa 'Grade')
    
    PENTING: Validasi format input sesuai dengan training data (cat_levels)
    """
    row = {}
    validation_errors = []
    
    for col in COLUMNS:
        if col.lower() == "grade":
            # target tidak boleh dikirim ke model
            continue

        val = user_data.get(col, None)

        # kalau tidak ada di request → pakai default
        if val is None or val == "":
            if col in CATS:
                val = MODES.get(col, "MISSING")
                validation_errors.append(f"{col}: menggunakan default '{val}' (nilai kosong)")
            else:
                val = MEANS.get(col, 0.0)
                validation_errors.append(f"{col}: menggunakan default {val} (nilai kosong)")
        else:
            # cast numerik bila kolom numeric di train
            if col not in CATS:
                try: 
                    val = float(val)
                    # Validasi: binary fields harus 0 atau 1
                    if col in ["IDH1", "TP53", "ATRX", "PTEN", "EGFR", "PDGFRA", "CIC", "MUC16", 
                               "PIK3CA", "NF1", "PIK3R1", "FUBP1", "RB1", "NOTCH1", "BCOR", 
                               "CSMD3", "SMARCA4", "GRIN2A", "IDH2", "FAT4"]:
                        if val not in [0.0, 1.0]:
                            validation_errors.append(f"{col}: nilai {val} bukan 0 atau 1, menggunakan {round(val)}")
                            val = round(val)  # Round ke 0 atau 1
                except: 
                    validation_errors.append(f"{col}: nilai '{val}' tidak valid (numeric), menggunakan default {MEANS.get(col, 0.0)}")
                    val = MEANS.get(col, 0.0)
            else:
                # Validasi categorical: pastikan value ada di cat_levels
                val = str(val)
                valid_levels = CAT_LVL.get(col, [])
                if valid_levels and val not in valid_levels:
                    # Coba case-insensitive match
                    val_lower = val.lower()
                    matched = None
                    for level in valid_levels:
                        if level.lower() == val_lower:
                            matched = level
                            break
                    
                    if matched:
                        validation_errors.append(f"{col}: '{val}' tidak exact match, menggunakan '{matched}'")
                        val = matched
                    else:
                        validation_errors.append(f"{col}: '{val}' tidak ada di cat_levels, menggunakan default '{MODES.get(col, 'MISSING')}'")
                        val = MODES.get(col, "MISSING")
        
        row[col] = val
    
    # Log validation errors untuk debugging
    if validation_errors:
        print(f"[WARNING] Validation issues:")
        for err in validation_errors:
            print(f"  - {err}")
    
    df_in = pd.DataFrame([row],
                         columns=[c for c in COLUMNS if c.lower() != "grade"])
    return df_in

# =======================
# ROUTES
# =======================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "GliomaNet Flask API is running",
        "health": "ok"
    })

@app.route("/meta", methods=["GET"])
def meta():
    """Metadata untuk membangun form React secara dinamis."""
    fields = []
    for col in COLUMNS:
        if col.lower() == "grade":
            continue  # skip target column
            
        if col in CATS:
            opts = CAT_LVL.get(col, [MODES.get(col, "MISSING")])
            default = MODES.get(col, "MISSING")
            if default not in opts:
                opts = [default] + opts
            fields.append({
                "name": col,
                "type": "cat",
                "options": opts[:50],  # limit to top 50
                "default": default
            })
        else:
            default = MEANS.get(col, 0.0)
            fields.append({
                "name": col,
                "type": "num",
                "default": default
            })
    return jsonify({
        "threshold": THRESHOLD,
        "fields": fields
    })

@app.route("/predict", methods=["POST"])
def predict():
    """
    Request body bisa 2 format:
    1. {"data": {"Age_at_diagnosis": 56, ...}}  (format lama)
    2. {"Age_at_diagnosis": 56, ...}  (format baru - langsung object)
    """
    if not request.is_json:
        return jsonify({"error": "Request content-type must be application/json"}), 400

    payload = request.get_json()
    
    # Support 2 format: {"data": {...}} atau langsung {...}
    if "data" in payload and isinstance(payload["data"], dict):
        user_data = payload["data"]
    elif isinstance(payload, dict):
        user_data = payload
    else:
        return jsonify({"error": "Body harus berisi objek dengan field data atau langsung object"}), 400

    # bangun DataFrame 1-baris sesuai kolom training
    print(f"[DEBUG] Raw user_data received: {user_data}")
    df_in = build_input_row(user_data)
    
    # Debug: log input DataFrame
    print(f"[DEBUG] Input DataFrame shape: {df_in.shape}")
    print(f"[DEBUG] Input DataFrame columns: {df_in.columns.tolist()}")
    print(f"[DEBUG] Input DataFrame values:\n{df_in.to_dict('records')[0]}")
    
    # Validasi: cek apakah banyak field yang menggunakan default
    default_count = 0
    for col in df_in.columns:
        val = df_in[col].iloc[0]
        if col in CATS:
            if val == MODES.get(col, "MISSING"):
                default_count += 1
        else:
            if abs(float(val) - MEANS.get(col, 0.0)) < 0.0001:
                default_count += 1
    
    if default_count > len(df_in.columns) * 0.5:
        print(f"[WARNING] {default_count}/{len(df_in.columns)} field menggunakan default value!")
        print(f"[WARNING] Ini mungkin menyebabkan prediksi tidak akurat!")

    # prediksi probabilitas
    try:
        proba = voter.predict_proba(df_in)
        print(f"[DEBUG] Raw probabilities shape: {proba.shape}")
        print(f"[DEBUG] Raw probabilities: {proba}")
        
        # Ambil probabilitas kelas 1 (GBM)
        if proba.shape[1] > 1:
            proba_gbm = proba[:, 1]
        else:
            # Jika hanya 1 kelas, gunakan probabilitas kelas 0
            proba_gbm = proba[:, 0]
        
        proba_gbm = np.nan_to_num(proba_gbm, nan=0.5)  # Default 0.5 jika NaN
        p = float(proba_gbm[0])
        
        print(f"[DEBUG] Probability GBM: {p}")
        print(f"[DEBUG] Threshold: {THRESHOLD}")
        
        # Pastikan probability valid
        if p < 0 or p > 1 or np.isnan(p):
            print(f"[WARNING] Invalid probability: {p}, using default 0.5")
            p = 0.5
        
        pred = int(p >= THRESHOLD)
        label = "GBM" if pred == 1 else "LGG"
        
        print(f"[DEBUG] Prediction: {pred}, Label: {label}")
        
    except Exception as e:
        print(f"[ERROR] Prediction error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500

    return jsonify({
        "probability": p,  # alias untuk prob_gbm
        "prob_gbm": p,
        "threshold": float(THRESHOLD),
        "prediction": pred,
        "pred_label": label,
        "label": label  # alias untuk pred_label
    })

# =======================
# MAIN
# =======================

if __name__ == "__main__":
    # host="0.0.0.0" supaya bisa diakses dari device lain di jaringan yang sama
    app.run(host="0.0.0.0", port=5000, debug=True)
