# Panduan Integrasi Backend untuk Model Ensemble

Karena model `ensemble_rf_mlp.joblib` menggunakan format Python scikit-learn, Anda perlu membuat backend API untuk menjalankannya.

## 📋 Prerequisites

- Python 3.8+
- Flask atau FastAPI
- scikit-learn
- PIL/Pillow
- numpy

## 🚀 Setup Backend dengan Flask

### 1. Install Dependencies

```bash
pip install flask flask-cors scikit-learn pillow numpy
```

### 2. Buat File `backend/app.py`

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS untuk frontend

# Load model ensemble
try:
    model = joblib.load('models/ensemble/ensemble_rf_mlp.joblib')
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

def preprocess_image(image_file):
    """
    Preprocess gambar untuk model
    Sesuaikan dengan preprocessing yang digunakan saat training
    """
    # Baca gambar
    image = Image.open(io.BytesIO(image_file.read()))
    
    # Convert ke grayscale jika diperlukan
    if image.mode != 'L':
        image = image.convert('L')
    
    # Resize ke ukuran yang dibutuhkan model (sesuaikan dengan training)
    # Contoh: resize ke 224x224
    image = image.resize((224, 224))
    
    # Convert ke numpy array
    img_array = np.array(image)
    
    # Flatten jika diperlukan (sesuaikan dengan input shape model)
    img_array = img_array.flatten()
    
    # Normalize (sesuaikan dengan normalisasi saat training)
    img_array = img_array / 255.0
    
    # Reshape sesuai kebutuhan model
    # Contoh: (1, 50176) untuk 224x224 grayscale
    img_array = img_array.reshape(1, -1)
    
    return img_array

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/api/classify', methods=['POST'])
def classify():
    """Endpoint untuk klasifikasi gambar"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        file = request.files['image']
        model_type = request.form.get('model', 'ensemble')
        
        # Preprocess image
        processed_image = preprocess_image(file)
        
        # Predict
        prediction = model.predict(processed_image)[0]
        
        # Get probabilities
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(processed_image)[0]
            class_names = model.classes_ if hasattr(model, 'classes_') else None
            
            # Create probabilities dict
            if class_names is not None:
                prob_dict = {str(class_name): float(prob) 
                           for class_name, prob in zip(class_names, probabilities)}
            else:
                prob_dict = {f'class_{i}': float(prob) 
                           for i, prob in enumerate(probabilities)}
        else:
            prob_dict = {}
        
        # Get confidence (max probability)
        confidence = float(max(probabilities)) if len(probabilities) > 0 else 0.0
        
        return jsonify({
            'prediction': str(prediction),
            'confidence': confidence,
            'probabilities': prob_dict,
            'model': model_type
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

### 3. Struktur Folder Backend

```
backend/
├── app.py
├── models/
│   └── ensemble/
│       └── ensemble_rf_mlp.joblib
└── requirements.txt
```

### 4. Update Frontend

Di `src/services/modelService.js`, uncomment dan update kode berikut:

```javascript
export async function classifyImage(imageData, modelType) {
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
}
```

Dan comment/hapus baris `return simulateClassification(modelType)`

## 🔧 Alternatif: FastAPI

Jika Anda lebih suka menggunakan FastAPI:

```python
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load('models/ensemble/ensemble_rf_mlp.joblib')

@app.post("/api/classify")
async def classify(
    image: UploadFile = File(...),
    model: str = Form("ensemble")
):
    # Preprocess dan predict
    # ... (sama seperti Flask)
    pass
```

## 📝 Catatan Penting

1. **Preprocessing**: Pastikan preprocessing di backend sama dengan saat training model
2. **Input Shape**: Sesuaikan resize dan reshape dengan input shape model Anda
3. **Class Names**: Pastikan class names sesuai dengan yang digunakan saat training
4. **CORS**: Pastikan CORS diaktifkan untuk mengizinkan request dari frontend
5. **Error Handling**: Tambahkan error handling yang lebih robust untuk production

## 🚀 Menjalankan

1. Start backend:
```bash
cd backend
python app.py
```

2. Start frontend:
```bash
npm run dev
```

3. Buka browser di `http://localhost:5173`

## 🔒 Production

Untuk production, gunakan:
- Gunicorn (Flask) atau Uvicorn (FastAPI)
- Nginx sebagai reverse proxy
- HTTPS
- Environment variables untuk konfigurasi

