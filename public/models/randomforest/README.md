# Model Random Forest

Tempatkan file model Random Forest Anda di folder ini.

## Format Model yang Didukung:

1. **Python (scikit-learn)**:
   - File `.pkl` atau `.joblib`
   - **Note**: Model Python perlu backend API atau konversi ke format browser-compatible

2. **ONNX.js**:
   - File `.onnx` (jika model sudah dikonversi)

3. **Format Lain**:
   - Sesuaikan dengan implementasi di `src/services/modelService.js`

## Cara Menggunakan:

### Opsi 1: Backend API (Recommended)
1. Buat backend API (Flask/FastAPI) untuk menjalankan model Python
2. Update `classifyImage()` di `src/services/modelService.js` untuk memanggil API
3. Letakkan file `.pkl` atau `.joblib` di backend server

### Opsi 2: Konversi ke ONNX
1. Konversi model Random Forest ke format ONNX
2. Letakkan file `.onnx` di folder ini
3. Update `loadModel()` dan `classifyImage()` di `src/services/modelService.js`

## Contoh Struktur:

```
randomforest/
  └── model.pkl
```

atau (jika dikonversi ke ONNX)

```
randomforest/
  └── model.onnx
```

