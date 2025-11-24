import "./Features.css";
import {
  EnsembleIcon,
  FastIcon,
  ChartIcon,
  SecureIcon,
  UserFriendlyIcon,
  AIIcon,
} from "../components/FeatureIcons";

function Features() {
  const features = [
    {
      icon: <EnsembleIcon size={64} />,
      title: "Ensemble Model",
      description:
        "Menggabungkan Random Forest dan MLP untuk akurasi klasifikasi yang lebih tinggi",
      details: [
        "Random Forest untuk pattern recognition",
        "MLP untuk deep learning capabilities",
        "Voting mechanism untuk hasil optimal",
      ],
    },
    {
      icon: <FastIcon size={64} />,
      title: "Cepat & Efisien",
      description: "Proses klasifikasi yang cepat tanpa mengorbankan akurasi",
      details: [
        "Processing time < 3 detik",
        "Optimized algorithm",
        "Real-time results",
      ],
    },
    {
      icon: <ChartIcon size={64} />,
      title: "Hasil Detail",
      description: "Mendapatkan probabilitas untuk semua kelas tumor",
      details: [
        "Confidence score untuk setiap prediksi",
        "Probabilitas semua kelas",
        "Visualisasi yang informatif",
      ],
    },
    {
      icon: <SecureIcon size={64} />,
      title: "Aman & Privat",
      description: "Data Anda tetap aman dan privasi terjaga",
      details: [
        "No data storage",
        "Secure processing",
        "Privacy-first approach",
      ],
    },
    {
      icon: <UserFriendlyIcon size={64} />,
      title: "User Friendly",
      description: "Interface yang mudah digunakan untuk semua kalangan",
      details: ["Drag & drop upload", "Intuitive design", "Responsive layout"],
    },
    {
      icon: <AIIcon size={64} />,
      title: "AI Powered",
      description:
        "Teknologi Machine Learning terdepan untuk klasifikasi medis",
      details: [
        "State-of-the-art algorithms",
        "Continuous improvement",
        "Research-backed methods",
      ],
    },
  ];

  return (
    <div className="features-page">
      <div className="features-header">
        <h1 className="page-title">
          <span className="title-icon">📚</span>
          Fitur GliomaNet
        </h1>
        <p className="page-subtitle">
          Temukan berbagai fitur canggih yang membuat GliomaNet menjadi solusi
          terbaik untuk klasifikasi tumor otak Glioma
        </p>
      </div>

      <div className="features-content">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card-large"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon-large">{feature.icon}</div>
                <h3 className="feature-title-large">{feature.title}</h3>
                <p className="feature-description-large">
                  {feature.description}
                </p>
                <ul className="feature-details">
                  {feature.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="detail-icon">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <section className="tech-section">
          <div className="container">
            <h2 className="section-title">Teknologi yang Digunakan</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <div className="tech-icon">🌲</div>
                <h3>Random Forest</h3>
                <p>
                  Ensemble learning method yang menggabungkan multiple decision
                  trees
                </p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">🧬</div>
                <h3>Multi-Layer Perceptron</h3>
                <p>
                  Neural network dengan multiple hidden layers untuk deep
                  learning
                </p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">🎯</div>
                <h3>Ensemble Method</h3>
                <p>
                  Kombinasi kedua model untuk akurasi dan robustitas yang lebih
                  tinggi
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Features;
