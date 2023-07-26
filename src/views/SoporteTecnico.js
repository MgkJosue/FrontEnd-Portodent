import React from 'react';
import '../styles/SoporteTecnico.css'; // Asegúrate de tener el archivo de estilos SoporteTecnico.css correspondiente
import { Link } from 'react-router-dom';
import angel from '../images/perfilAngel.jpg';
import josue from '../images/perfilJosue.jpg';

export default function SoporteTecnico() {


  return (
    <><div className="container-form">
      <div className='column'>
        <img src={angel} alt="Imagen 1" className='angel'/>
        <pre><strong>NOMBRE:</strong> ANGEL IGNACIO VELEZ MORALES</pre>
        <pre><strong>TELEFONO:</strong> 0992187805</pre>
        <pre><strong>CORRE0: </strong>angelchino757@gmail.com </pre>
      </div>
      <div className='column'>
        <img src={josue} alt="Imagen 2" className='josue'/>
        <pre><strong>NOMBRE:</strong> JOSUE ISRAEL ALVAREZ GALARZA</pre>
        <pre><strong>TELEFONO:</strong> 0962737556</pre>
        <pre><strong>CORRE0: </strong> josue.alvarez9@hotmail.com</pre>

      </div> 

    </div>
    <Link to="/"><button>INICIO</button></Link>
    </>
  );
}
