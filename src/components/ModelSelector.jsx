import './ModelSelector.css'

function ModelSelector({ selectedModel, onModelChange }) {
  return (
    <div className="model-selector">
      <h2 className="card-title">
        <span className="title-icon-small">⚙️</span>
        Pilih Model ML
      </h2>
      <div className="model-options">
        <label className={`model-option ${selectedModel === 'ensemble' ? 'active' : ''}`}>
          <input
            type="radio"
            name="model"
            value="ensemble"
            checked={selectedModel === 'ensemble'}
            onChange={(e) => onModelChange(e.target.value)}
          />
          <div className="model-card ensemble-card">
            <div className="model-badge-premium">⭐ PREMIUM</div>
            <div className="model-icon">🎯</div>
            <div className="model-name">Ensemble</div>
            <div className="model-desc">RF + MLP Combined</div>
            <div className="model-features">
              <span className="feature-tag">Best Accuracy</span>
            </div>
          </div>
        </label>

        <label className={`model-option ${selectedModel === 'mlp' ? 'active' : ''}`}>
          <input
            type="radio"
            name="model"
            value="mlp"
            checked={selectedModel === 'mlp'}
            onChange={(e) => onModelChange(e.target.value)}
          />
          <div className="model-card">
            <div className="model-icon">🧬</div>
            <div className="model-name">MLP</div>
            <div className="model-desc">Multi-Layer Perceptron</div>
          </div>
        </label>

        <label className={`model-option ${selectedModel === 'randomforest' ? 'active' : ''}`}>
          <input
            type="radio"
            name="model"
            value="randomforest"
            checked={selectedModel === 'randomforest'}
            onChange={(e) => onModelChange(e.target.value)}
          />
          <div className="model-card">
            <div className="model-icon">🌲</div>
            <div className="model-name">Random Forest</div>
            <div className="model-desc">Ensemble Learning</div>
          </div>
        </label>
      </div>
    </div>
  )
}

export default ModelSelector
