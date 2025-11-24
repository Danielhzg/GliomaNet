import { useRef } from 'react'
import './ImageUpload.css'

function ImageUpload({ onImageSelect, selectedImage, disabled }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          onImageSelect({
            file: file,
            preview: event.target.result
          })
        }
        reader.readAsDataURL(file)
      } else {
        alert('Silakan pilih file gambar')
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onImageSelect({
          file: file,
          preview: event.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="image-upload">
      {selectedImage ? (
        <div className="image-preview-container">
          <div className="image-preview">
            <img src={selectedImage.preview} alt="Preview" />
            <button
              className="remove-image-btn"
              onClick={() => onImageSelect(null)}
              disabled={disabled}
            >
              ✕
            </button>
          </div>
          <p className="image-info">
            {selectedImage.file.name} ({(selectedImage.file.size / 1024).toFixed(2)} KB)
          </p>
        </div>
      ) : (
        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <div className="upload-icon">📁</div>
          <p className="upload-text">
            Klik atau drag & drop gambar MRI di sini
          </p>
          <p className="upload-hint">
            Format: JPG, PNG, atau DICOM
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload

