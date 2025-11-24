import './ResultDisplay.css'

function ResultDisplay({ result, model }) {
  if (!result) return null

  const getGliomaTypeLabel = (type) => {
    const labels = {
      'no_tumor': 'Tidak Ada Tumor',
      'glioma': 'Glioma',
      'meningioma': 'Meningioma',
      'pituitary': 'Pituitary',
      'low_grade': 'Low Grade Glioma',
      'high_grade': 'High Grade Glioma',
      // Tambahan untuk backend tabular
      'GBM': 'GBM (High Grade Glioma)',
      'LGG': 'LGG (Low Grade Glioma)',
    }
    return labels[type] || type
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#10b981'
    if (confidence >= 0.6) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="result-display">
      <h2 className="result-title">Hasil Klasifikasi</h2>
      
      <div className="result-content">
        <div className="result-main">
          <div className="prediction-label">
            <span className="label-text">Prediksi:</span>
            <span className="prediction-value">
              {getGliomaTypeLabel(result.prediction)}
            </span>
          </div>
          
          <div className="confidence-bar-container">
            <div className="confidence-label">
              <span>Tingkat Keyakinan (Akurasi):</span>
              <span 
                className="confidence-value"
                style={{ color: getConfidenceColor(result.confidence) }}
              >
                {(result.confidence * 100).toFixed(2)}%
              </span>
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{
                  width: `${Math.max(0, Math.min(100, result.confidence * 100))}%`,
                  backgroundColor: getConfidenceColor(result.confidence)
                }}
              ></div>
            </div>
            {result.confidence < 0.01 && (
              <p style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.85rem', 
                color: '#ef4444',
                fontStyle: 'italic'
              }}>
                ⚠️ Keyakinan sangat rendah. Pastikan semua field terisi dengan benar.
              </p>
            )}
          </div>
        </div>

        <div className="model-info">
          <span className="model-badge">
            Model: {model === 'ensemble' ? 'Ensemble (RF + MLP)' : model === 'mlp' ? 'MLP' : 'Random Forest'}
            {model === 'ensemble' && <span className="premium-indicator">⭐</span>}
          </span>
          {result.processingTime && (
            <span className="time-badge">
              ⏱️ {result.processingTime}ms
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay

