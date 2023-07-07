import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/VerConsulta.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Consulta() {
    const { consultaId } = useParams();
    const location = useLocation();
    const historiaId = location.state?.historiaId;
    const navigate = useNavigate();
  

  const [consulta, setConsulta] = useState({
    ID_HistoriaC: '',
    FechaConsulta: '',
    EnfActual: '',
    Antecedentes: '',
    SignosVitales: '',
    ExamenEstomat: '',
    Odontograma: '',
    IndicadoresSalud: '',
    IndicesCPO: '',
    PlanDiagnostico: '',
    Diagnostico: '',
    Tratamientos: '',
    MotivoC: ''
  });

  
  useEffect(() => {
    console.log(consultaId); // Agrega esta línea
    const obtenerConsulta = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/consultas/${consultaId}`);
        const consulta = response.data;
        setConsulta(consulta);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerConsulta();
  }, [consultaId]);

  const handleChange = (e) => {
    setConsulta({ ...consulta, [e.target.name]: e.target.value });
  };
  const handleRegresar = () => {
    navigate(`/historia-clinica-form/${historiaId}`);
  };
  return (
    <div className="page-container">
      <div className="form-container">
      <form  className="consulta-form">
      <h2>Ver Consulta</h2>
      <div className="input-group">
        <input type="hidden" name="ID_HistoriaC" id="ID_HistoriaC" onChange={handleChange} value={consulta.ID_HistoriaC} readOnly />
      </div>
      <div className="input-group">
        <label htmlFor="FechaConsulta">Fecha de Consulta</label>
        <input type="date" name="FechaConsulta" id="FechaConsulta" onChange={handleChange} value={consulta.FechaConsulta} readOnly />
      </div>
      <div className="input-group">
        <label htmlFor="EnfActual">Enfermedad Actual</label>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={consulta.EnfActual} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="Antecedentes">Antecedentes</label>
        <input type="text" name="Antecedentes" id="Antecedentes" onChange={handleChange} value={consulta.Antecedentes} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="SignosVitales">Signos Vitales</label>
        <input type="text" name="SignosVitales" id="SignosVitales" onChange={handleChange} value={consulta.SignosVitales} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="ExamenEstomat">Examen Estomatológico</label>
        <input type="text" name="ExamenEstomat" id="ExamenEstomat" onChange={handleChange} value={consulta.ExamenEstomat} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="Odontograma">Odontograma</label>
        <input type="text" name="Odontograma" id="Odontograma" onChange={handleChange} value={consulta.Odontograma} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="IndicadoresSalud">Indicadores de Salud</label>
        <input type="text" name="IndicadoresSalud" id="IndicadoresSalud" onChange={handleChange} value={consulta.IndicadoresSalud} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="IndicesCPO">Índices CPO</label>
        <input type="text" name="IndicesCPO" id="IndicesCPO" onChange={handleChange} value={consulta.IndicesCPO} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="PlanDiagnostico">Plan de Diagnóstico</label>
        <input type="text" name="PlanDiagnostico" id="PlanDiagnostico" onChange={handleChange} value={consulta.PlanDiagnostico} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="Diagnostico">Diagnóstico</label>
        <input type="text" name="Diagnostico" id="Diagnostico" onChange={handleChange} value={consulta.Diagnostico} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="Tratamientos">Tratamientos</label>
        <input type="text" name="Tratamientos" id="Tratamientos" onChange={handleChange} value={consulta.Tratamientos} readOnly/>
      </div>
      <div className="input-group">
        <label htmlFor="MotivoC">Motivo de Consulta</label>
        <input type="text" name="MotivoC" id="MotivoC" onChange={handleChange} value={consulta.MotivoC} readOnly/>
      </div>
    </form>
    </div>
    
    <Link to={`/historia-clinica-form/${consulta.ID_HistoriaC}`}><button>REGRESAR</button></Link>
  </div>
    
  );
}


