# Model Ensemble RF + MLP

Tempatkan file model ensemble Anda di folder ini.

## File Model

- **ensemble_rf_mlp.joblib** - Model ensemble yang menggabungkan Random Forest dan MLP

## Format Model

Model ini menggunakan format `.joblib` dari scikit-learn Python, yang berarti:

1. **Perlu Backend API**: Model Python tidak bisa dijalankan langsung di browser
2. **Rekomendasi**: Buat backend API (Flask/FastAPI) untuk menjalankan model

## Cara Menggunakan

### Opsi 1: Backend API (Recommended)

1. Buat backend API dengan Flask atau FastAPI
2. Letakkan file `ensemble_rf_mlp.joblib` di server backend
3. Update `classifyImage()` di `src/services/modelService.js` untuk memanggil API

### Contoh Backend API (Flask)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load('ensemble_rf_mlp.joblib')

@app.route('/api/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    # Process image and predict
    # ... preprocessing code ...
    
    prediction = model.predict(processed_image)
    probabilities = model.predict_proba(processed_image)
    
    return jsonify({
        'prediction': prediction[0],
        'confidence': float(max(probabilities[0])),
        'probabilities': dict(zip(model.classes_, probabilities[0]))
    })

if __name__ == '__main__':
    app.run(port=5000)
```

### Update Frontend

Di `src/services/modelService.js`, update `classifyImage()`:

```javascript
export async function classifyImage(imageData, modelType) {
  const formData = new FormData()
  formData.append('image', imageData.file)
  formData.append('model', modelType)
  
  const response = await fetch('http://localhost:5000/api/classify', {
    method: 'POST',
    body: formData
  })
  
  if (!response.ok) {
    throw new Error('Gagal melakukan klasifikasi')
  }
  
  return await response.json()
}
```

## Struktur Folder

```
ensemble/
  └── ensemble_rf_mlp.joblib
```

