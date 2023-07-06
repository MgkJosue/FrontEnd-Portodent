import React from 'react';
import '../styles/SoporteTecnico.css'; // Asegúrate de tener el archivo de estilos SoporteTecnico.css correspondiente
import { Link } from 'react-router-dom';

export default function SoporteTecnico() {


  return (
    <><div className="soporte-tecnico">
      <h2>Soporte Técnico</h2>
      <pre>NOMBRE: ANGEL IGNACIO VELEZ MORALES</pre>
      <pre>TELEFONO: 0992187805</pre>
      <pre>CORRE0: angelchino757@gmail.com </pre>
      <pre>NOMBRE: JOSUE ISRAEL ALVAREZ GALARZA</pre>
      <pre>TELEFONO: 0962737556</pre>
      <pre>CORRE0: josue.alvarez9@hotmail.com</pre>

    </div>
    <Link to="/"><button>INICIO</button></Link>
    </>
  );
}
