import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="page-title">
          <span className="title-icon">ℹ️</span>
          Tentang GliomaNet
        </h1>
        <p className="page-subtitle">
          Sistem klasifikasi tumor otak Glioma menggunakan teknologi Machine Learning terdepan
        </p>
      </div>

      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <div className="about-card">
              <h2 className="section-title">Apa itu GliomaNet?</h2>
              <p className="section-text">
                GliomaNet adalah aplikasi web berbasis AI untuk klasifikasi tumor otak Glioma 
                menggunakan Ensemble Model yang menggabungkan Random Forest dan Multi-Layer 
                Perceptron (MLP). Sistem ini dirancang untuk membantu tenaga medis dalam 
                melakukan diagnosis awal dengan akurasi tinggi.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-card">
              <h2 className="section-title">Jenis Glioma yang Diklasifikasikan</h2>
              <div className="glioma-types">
                <div className="glioma-type-item" style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '12px',
                  border: '2px solid #bae6fd'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#0369a1',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>🔴</span> GBM (Glioblastoma Multiforme)
                  </h3>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#1e293b',
                    marginBottom: '1rem'
                  }}>
                    <strong>GBM (Glioblastoma Multiforme)</strong> adalah jenis tumor otak ganas (high-grade glioma) 
                    yang paling agresif dan umum terjadi pada orang dewasa. GBM termasuk dalam grade IV menurut 
                    klasifikasi WHO dan merupakan jenis glioma dengan prognosis terburuk.
                  </p>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: '#0369a1',
                      marginBottom: '0.75rem'
                    }}>
                      Karakteristik GBM:
                    </h4>
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0,
                      margin: 0
                    }}>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Tingkat keganasan:</strong> Sangat tinggi (Grade IV)
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Pertumbuhan:</strong> Sangat cepat dan invasif
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Prognosis:</strong> Umumnya buruk, dengan survival rate rendah
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Mutasi umum:</strong> EGFR, PTEN, TP53, sering tanpa mutasi IDH1/IDH2
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Pengobatan:</strong> Operasi, radioterapi, dan kemoterapi (Temozolomide)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glioma-type-item" style={{ 
                  padding: '1.5rem',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '2px solid #86efac'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#166534',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>🟢</span> LGG (Low Grade Glioma)
                  </h3>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#1e293b',
                    marginBottom: '1rem'
                  }}>
                    <strong>LGG (Low Grade Glioma)</strong> adalah jenis tumor otak dengan tingkat keganasan rendah 
                    (grade I-II menurut klasifikasi WHO). LGG tumbuh lebih lambat dibandingkan GBM dan memiliki 
                    prognosis yang lebih baik, terutama pada pasien dengan mutasi IDH1/IDH2.
                  </p>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: '#166534',
                      marginBottom: '0.75rem'
                    }}>
                      Karakteristik LGG:
                    </h4>
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0,
                      margin: 0
                    }}>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Tingkat keganasan:</strong> Rendah hingga sedang (Grade I-II)
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Pertumbuhan:</strong> Lambat dan kurang invasif
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Prognosis:</strong> Lebih baik, dengan survival rate yang lebih tinggi
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Mutasi umum:</strong> IDH1/IDH2, ATRX, TP53, CIC, FUBP1 (pada oligodendroglioma)
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Jenis LGG:</strong> Astrocytoma, Oligodendroglioma, Oligoastrocytoma
                      </li>
                      <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        <strong>Pengobatan:</strong> Operasi, observasi, atau radioterapi tergantung kondisi
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="about-card">
              <h2 className="section-title">Teknologi</h2>
              <div className="tech-list">
                <div className="tech-item">
                  <div className="tech-icon">🌲</div>
                  <div className="tech-info">
                    <h3>Random Forest</h3>
                    <p>
                      Ensemble learning method yang menggunakan multiple decision trees 
                      untuk meningkatkan akurasi dan mengurangi overfitting.
                    </p>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">🧬</div>
                  <div className="tech-info">
                    <h3>Multi-Layer Perceptron (MLP)</h3>
                    <p>
                      Neural network dengan multiple hidden layers yang mampu mempelajari 
                      pola kompleks dari data gambar MRI.
                    </p>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">🎯</div>
                  <div className="tech-info">
                    <h3>Ensemble Method</h3>
                    <p>
                      Kombinasi Random Forest dan MLP menggunakan voting mechanism untuk 
                      menghasilkan prediksi yang lebih akurat dan robust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="about-card">
              <h2 className="section-title">Cara Kerja</h2>
              <div className="workflow">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Upload Gambar</h3>
                    <p>Upload gambar MRI otak dalam format JPG, PNG, atau DICOM</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Preprocessing</h3>
                    <p>Gambar diproses dan dinormalisasi untuk input model</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Klasifikasi</h3>
                    <p>Ensemble model melakukan prediksi menggunakan RF dan MLP</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Hasil</h3>
                    <p>Mendapatkan prediksi dengan confidence score dan probabilitas</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
