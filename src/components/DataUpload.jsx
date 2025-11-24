import { useRef } from "react";
import "./DataUpload.css";

function DataUpload({ onDataSelect, selectedData, disabled }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (
        validFormats.includes(file.type) ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onDataSelect({
            file: file,
            content: event.target.result,
          });
        };
        reader.readAsText(file);
      } else {
        alert("Silakan pilih file CSV atau Excel (.xls, .xlsx)");
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      const validFormats = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (
        validFormats.includes(file.type) ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onDataSelect({
            file: file,
            content: event.target.result,
          });
        };
        reader.readAsText(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="data-upload">
      {selectedData ? (
        <div className="data-preview-container">
          <div className="data-preview">
            <div className="file-icon">📊</div>
            <div className="file-details">
              <p className="file-name">{selectedData.file.name}</p>
              <p className="file-size">
                ({(selectedData.file.size / 1024).toFixed(2)} KB)
              </p>
            </div>
            <button
              className="remove-data-btn"
              onClick={() => onDataSelect(null)}
              disabled={disabled}
            >
              ✕
            </button>
          </div>
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
            Klik atau drag & drop file data Anda di sini
          </p>
          <p className="upload-hint">Format: CSV atau Excel (.xls, .xlsx)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            disabled={disabled}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
}

export default DataUpload;
