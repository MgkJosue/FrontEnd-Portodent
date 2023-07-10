import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HistoriaClinica.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
//imprimir historia clinica
import * as XLSX from 'xlsx';


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
  const handleImprimir = async (consultaId) => {
    const consultaSeleccionada = consultas.find(consulta => consulta.ID_Consulta === consultaId);
  
    const data = [
      { value: consultaSeleccionada.FechaConsulta, position: 'A2:B2' },
      { value: consultaSeleccionada.EnfActual, position: 'A1:B1' },
      { value: consultaSeleccionada.Antecedentes, position: 'A3:B3' },
      { value: consultaSeleccionada.SignosVitales, position: 'A4:B4' },
      { value: consultaSeleccionada.ExamenEstomat, position: 'A5:B5' },
      { value: consultaSeleccionada.Odontograma, position: 'A6:B6' },
      { value: consultaSeleccionada.IndicadoresSalud, position: 'A7:B7' },
      { value: consultaSeleccionada.IndicesCPO, position: 'A8:B8' },
      { value: consultaSeleccionada.PlanDiagnostico, position: 'A9:B9' },
      { value: consultaSeleccionada.Diagnostico, position: 'A10:B10' },
      { value: consultaSeleccionada.Tratamientos, position: 'A11:B11' },
      { value: consultaSeleccionada.MotivoC, position: 'A12:B12' },
    ];
  
    const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([[]]);

  data.forEach((item) => {
    const cellRange = XLSX.utils.decode_range(item.position);
    const startRow = cellRange.s.r;
    const startCol = cellRange.s.c;
    const endRow = cellRange.e.r;
    const endCol = cellRange.e.c;

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cellValue = item.value != null ? item.value.toString() : ''; // Convertir a cadena de texto
        ws[cellAddress] = { t: 's', v: cellValue }; // Usar tipo 's' para cadena de texto
      }
    }
  });

  const merges = data.map((item) => XLSX.utils.decode_range(item.position));
  ws['!merges'] = merges;

  XLSX.utils.book_append_sheet(wb, ws, 'Consulta');

  XLSX.writeFile(wb, 'nombre_archivo.xlsx');
  };

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
                <button onClick={() => handleImprimir(consulta.ID_Consulta)}>Imprimir</button>
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
