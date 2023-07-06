
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/HistoriaClinica.css';

function HistorialClinico() {
  const { pacienteId } = useParams();
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [historialClinico, setHistorialClinico] = useState(null);

  useEffect(() => {
    const obtenerHistorialClinico = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/historias_clinicas/${pacienteId}`);
        const historiaClinica = response.data;
        setHistorialClinico(historiaClinica);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerHistorialClinico();
  }, [pacienteId]);

  useEffect(() => {
    const obtenerNombrePaciente = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pacientes/${pacienteId}`);
        const paciente = response.data;
        setNombrePaciente(`${paciente.Nombre} ${paciente.Apellido}`);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerNombrePaciente();
  }, [pacienteId]);

  return (
    <div className="historial-container">
      <h1 className="titulo-historial">HISTORIAL CLÍNICO DE {nombrePaciente}</h1>
      {historialClinico ? (
        <div className="contenido-historial">
          {/* Renderizar los datos del historial clínico aquí */}
          <p>ID de Historia Clínica: {historialClinico.ID_Historia}</p>
          {/* ...otros campos del historial clínico */}
        </div>
      ) : (
        <p className="carga-historial">Cargando historial clínico...</p>
      )}
    </div>
  );
}

export default HistorialClinico;
