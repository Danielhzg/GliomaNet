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
