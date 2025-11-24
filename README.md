# GliomaNet - Brain Tumor Classification

Aplikasi web untuk klasifikasi tumor otak Glioma menggunakan algoritma MLP (Multi-Layer Perceptron) dan Random Forest.

## 🧠 Deskripsi

GliomaNet adalah aplikasi berbasis web yang memungkinkan pengguna untuk mengunggah gambar MRI otak dan melakukan klasifikasi tumor menggunakan model machine learning. Aplikasi ini mendukung dua algoritma:

- **MLP (Multi-Layer Perceptron)**: Neural network untuk klasifikasi
- **Random Forest**: Ensemble learning method

## 🚀 Fitur

- ✅ Upload gambar MRI dengan drag & drop
- ✅ Pilihan model ML (MLP atau Random Forest)
- ✅ Tampilan hasil klasifikasi yang informatif
- ✅ Visualisasi probabilitas untuk semua kelas
- ✅ UI modern dan responsif
- ✅ Siap untuk integrasi model yang sudah dilatih

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn

## 🛠️ Instalasi

1. Clone repository atau download project
2. Install dependencies:

```bash
npm install
```

## 💻 Penggunaan

### Development Mode

Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Struktur Project

```
gliomanet/
├── public/
│   ├── models/
│   │   ├── mlp/              # Tempat model MLP
│   │   └── randomforest/      # Tempat model Random Forest
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ImageUpload.jsx    # Komponen upload gambar
│   │   ├── ModelSelector.jsx  # Komponen pilih model
│   │   └── ResultDisplay.jsx  # Komponen tampilan hasil
│   ├── services/
│   │   └── modelService.js    # Service untuk klasifikasi
│   ├── utils/
│   │   └── imageProcessor.js  # Utility untuk proses gambar
│   ├── App.jsx                # Komponen utama
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
└── package.json
```

## 🔧 Integrasi Model

### Menambahkan Model MLP

1. Letakkan file model di `public/models/mlp/`
2. Format yang didukung:
   - TensorFlow.js: `model.json` + folder `weights/`
   - ONNX: `model.onnx`
3. Update fungsi `loadModel()` dan `classifyImage()` di `src/services/modelService.js`

### Menambahkan Model Random Forest

1. Letakkan file model di `public/models/randomforest/`
2. **Opsi 1**: Buat backend API (Flask/FastAPI) untuk menjalankan model Python
3. **Opsi 2**: Konversi model ke format ONNX dan letakkan di folder tersebut
4. Update `classifyImage()` di `src/services/modelService.js`

### Contoh Implementasi

Lihat file `src/services/modelService.js` untuk contoh implementasi. Saat ini menggunakan simulasi untuk development. Ganti fungsi `simulateClassification()` dengan implementasi sebenarnya setelah model diintegrasikan.

## 🎨 Teknologi yang Digunakan

- **React 19** - UI Framework
- **Vite** - Build tool dan dev server
- **CSS3** - Styling dengan modern CSS features

## 📝 Catatan

- Aplikasi saat ini menggunakan simulasi klasifikasi untuk development
- Setelah model diintegrasikan, hapus fungsi `simulateClassification()` di `modelService.js`
- Pastikan model yang digunakan kompatibel dengan format yang didukung

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik.

## 👤 Author

Dibuat untuk proyek klasifikasi tumor otak Glioma menggunakan MLP dan Random Forest.

---

**Note**: Pastikan untuk mengintegrasikan model yang sudah dilatih sebelum menggunakan aplikasi untuk klasifikasi yang sebenarnya.
