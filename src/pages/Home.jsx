import "./Home.css";
import BrainIcon from "../components/BrainIcon";

function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">⭐</span>
            <span>Ensemble Model (RF + MLP)</span>
          </div>
          <h1 className="hero-title">
            Klasifikasi Data Tabular
            <span className="title-highlight"> dengan AI</span>
          </h1>
          <p className="hero-description">
            Sistem cerdas untuk klasifikasi data tabular menggunakan teknologi
            Machine Learning terdepan dengan akurasi tinggi
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => onNavigate("classify")}
              className="btn-hero btn-primary-hero"
            >
              <span>🚀</span>
              Mulai Klasifikasi
            </button>
            <button
              onClick={() => onNavigate("features")}
              className="btn-hero btn-secondary-hero"
            >
              <span>📚</span>
              Pelajari Fitur
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">
              <BrainIcon size={48} />
            </div>
            <div className="card-text">AI Powered</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">📊</div>
            <div className="card-text">High Accuracy</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">⚡</div>
            <div className="card-text">Fast Processing</div>
          </div>
        </div>
      </section>

      <section className="features-preview">
        <div className="container">
          <h2 className="section-title">Mengapa GliomaNet?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span>🎯</span>
              </div>
              <h3 className="feature-title">Akurasi Tinggi</h3>
              <p className="feature-desc">
                Menggunakan Ensemble Model yang menggabungkan Random Forest dan
                MLP untuk hasil klasifikasi yang lebih akurat
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>⚡</span>
              </div>
              <h3 className="feature-title">Cepat & Efisien</h3>
              <p className="feature-desc">
                Proses klasifikasi yang cepat dengan teknologi machine learning
                terdepan
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>🎨</span>
              </div>
              <h3 className="feature-title">Mudah Digunakan</h3>
              <p className="feature-desc">
                Interface yang user-friendly, cukup upload gambar dan dapatkan
                hasilnya
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Siap untuk Mencoba?</h2>
            <p className="cta-description">
              Mulai klasifikasi data Anda sekarang dengan teknologi AI terdepan
            </p>
            <button onClick={() => onNavigate("classify")} className="btn-cta">
              <span>🔍</span>
              Mulai Sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
