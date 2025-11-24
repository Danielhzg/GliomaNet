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
            {/* Info tooltip untuk GBM dan LGG */}
            <div style={{ 
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: result.prediction === 'GBM' ? '#fef2f2' : '#f0fdf4',
              border: `1px solid ${result.prediction === 'GBM' ? '#fecaca' : '#86efac'}`,
              borderRadius: '8px',
              fontSize: '0.85rem',
              lineHeight: '1.6'
            }}>
              {result.prediction === 'GBM' ? (
                <div>
                  <div style={{ fontWeight: '600', color: '#991b1b', marginBottom: '0.5rem' }}>
                    🔴 GBM (Glioblastoma Multiforme)
                  </div>
                  <div style={{ color: '#1e293b' }}>
                    GBM adalah tumor otak ganas (Grade IV) yang sangat agresif. Memiliki prognosis yang lebih buruk 
                    dibandingkan LGG. Pengobatan biasanya meliputi operasi, radioterapi, dan kemoterapi. 
                    Mutasi umum: EGFR, PTEN, TP53, sering tanpa mutasi IDH1/IDH2.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>
                    🟢 LGG (Low Grade Glioma)
                  </div>
                  <div style={{ color: '#1e293b' }}>
                    LGG adalah tumor otak dengan tingkat keganasan rendah (Grade I-II). Tumbuh lebih lambat dan 
                    memiliki prognosis yang lebih baik, terutama pada pasien dengan mutasi IDH1/IDH2. 
                    Mutasi umum: IDH1/IDH2, ATRX, TP53, CIC, FUBP1.
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="confidence-bar-container">
            <div className="confidence-label">
              <span>Tingkat Keyakinan Model:</span>
              <span 
                className="confidence-value"
                style={{ color: getConfidenceColor(result.confidence) }}
              >
                {(result.confidence * 100).toFixed(2)}%
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
              Model yakin {result.prediction === 'LGG' ? 'LGG' : 'GBM'} dengan probabilitas {(result.confidence * 100).toFixed(2)}%
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
            
            {/* Probabilitas untuk kedua kelas */}
            {result.probabilities && (
              <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  color: '#2c3e50',
                  marginBottom: '0.75rem'
                }}>
                  Probabilitas Prediksi:
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '150px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem',
                      fontSize: '0.85rem'
                    }}>
                      <span style={{ fontWeight: '600' }}>LGG (Low Grade):</span>
                      <span style={{ 
                        color: result.prediction === 'LGG' ? '#10b981' : '#64748b',
                        fontWeight: result.prediction === 'LGG' ? '700' : '400'
                      }}>
                        {((result.probabilities.LGG || 0) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${((result.probabilities.LGG || 0) * 100)}%`,
                        height: '100%',
                        backgroundColor: result.prediction === 'LGG' ? '#10b981' : '#94a3b8',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ flex: '1', minWidth: '150px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem',
                      fontSize: '0.85rem'
                    }}>
                      <span style={{ fontWeight: '600' }}>GBM (High Grade):</span>
                      <span style={{ 
                        color: result.prediction === 'GBM' ? '#ef4444' : '#64748b',
                        fontWeight: result.prediction === 'GBM' ? '700' : '400'
                      }}>
                        {((result.probabilities.GBM || 0) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${((result.probabilities.GBM || 0) * 100)}%`,
                        height: '100%',
                        backgroundColor: result.prediction === 'GBM' ? '#ef4444' : '#94a3b8',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
          
          {/* Warning untuk default fields */}
          {result.warning && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: result.defaultFieldsCount > (result.totalFields || 24) * 0.5 
                ? '#fef2f2' 
                : '#fffbeb',
              border: `1px solid ${result.defaultFieldsCount > (result.totalFields || 24) * 0.5 
                ? '#fecaca' 
                : '#fde68a'}`,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: result.defaultFieldsCount > (result.totalFields || 24) * 0.5 
                ? '#991b1b' 
                : '#92400e'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                ⚠️ {result.defaultFieldsCount > (result.totalFields || 24) * 0.5 ? 'Peringatan Akurasi' : 'Informasi'}
              </div>
              <div>{result.warning}</div>
              {result.defaultFields && result.defaultFields.length > 0 && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
                  Field yang menggunakan default: {result.defaultFields.slice(0, 5).join(', ')}
                  {result.defaultFields.length > 5 && ` dan ${result.defaultFields.length - 5} lainnya`}
                </div>
              )}
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: '500' }}>
                💡 Tip: Untuk akurasi maksimal, lengkapi semua field mutation di form.
              </div>
            </div>
          )}
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

