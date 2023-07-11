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
    RangoAños: '',
    MotivoC: '',
    EnfActual: '',
    OpcionesAntecedentes: '',
    Antecedentes: '',
    SignosVitales: '',
    FrecuenciaCar: '',
    Temperatura:'',
    FrecuenciaRes:'',
    OpcionesEstomatognatico:'',
    ExamenEstomat: '',
    Odontograma: '',
    IndicadoresSalud: '',
    EnfermedadPerio: '',
    MalOclusion: '',
    Fluorosis: '',
    IndicesCPO: '',
    OpcionPlan:'',
    PlanDiagnostico: '',
    Diagnostico: '',
    FechaConsulta: '',
    Tratamientos: '',
    Procedimientos: '',
    Prescripcion: '',
    Codigo:''
  });

  const [paciente, setPaciente] = useState({
    Nombre: '',
    Apellido: '',
    Sexo: '',
    //cambios para edad
    FechaNacimiento: '',
    Edad: ''
  });

  
  useEffect(() => {
    console.log(consultaId); // Agrega esta línea
    const obtenerConsulta = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/consultas/${consultaId}`);
        const consulta = response.data;
        setConsulta(consulta);
        //obtener datos del paciente
        const pacienteResponse = await axios.get(`http://localhost:8000/pacientes/${consulta.ID_HistoriaC}`);
        const paciente = pacienteResponse.data;
        setPaciente(paciente);

        // Calcular la edad del paciente a partir de la fecha de nacimiento
        const fechaNacimiento = new Date(paciente.FechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        if (
          hoy.getMonth() < fechaNacimiento.getMonth() ||
          (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--;
        }
        // Asignar la edad calculada al estado del paciente
        setPaciente(prevPaciente => ({ ...prevPaciente, Edad: edad.toString() }));
        

      } catch (error) {
        console.error(error);
      }
    };

    obtenerConsulta();
  }, [consultaId]);

  const handleChange = (e) => {
    setConsulta({ ...consulta, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="page-container">
      <div className="form-container">
      <form  className="consulta-form">
      <h2>Ver Consulta</h2>

      <div className="input-group">
        <p><strong>ESTABLECIMIENTO: </strong> PORTODENT</p>
      </div>

      <div className="input-group">
        <p><strong>NOMBRES: </strong>{paciente.Nombre}</p>
      </div>

      <div className="input-group">
        <p><strong>APELLIDOS: </strong>{paciente.Apellido}</p>
      </div>

      <div className="input-group">
        <p><strong>SEXO (M-F): </strong>{paciente.Sexo}</p>
      </div>

      <div className="input-group">
        <p><strong>EDAD: </strong>{paciente.Edad}</p>
      </div>

      <div className="input-group">
        <p><strong>N° HISTORIAL CLINICO: </strong>{consulta.ID_HistoriaC}</p>
      </div>

      <div className="input-group">
        <p><strong>CICLO DE VIDA: </strong>{consulta.RangoAños}</p>
      </div>

      <div className="input-group">
        <label htmlFor="MotivoC"><strong>1. MOTIVO DE CONSULTA</strong></label>
        <input type="text" name="MotivoC" id="MotivoC" onChange={handleChange} value={consulta.MotivoC} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="EnfActual"><strong>2. ENFERMEDAD O PROBLEMA ACTUAL</strong></label>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={consulta.EnfActual} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="EnfActual"><strong>3. ANTECEDENTES PERSONALES Y FAMILIARESL</strong></label>
        <p>ENFERMEDAD: {consulta.OpcionesAntecedentes}</p>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={consulta.Antecedentes} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="SignosVitales"><strong>4. SIGNOS VITALES</strong></label>
        <p>PRESIÓN ARTERIAL: {consulta.SignosVitales}</p>
        <p>FRECUENCIA CARDIACA min: {consulta.FrecuenciaCar}</p>
        <p>TEMPERATURA °C: {consulta.Temperatura}</p>
        <p>FRECUENCIA RESPIRATORIA min: {consulta.FrecuenciaRes}</p>
      </div>

      <div className="input-group">
        <label htmlFor="ExamenEstomat"><strong>5. EXAMEN DEL SISTEMA ESTOMATOGNÁTICO</strong></label>
        <p>PATOLOGÍA DIAGNOSTICADA: {consulta.OpcionesEstomatognatico}</p>
        <input type="text" name="ExamenEstomat" id="ExamenEstomat" onChange={handleChange} value={consulta.ExamenEstomat} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="Odontograma"><strong>6. ODONTOGRAMA</strong></label>
        <input type="text" name="Odontograma" id="Odontograma" onChange={handleChange} value={consulta.Odontograma} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="IndicadoresSalud"><strong>7. INDICADORES DE SALUD BUCAL</strong></label>
        <p>HIGIENE ORAL SIMPLIFICADA: {consulta.IndicadoresSalud}</p>
        <p>ENFERMEDAD PERIODONTAL: {consulta.EnfermedadPerio}</p>
        <p>MAL OCLUSIÓN: {consulta.MalOclusion}</p>
        <p>FLUOROSIS: {consulta.Fluorosis}</p>
      </div>

      <div className="input-group">
        <label htmlFor="IndicesCPO"><strong>8. INDICES CPO-ceo</strong></label>
        <input type="text" name="IndicesCPO" id="IndicesCPO" onChange={handleChange} value={consulta.IndicesCPO} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="PlanDiagnostico"><strong>10. PLANES DE DIAGNÓSTICO, TERAPÉUTICO Y EDUCACIONAL</strong></label>
        <p>TIPO DE EXAMEN QUE SE REQUIERE: {consulta.OpcionPlan}</p>
        <input type="text" name="PlanDiagnostico" id="PlanDiagnostico" onChange={handleChange} value={consulta.PlanDiagnostico} readOnly/>
      </div>

      <div className="input-group">
        <label htmlFor="Diagnostico"><strong>11. DIAGNÓSTICO</strong></label>
        <input type="text" name="Diagnostico" id="Diagnostico" onChange={handleChange} value={consulta.Diagnostico} readOnly/>
      </div>

      <div className="input-group">
        <p>FECHA DE APERTURA: </p>
        <p>FECHA DE CONTROL: </p>
        <p>PROFESIONAL: DR. ALEXANDER CÁRDENAS </p>
        <p>CÓDIGO: 0214512 </p>
        <p>FIRMA: </p>
        <p>NUMERO DE HOJA: 1</p>
      </div>

      <div className="input-group">
        <label htmlFor="Tratamientos"><strong>12. TRATAMIENTO</strong></label>
        <p>FECHA: {consulta.FechaConsulta}</p>
        <p>DIAGNOSTICOS Y COMPLICACIONES: {consulta.Tratamientos}</p>
        <p>PROCEDIMIENTOS: {consulta.Procedimientos}</p>
        <p>PRESCRIPCIONES: {consulta.Prescripcion}</p>
        <p>CÓDIGO: {consulta.Codigo}</p>
      </div>
      

      
      
      
      
      
    </form>
    </div>
    
    <Link to={`/historia-clinica-form/${consulta.ID_HistoriaC}`}><button>REGRESAR</button></Link>
  </div>
    
  );
}


