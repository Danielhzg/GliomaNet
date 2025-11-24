// Service untuk memanggil model ML
// Integrasi ke backend Flask (@backend/app.py)

/**
 * Fungsi untuk melakukan klasifikasi gambar menggunakan model ML
 * @param {Object} imageData - Object berisi file dan preview image
 * @param {string} modelType - 'mlp', 'randomforest', atau 'ensemble'
 * @returns {Promise<Object>} Hasil klasifikasi
 */
export async function classifyImage(imageData, modelType) {
  // Legacy (tidak dipakai lagi untuk backend tabular). Dibiarkan untuk kompatibilitas.
  // Simulasi untuk development
  return simulateClassification(modelType);

  // Implementasi sebenarnya untuk model ensemble (.joblib):
  /*
  const formData = new FormData()
  formData.append('image', imageData.file)
  formData.append('model', modelType)
  
  // Ganti dengan URL backend API Anda
  const API_URL = 'http://localhost:5000/api/classify'
  
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData
  })
  
  if (!response.ok) {
    throw new Error('Gagal melakukan klasifikasi')
  }
  
  return await response.json()
  */
}

/**
 * Fungsi untuk memuat model ML (jika menggunakan TensorFlow.js atau ONNX.js)
 * @param {string} modelType - 'mlp' atau 'randomforest'
 */
export async function loadModel(modelType) {
  // TODO: Implementasi loading model
  // keep param to avoid lint "defined but never used" while implementation pending
  void modelType;
  // Contoh untuk TensorFlow.js:
  /*
  const modelPath = `/models/${modelType}/model.json`
  const model = await tf.loadLayersModel(modelPath)
  return model
  */

  // Contoh untuk ONNX.js:
  /*
  const modelPath = `/models/${modelType}/model.onnx`
  const session = new onnx.InferenceSession()
  await session.loadModel(modelPath)
  return session
  */
}

/**
 * Fungsi untuk memproses gambar sebelum diklasifikasi
 * @param {File} imageFile - File gambar
 * @returns {Promise<Array>} Array data gambar yang sudah diproses
 */
export async function preprocessImage(imageFile) {
  // TODO: Implementasi preprocessing sesuai kebutuhan model
  // keep param to avoid lint "defined but never used" while implementation pending
  void imageFile;
  // Contoh: resize, normalize, convert ke tensor, dll
  return null;
}

// ===================== Backend (tabular) integration =====================
const DEFAULT_BACKEND_URL = "http://localhost:5000";
function getBackendUrl() {
  // Bisa diubah lewat env VITE_BACKEND_URL
  const url = typeof import.meta !== "undefined" ? import.meta.env?.VITE_BACKEND_URL : undefined;
  return (url && String(url).trim().length > 0) ? url : DEFAULT_BACKEND_URL;
}

/**
 * Ambil metadata field dari backend untuk membangun form dinamis
 * @returns {Promise<{threshold:number, fields:Array<{name:string,type:'num'|'cat',options?:string[],default:any}>}>}
 */
export async function fetchModelMeta() {
  const res = await fetch(`${getBackendUrl()}/meta`, { method: "GET" });
  if (!res.ok) {
    throw new Error("Gagal mengambil metadata model");
  }
  return await res.json();
}

/**
 * Kirim satu baris fitur sebagai JSON ke backend /predict
 * @param {Record<string, any>} payload - key sesuai nama kolom training
 * @returns {Promise<{probability:number, threshold:number, prediction:number, label:string}>}
 */
export async function predictManual(payload) {
  const res = await fetch(`${getBackendUrl()}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),  // Backend support langsung object atau {"data": {...}}
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal melakukan prediksi");
  }
  const data = await res.json();
  // Normalize response format
  return {
    probability: data.probability || data.prob_gbm || 0,
    threshold: data.threshold || 0,
    prediction: data.prediction || (data.pred_label === "GBM" ? 1 : 0),
    label: data.label || data.pred_label || "LGG"
  };
}

// Simulasi klasifikasi untuk development (hapus setelah model diintegrasikan)
function simulateClassification(modelType) {
  return new Promise((resolve) => {
    // Ensemble model biasanya lebih akurat, jadi confidence lebih tinggi
    const baseDelay = modelType === "ensemble" ? 2000 : 1500;
    const baseConfidence = modelType === "ensemble" ? 0.75 : 0.6;

    setTimeout(() => {
      const gliomaTypes = ["no_tumor", "glioma", "low_grade", "high_grade"];
      const prediction =
        gliomaTypes[Math.floor(Math.random() * gliomaTypes.length)];
      const confidence = baseConfidence + Math.random() * (1 - baseConfidence);

      const probabilities = {
        no_tumor: Math.random() * 0.3,
        glioma: Math.random() * 0.3,
        low_grade: Math.random() * 0.3,
        high_grade: Math.random() * 0.3,
      };

      // Normalize probabilities
      const sum = Object.values(probabilities).reduce((a, b) => a + b, 0);
      Object.keys(probabilities).forEach((key) => {
        probabilities[key] = probabilities[key] / sum;
      });

      // Set prediction probability lebih tinggi
      probabilities[prediction] = confidence;

      // Renormalize setelah set prediction
      const newSum = Object.values(probabilities).reduce((a, b) => a + b, 0);
      Object.keys(probabilities).forEach((key) => {
        probabilities[key] = probabilities[key] / newSum;
      });

      resolve({
        prediction: prediction,
        confidence: confidence,
        probabilities: probabilities,
        processingTime: Math.floor(
          Math.random() * 500 + (modelType === "ensemble" ? 300 : 200)
        ),
        model: modelType,
      });
    }, baseDelay); // Simulasi delay
  });
}
