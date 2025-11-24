/**
 * Utility functions untuk memproses gambar sebelum klasifikasi
 */

/**
 * Resize image ke ukuran yang dibutuhkan model
 * @param {HTMLImageElement} img - Image element
 * @param {number} width - Target width
 * @param {number} height - Target height
 * @returns {HTMLCanvasElement} Canvas dengan gambar yang sudah di-resize
 */
export function resizeImage(img, width = 224, height = 224) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)
  return canvas
}

/**
 * Convert image ke grayscale
 * @param {HTMLImageElement} img - Image element
 * @returns {ImageData} Grayscale image data
 */
export function toGrayscale(img) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
    data[i] = gray
    data[i + 1] = gray
    data[i + 2] = gray
  }
  
  ctx.putImageData(imageData, 0, 0)
  return imageData
}

/**
 * Normalize pixel values ke range 0-1
 * @param {Array} pixels - Array of pixel values
 * @returns {Array} Normalized array
 */
export function normalizePixels(pixels) {
  return pixels.map(pixel => pixel / 255.0)
}

/**
 * Load image dari file
 * @param {File} file - Image file
 * @returns {Promise<HTMLImageElement>} Loaded image
 */
export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

