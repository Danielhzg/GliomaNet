# Model MLP

Tempatkan file model MLP Anda di folder ini.

## Format Model yang Didukung:

1. **TensorFlow.js**: 
   - `model.json` dan folder `weights/`
   - Atau file `.h5` yang sudah dikonversi

2. **ONNX.js**:
   - File `.onnx`

3. **Format Lain**:
   - Sesuaikan dengan implementasi di `src/services/modelService.js`

## Cara Menggunakan:

1. Letakkan file model di folder ini
2. Update fungsi `loadModel()` dan `classifyImage()` di `src/services/modelService.js`
3. Sesuaikan preprocessing di `src/utils/imageProcessor.js` jika diperlukan

## Contoh Struktur:

```
mlp/
  ├── model.json
  └── weights/
      ├── weights_1.bin
      └── weights_2.bin
```

atau

```
mlp/
  └── model.onnx
```

