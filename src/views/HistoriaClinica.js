import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HistoriaClinica.css';
import { Link } from 'react-router-dom';


function HistorialClinico() {
  const { pacienteId } = useParams();
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [historialClinico, setHistorialClinico] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

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
    const obtenerConsultasHistoriaClinica = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/historias_clinicas/${pacienteId}/consultas`);
        const consultas = response.data;
        setConsultas(consultas);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerConsultasHistoriaClinica();
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
        <div className="historial-clinico-container">
          <div className="contenido-historial">
            <p>ID de Historia Clínica: {historialClinico.ID_HistoriaC}</p>
            {consultas.length ? consultas.map(consulta => (
              <div className="consulta-item" key={consulta.consultaId}>
                <p>Fecha de la consulta: {consulta.FechaConsulta}</p>
                {/* Aquí puedes agregar más campos del objeto consulta como lo desees */}
              </div>
            )) : (
              <p>No existen consultas enlazadas a este historial clínico</p>
            )}
          </div>
          <div className="crear-consulta-container">
            <button onClick={() => navigate('/consulta-form', { state: { historiaId: historialClinico.ID_HistoriaC } })}>Crear Consulta</button>
          </div>
        </div>
      ) : (
        <p className="carga-historial">Cargando historial clínico...</p>
      )}
      <Link to="/buscar-paciente"><button>REGRESAR</button></Link>
    </div>
  );
}

export default HistorialClinico;