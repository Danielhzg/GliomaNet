import { useEffect, useMemo, useState } from "react";
import ResultDisplay from "../components/ResultDisplay";
import { fetchModelMeta, predictManual } from "../services/modelService";
import { getHumanLabel, getFieldDescription, getHumanOptions, convertToOriginalValue, FIELD_LABELS } from "../utils/fieldLabels";
import "./Classify.css";

function Classify() {
  // Meta dari backend untuk membangun form dinamis
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [threshold, setThreshold] = useState(null);

  const selectedModel = "ensemble"; // Fixed to ensemble (info untuk ResultDisplay)
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Daftar field rekomendasi - SESUAI DENGAN FORMAT TRAINING DATA
  // PENTING: Format harus EXACT match dengan training data (cat_levels dari feature_stats.json)
  // Note: IDH1, ATRX, TP53, dll di training adalah "MUTATED"/"NOT_MUTATED" tapi di-encode jadi 0/1 numeric
  const PREFERRED_FIELDS = [
    { name: "Age_at_diagnosis", label: "Usia saat diagnosis", type: "age_cat", placeholder: "Pilih usia" }, // Categorical dengan format "X years Y days"
    { name: "Gender", label: "Jenis Kelamin", type: "cat", options: ["Male", "Female", "--"] }, // Exact match dengan cat_levels
    { name: "Primary_Diagnosis", label: "Diagnosis Primer", type: "cat", options: ["Glioblastoma", "Astrocytoma, anaplastic", "Mixed glioma", "Oligodendroglioma, NOS", "Oligodendroglioma, anaplastic", "Astrocytoma, NOS", "--"] }, // WAJIB - ada di training
    { name: "Race", label: "Ras/Etnis", type: "cat", options: ["white", "black or african american", "asian", "not reported", "--"] }, // Exact match dengan cat_levels
    { name: "IDH1", label: "Status Mutasi IDH1", type: "binary", options: ["Tidak Bermutasi (0)", "Bermutasi (1)"], values: [0, 1] },
    { name: "ATRX", label: "Status Mutasi ATRX", type: "binary", options: ["Tidak Bermutasi (0)", "Bermutasi (1)"], values: [0, 1] },
    { name: "TP53", label: "Status Mutasi TP53", type: "binary", options: ["Tidak Bermutasi (0)", "Bermutasi (1)"], values: [0, 1] },
    { name: "EGFR", label: "Status Mutasi EGFR", type: "binary", options: ["Tidak Bermutasi (0)", "Bermutasi (1)"], values: [0, 1] },
    { name: "PTEN", label: "Status Mutasi PTEN", type: "binary", options: ["Tidak Bermutasi (0)", "Bermutasi (1)"], values: [0, 1] },
    { name: "PDGFRA", label: "Status Mutasi PDGFRA", type: "binary", options: ["Tidak Bermutasi (0)", "Bermutasi (1)"], values: [0, 1] },
  ];

  // Ambil meta saat mount dan gabungkan dengan PREFERRED_FIELDS
  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const meta = await fetchModelMeta();
        if (!isActive) return;
        const metaFields = meta.fields || [];
        // Buat map meta by name
        const metaMap = {};
        metaFields.forEach((mf) => { metaMap[mf.name] = mf; });

        // Bangun field yang akan ditampilkan (subset 9 field)
        const merged = PREFERRED_FIELDS.map((pf) => {
          const mf = metaMap[pf.name];
          
          // PRIORITAS 1: Untuk binary fields (IDH1, ATRX, dll), gunakan UI manusiawi
          // JANGAN di-overwrite oleh meta type!
          if (pf.type === "binary") {
            // Untuk binary, default selalu 0 (Tidak Bermutasi), bukan nilai desimal dari means
            // Karena di model, nilai 0-1 adalah binary (0 = tidak bermutasi, 1 = bermutasi)
            // Tapi means bisa desimal (misalnya 0.477), jadi kita round ke 0 atau 1
            let defaultBinary = 0;
            if (mf?.default !== undefined && mf.default !== null) {
              // Jika default dari meta > 0.5, berarti lebih cenderung bermutasi (1)
              // Jika <= 0.5, berarti tidak bermutasi (0)
              defaultBinary = parseFloat(mf.default) > 0.5 ? 1 : 0;
            }
            
            return {
              name: pf.name,
              label: getHumanLabel(pf.name) || pf.label || pf.name,
              description: getFieldDescription(pf.name),
              type: "binary", // PASTIKAN type tetap "binary", jangan di-overwrite!
              options: pf.options || ["Tidak Bermutasi (0)", "Bermutasi (1)"],
              values: pf.values || [0, 1], // Nilai yang akan dikirim ke backend
              default: defaultBinary, // Selalu 0 atau 1, bukan desimal
              placeholder: pf.placeholder || (FIELD_LABELS[pf.name]?.placeholder),
            };
          }
          
          // PRIORITAS 2: Untuk Age_at_diagnosis, gunakan format categorical dari training
          if (pf.name === "Age_at_diagnosis" && pf.type === "age_cat") {
            // Age_at_diagnosis di training adalah categorical dengan format "X years Y days"
            return {
              name: pf.name,
              label: getHumanLabel(pf.name) || pf.label || pf.name,
              description: getFieldDescription(pf.name) || "Pilih usia saat diagnosis (format: X years Y days)",
              type: "cat", // Categorical sesuai training data
              options: mf?.options || pf.options || [],
              originalOptions: mf?.options || [],
              default: mf?.default || "--",
              placeholder: pf.placeholder || "Pilih usia",
            };
          }
          
          if (!mf) {
            // Gunakan label manusiawi jika ada
            return {
              ...pf,
              label: getHumanLabel(pf.name) || pf.label || pf.name,
              description: getFieldDescription(pf.name),
            };
          }
          
          // PRIORITAS 3: Untuk field lain, gunakan type dari meta atau PREFERRED_FIELDS
          // Gabungkan info dari meta dengan label manusiawi
          const humanOptions = mf.type === "cat" && mf.options 
            ? getHumanOptions(pf.name, mf.options)
            : mf.options || pf.options;
          
          return {
            name: pf.name,
            label: getHumanLabel(pf.name) || pf.label || pf.name,
            description: getFieldDescription(pf.name),
            type: pf.type || mf.type, // Prioritaskan type dari PREFERRED_FIELDS
            options: humanOptions,
            originalOptions: mf.options || pf.options, // Simpan original untuk dikirim ke backend
            default: mf.default,
            placeholder: pf.placeholder || (FIELD_LABELS[pf.name]?.placeholder),
          };
        });

        setFields(merged);
        setThreshold(meta.threshold ?? null);
        // set default values
        const initial = {};
        merged.forEach((f) => {
          if (f.type === "binary") {
            // Untuk binary, default adalah index 0 atau 1 (Tidak Bermutasi atau Bermutasi)
            // Pastikan selalu integer 0 atau 1
            const defaultVal = f.default !== undefined && f.default !== null 
              ? (parseInt(f.default) === 1 ? 1 : 0)
              : 0;
            initial[f.name] = defaultVal;
          } else if (f.type === "cat" || f.type === "age_cat") {
            // Untuk categorical (termasuk Age_at_diagnosis), gunakan default dari meta atau first option
            initial[f.name] = f.default ?? (f.options?.[0] ?? "");
          } else if (f.type === "num") {
            // Untuk numeric, jika default adalah string, kosongkan
            if (typeof f.default === "string") {
              initial[f.name] = "";
            } else {
              initial[f.name] = f.default ?? "";
            }
          } else {
            initial[f.name] = f.default ?? (f.options?.[0] ?? "");
          }
        });
        setFormValues(initial);
      } catch (e) {
        if (!isActive) return;
        setError(e?.message || "Gagal memuat metadata model");
      }
    })();
    return () => {
      isActive = false;
    };
  }, []);

  const isReady = useMemo(() => fields && fields.length > 0, [fields]);

  const handleClassify = async () => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Convert human-readable values back to original format untuk dikirim ke backend
      // PENTING: Format harus EXACT match dengan training data (cat_levels)
      const backendPayload = {};
      fields.forEach((field) => {
        const value = formValues[field.name];
        
        if (field.type === "binary") {
          // Untuk binary fields, value adalah index (0 atau 1), langsung kirim nilai numeric
          // Pastikan selalu integer 0 atau 1 (bukan string, bukan desimal)
          let binaryValue = typeof value === "number" ? value : (field.values?.[value] ?? 0);
          binaryValue = binaryValue === 1 ? 1 : 0; // Force to 0 or 1
          backendPayload[field.name] = binaryValue; // Numeric 0 atau 1
        } else if (field.type === "cat" || field.type === "age_cat") {
          // Untuk categorical (termasuk Age_at_diagnosis), gunakan exact value dari originalOptions atau value langsung
          // Pastikan format sesuai dengan cat_levels (case-sensitive, exact match)
          if (field.originalOptions && field.originalOptions.length > 0) {
            // Cari index di options, lalu ambil dari originalOptions
            const optionIndex = field.options?.indexOf(value);
            if (optionIndex !== undefined && optionIndex >= 0 && field.originalOptions[optionIndex]) {
              backendPayload[field.name] = field.originalOptions[optionIndex];
            } else {
              // Jika tidak ditemukan, gunakan value langsung (harus exact match dengan cat_levels)
              backendPayload[field.name] = value;
            }
          } else {
            // Gunakan value langsung (harus exact match dengan cat_levels)
            backendPayload[field.name] = value;
          }
        } else if (field.type === "num") {
          // Untuk numeric, pastikan dikirim sebagai number (bukan string)
          if (value === "" || value === null || value === undefined) {
            backendPayload[field.name] = null; // Backend akan handle dengan default
          } else {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              backendPayload[field.name] = numValue; // Numeric, bukan string
            } else {
              backendPayload[field.name] = null;
            }
          }
        } else {
          backendPayload[field.name] = value;
        }
      });
      
      // Pastikan semua field yang diperlukan ada (termasuk yang tidak di form)
      // Backend akan handle missing fields dengan default, tapi kita log untuk debugging
      console.log("📤 Payload yang dikirim ke backend:", JSON.stringify(backendPayload, null, 2));

      // Debug: log payload yang dikirim
      console.log("Payload ke backend:", backendPayload);
      
      const resp = await predictManual(backendPayload);
      
      // Debug: log response untuk memastikan probability ada
      console.log("Backend response:", resp);
      
      // Pastikan probability valid (bukan 0, null, atau undefined)
      let probability = resp.probability;
      
      // Jika probability tidak ada, coba ambil dari prob_gbm
      if (probability === undefined || probability === null) {
        probability = resp.prob_gbm;
      }
      
      // Jika masih tidak ada, gunakan 0.5 sebagai default (50%)
      if (probability === undefined || probability === null || isNaN(probability)) {
        console.warn("Warning: Probability tidak valid, menggunakan default 0.5");
        probability = 0.5;
      }
      
      // Clamp probability antara 0-1
      probability = Math.max(0, Math.min(1, parseFloat(probability)));
      
      // Jika probability sangat kecil (< 0.01), mungkin ada masalah dengan model
      if (probability < 0.01 && resp.label) {
        console.warn("Warning: Probability sangat kecil (< 1%), mungkin ada masalah dengan input data atau model");
      }
      
      // Adaptasi ke struktur ResultDisplay
      const adapted = {
        prediction: resp.label || "LGG", // 'GBM' | 'LGG'
        confidence: probability, // Sudah di-clamp 0-1
        probabilities: {
          GBM: probability,
          LGG: 1 - probability,
        },
        processingTime: undefined,
        model: selectedModel,
        threshold: resp.threshold || 0.05,
      };
      
      console.log("Adapted result:", adapted);
      console.log("Confidence (Akurasi):", (probability * 100).toFixed(2) + "%");
      setResult(adapted);
      
      // Scroll ke hasil setelah render
      setTimeout(() => {
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
          resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } catch (err) {
      console.error("Classification error:", err);
      setError(err.message || "Terjadi kesalahan saat melakukan klasifikasi");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    // reset ke default meta
    const resetVals = {};
    fields.forEach((f) => {
      if (f.type === "binary") {
        // Pastikan selalu 0 atau 1
        const defaultVal = f.default !== undefined && f.default !== null 
          ? (parseInt(f.default) === 1 ? 1 : 0)
          : 0;
        resetVals[f.name] = defaultVal;
      } else if (f.type === "cat" || f.type === "age_cat") {
        // Untuk categorical (termasuk Age_at_diagnosis), gunakan default dari meta
        resetVals[f.name] = f.default ?? (f.options?.[0] ?? "");
      } else if (f.type === "num") {
        // Untuk numeric, jika default adalah string, kosongkan
        if (typeof f.default === "string") {
          resetVals[f.name] = "";
        } else {
          resetVals[f.name] = f.default ?? "";
        }
      } else {
        resetVals[f.name] = f.default ?? (f.options?.[0] ?? "");
      }
    });
    setFormValues(resetVals);
    setResult(null);
    setError(null);
  };

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="classify-page">
      <div className="classify-header">
        <h1 className="page-title">
          <img src="/certan.png" alt="Certan Icon" className="title-icon" />
          Klasifikasi Glioma (Input Manual)
        </h1>
        <p className="page-subtitle">
          Masukkan nilai fitur sesuai form di bawah untuk melakukan klasifikasi
          menggunakan Ensemble Model (RF + MLP). Nilai kosong akan diisi default
          dari statistik training.
        </p>
        <div className="model-badge-header">
          <span className="badge-icon">⭐</span>
          <span>Ensemble Model - Akurasi Tinggi</span>
        </div>
      </div>

      <div className="classify-content">
        <div className="container">
          <div className="classify-grid">
            {/* Dynamic Form Section */}
            <div className="card upload-card">
              <h2 className="card-title">Form Fitur</h2>
              {!isReady ? (
                <p style={{ textAlign: "center", color: "#2c3e50" }}>
                  Memuat metadata form...
                </p>
              ) : (
                <div className="form-grid human-grid">
                  {fields.map((f) => (
                    <div key={f.name} className="form-field">
                      <label className="form-label" htmlFor={f.name}>
                        {f.label || f.name}
                        {f.description && (
                          <span className="field-tooltip" title={f.description}>
                            ℹ️
                          </span>
                        )}
                      </label>
                      {f.description && (
                        <p className="field-description">{f.description}</p>
                      )}
                      {f.type === "binary" ? (
                        <select
                          id={f.name}
                          className="form-input"
                          value={formValues[f.name] ?? 0}
                          onChange={(e) =>
                            handleChange(f.name, parseInt(e.target.value))
                          }
                          disabled={isProcessing}
                        >
                          {(f.options || []).map((opt, idx) => (
                            <option key={idx} value={idx}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (f.type === "cat" || f.type === "age_cat") ? (
                        <select
                          id={f.name}
                          className="form-input"
                          value={formValues[f.name] ?? ""}
                          onChange={(e) =>
                            handleChange(f.name, e.target.value)
                          }
                          disabled={isProcessing}
                        >
                          {(f.options || []).map((opt, idx) => {
                            // Gunakan original option value untuk value attribute
                            const originalValue = f.originalOptions?.[idx] || opt;
                            return (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <input
                          id={f.name}
                          type="number"
                          step="any"
                          className="form-input"
                          placeholder={f.placeholder || ""}
                          value={formValues[f.name] ?? ""}
                          onChange={(e) =>
                            handleChange(f.name, e.target.value)
                          }
                          disabled={isProcessing}
                        />
                      )}
                    </div>
                  ))}
                  {threshold != null && (
                    <div className="threshold-hint">
                      Threshold model: <b>{threshold}</b>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="card action-card">
              <div className="button-group">
                <button
                  className="btn btn-primary"
                  onClick={handleClassify}
                  disabled={isProcessing || !isReady}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      Klasifikasi
                    </>
                  )}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                  disabled={isProcessing || !isReady}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Results Section */}
            {(result || error) && (
              <div className="card result-card">
                {error ? (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                  </div>
                ) : (
                  <ResultDisplay result={result} model={selectedModel} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classify;
