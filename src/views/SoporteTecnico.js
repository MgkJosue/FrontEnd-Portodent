import React from 'react';
import '../styles/SoporteTecnico.css'; // Asegúrate de tener el archivo de estilos SoporteTecnico.css correspondiente

export default function SoporteTecnico({ onViewChange }) {
  const handleViewChange = (view) => {
    onViewChange(view);
  };

  return (
    <div className="soporte-tecnico">
      <h2>Soporte Técnico</h2>
      <pre>NOMBRE: ANGEL IGNACIO VELEZ MORALES</pre>
      <pre>TELEFONO: 0992187805</pre>
      <pre>CORRE0: angelchino757@gmail.com </pre>
      <pre>NOMBRE: JOSUE ALVAREZ</pre>
      <pre>TELEFONO: 0123456789</pre>
      <pre> CORRE0: EJEMPLO@gmail.com</pre>

      <button onClick={() => handleViewChange('principal')}>INICIO</button>
    </div>
  );
}
