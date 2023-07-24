import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HistoriaClinica.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { saveAs } from 'file-saver';

function HistorialClinico() {
  const { pacienteId } = useParams();
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [historialClinico, setHistorialClinico] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [fechaBusqueda, setFechaBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();
  const consultasPorPagina = 5;

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

  const verConsulta = (consultaId) => {
    navigate(`/ver-consulta/${consultaId}`);
  };

  const filtrarConsultasPorFecha = () => {
    if (fechaBusqueda) {
      const consultasFiltradas = consultas.filter(consulta => consulta.FechaConsulta === fechaBusqueda);
      return consultasFiltradas;
    } else {
      return consultas;
    }
  };

  const handlePageChange = (event, value) => {
    setPagina(value);
  };

  //imprimir en excel 
  const handleImprimir = (consultaId) => {
    axios({
      url: `http://localhost:8000/consultas/${consultaId}/download`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      let filename = 'default.xlsx';
      try {
        filename = response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '');
      } catch (e) {
        console.log('No se pudo extraer el nombre del archivo, se usará el nombre por defecto.');
      }
      saveAs(new Blob([response.data]), filename);
    }).catch((error) => {
      console.error("Error al descargar el archivo: ", error);
    });
  }
  

  const consultasFiltradas = filtrarConsultasPorFecha();
  const consultasMostradas = consultasFiltradas.slice((pagina - 1) * consultasPorPagina, pagina * consultasPorPagina);
  const totalPaginas = Math.ceil(consultasFiltradas.length / consultasPorPagina);

  return (
    <div className="historial-container">
      <Link to="/buscar-paciente"><button className='return'>REGRESAR</button></Link>
      <h1 className="titulo-historial">HISTORIAL CLÍNICO DE {nombrePaciente}</h1>
      {historialClinico ? (
        <div className="historial-clinico-container">
          <div className="contenido-historial">
            <h2>Consultas</h2>
            <TextField
              id="fecha-busqueda"
              label="Buscar consulta por fecha"
              type="date"
              defaultValue=""
              onChange={e => setFechaBusqueda(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p>ID de Historia Clínica: {historialClinico.ID_HistoriaC}</p>
            {consultasMostradas.length ? consultasMostradas.map(consulta => (
              <div className="consulta-item" key={consulta.ID_Consulta}>
                <p>Fecha de la consulta: {consulta.FechaConsulta}</p>
                <button onClick={() => verConsulta(consulta.ID_Consulta)}>Ver consulta</button>
                <button onClick={() => handleImprimir(consulta.ID_Consulta)}>Descargar en Formato.033</button>
              </div>
            )) : (
              <p>No se encontraron consultas asociadas a la fecha {fechaBusqueda}</p>
            )}
            <Pagination count={totalPaginas} page={pagina} onChange={handlePageChange} />

          </div>
          <div className="crear-consulta-container">
            <h2>Acciones</h2>
            <button onClick={() => navigate('/consulta-form', { state: { historiaId: historialClinico.ID_HistoriaC } })}>Crear Consulta</button>
          </div>
        </div>
      ) : (
        <p className="carga-historial">Cargando historial clínico...</p>
      )}
    </div>
  );
}

export default HistorialClinico;
