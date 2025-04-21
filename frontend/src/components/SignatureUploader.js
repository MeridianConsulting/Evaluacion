import React, { useState } from 'react';
import './SignatureUploader.css';

const SignatureUploader = ({ label, onChange, value }) => {
  const [previewUrl, setPreviewUrl] = useState(value || '');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validar tipo de archivo (solo imágenes)
    if (!file.type.startsWith('image/')) {
      setError('Por favor seleccione un archivo de imagen válido');
      return;
    }
    
    // Limitar tamaño (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no debe exceder 2MB');
      return;
    }
    
    // Crear URL para previsualización
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setError('');
    
    // Llamar al callback con el archivo
    if (onChange) onChange(file);
  };
  
  const handleRemove = () => {
    setPreviewUrl('');
    setError('');
    if (onChange) onChange(null);
  };

  return (
    <div className="signature-uploader">
      <label className="signature-label">{label}</label>
      <div className={`signature-area ${previewUrl ? 'has-image' : ''}`}>
        {previewUrl ? (
          <div className="signature-preview">
            <img src={previewUrl} alt="Firma" />
            <button 
              type="button" 
              className="remove-signature" 
              onClick={handleRemove}
              aria-label="Eliminar firma"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="signature-placeholder">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id={`signature-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="file-input"
            />
            <label 
              htmlFor={`signature-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="upload-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Subir imagen de firma
            </label>
          </div>
        )}
      </div>
      {error && <div className="signature-error">{error}</div>}
    </div>
  );
};

export default SignatureUploader; 