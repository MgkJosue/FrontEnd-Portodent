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

    PiezaDental16_17_55 : '',
    PiezaDental11_21_51 : '',
    PiezaDental26_27_65 : '',
    PiezaDental36_37_75 : '',
    PiezaDental31_41_71 : '',
    PiezaDental46_47_85 : '',
    Placa16_17_55 : '',
    Placa11_21_51 : '',
    Placa26_27_65 : '',
    Placa36_37_75 : '',
    Placa31_41_71 : '',
    Placa46_47_85 : '',
    
    Calculo16_17_55 : '',
    Calculo11_21_51 : '',
    Calculo26_27_65 : '',
    Calculo36_37_75 : '',
    Calculo31_41_71 : '',
    Calculo46_47_85 : '',
    
    Gingivitis16_17_55 : '',
    Gingivitis11_21_51 : '',
    Gingivitis26_27_65 : '',
    Gingivitis36_37_75 : '',
    Gingivitis31_41_71 : '',
    Gingivitis46_47_85 : '',
    
    TotalPlaca: '',
    TotalCalculo: '',
    TotalGingivitis: '',
    EnfermedadPerio: '',
    MalOclusion: '',
    Fluorosis: '',

    IndiceC: '',
    IndiceP: '',
    IndiceO: '',
    TotalCPO:'',
    Indicedc: '',
    Indicede: '',
    Indicedo: '',
    Totalceo:'',

    OpcionPlan:'',
    PlanDiagnostico: '',
    Diagnostico: '',
    Cie:'',
    PreoDef:'',
    FechaProximaConsulta:'',

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
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="MotivoC"><strong>1. MOTIVO DE CONSULTA</strong></label>
        <input type="text" name="MotivoC" id="MotivoC" onChange={handleChange} value={consulta.MotivoC} readOnly/>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="EnfActual"><strong>2. ENFERMEDAD O PROBLEMA ACTUAL</strong></label>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={consulta.EnfActual} readOnly/>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="EnfActual"><strong>3. ANTECEDENTES PERSONALES Y FAMILIARESL</strong></label>
        <p>ENFERMEDAD: {consulta.OpcionesAntecedentes}</p>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={consulta.Antecedentes} readOnly/>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="SignosVitales"><strong>4. SIGNOS VITALES</strong></label>
        <p>PRESIÓN ARTERIAL: {consulta.SignosVitales}</p>
        <p>FRECUENCIA CARDIACA min: {consulta.FrecuenciaCar}</p>
        <p>TEMPERATURA °C: {consulta.Temperatura}</p>
        <p>FRECUENCIA RESPIRATORIA min: {consulta.FrecuenciaRes}</p>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="ExamenEstomat"><strong>5. EXAMEN DEL SISTEMA ESTOMATOGNÁTICO</strong></label>
        <p>PATOLOGÍA DIAGNOSTICADA: {consulta.OpcionesEstomatognatico}</p>
        <input type="text" name="ExamenEstomat" id="ExamenEstomat" onChange={handleChange} value={consulta.ExamenEstomat} readOnly/>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="Odontograma"><strong>6. ODONTOGRAMA</strong></label>
        <input type="text" name="Odontograma" id="Odontograma" onChange={handleChange} value={consulta.Odontograma} readOnly/>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="IndicadoresSalud"><strong>7. INDICADORES DE SALUD BUCAL</strong></label>
        <p><strong>HIGIENE ORAL SIMPLIFICADA</strong></p>
        <div class="container-form2">
          <div class="column2">
            <label><strong>PIEZAS DENTALES</strong></label>
            <div class="horizontal-container">
              <p>{consulta.PiezaDental16_17_55}</p>
            </div> 

            <div class="horizontal-container">
              <p>{consulta.PiezaDental11_21_51}</p>
            </div>

            <div class="horizontal-container">
              <p>{consulta.PiezaDental26_27_65}</p>
            </div>

            <div class="horizontal-container">
              <p>{consulta.PiezaDental36_37_75}</p>
            </div>

            <div class="horizontal-container">
              <p>{consulta.PiezaDental31_41_71}</p>
            </div>

            <div class="horizontal-container">
              <p>{consulta.PiezaDental46_47_85}</p>
            </div>
          </div >

          <div class="column2">
            <label><strong>PLACA.. 0-1-2-3</strong></label>
            <div class="">
              <p>{consulta.Placa16_17_55}</p>
              <p>{consulta.Placa11_21_51}</p>
              <p>{consulta.Placa26_27_65}</p>
              <p>{consulta.Placa36_37_75}</p>
              <p>{consulta.Placa31_41_71}</p>
              <p>{consulta.Placa46_47_85}</p>
              <p><strong>TOTAL:</strong> {consulta.TotalPlaca}</p>
            </div>

          </div>
          <div class="column2">
            <label><strong>CÁLCULO 0-1-2-3</strong></label>
            <div class="">
              <p>{consulta.Calculo16_17_55}</p>
              <p>{consulta.Calculo11_21_51}</p>
              <p>{consulta.Calculo26_27_65}</p>
              <p>{consulta.Calculo36_37_75}</p>
              <p>{consulta.Calculo31_41_71}</p>
              <p>{consulta.Calculo46_47_85}</p>
              <p><strong>TOTAL:</strong> {consulta.TotalCalculo}</p>
            </div>

          </div>
          <div class="column2">
            <label><strong>GINGIVITIS 0-1</strong></label>
            <div class="">
              <p>{consulta.Gingivitis16_17_55}</p>
              <p>{consulta.Gingivitis11_21_51}</p>
              <p>{consulta.Gingivitis26_27_65}</p>
              <p>{consulta.Gingivitis36_37_75}</p>
              <p>{consulta.Gingivitis31_41_71}</p>
              <p>{consulta.Gingivitis46_47_85}</p>
              <p><strong>TOTAL:</strong> {consulta.TotalGingivitis}</p>
            </div>
          </div>
        </div>
        <p>ENFERMEDAD PERIODONTAL: {consulta.EnfermedadPerio}</p>
        <p>MAL OCLUSIÓN: {consulta.MalOclusion}</p>
        <p>FLUOROSIS: {consulta.Fluorosis}</p>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="IndicesCPO"><strong>8. INDICES CPO-ceo</strong></label>
        <div class="container-form">
          <div class="column">
            <label><strong>D</strong></label>
            <p>C: {consulta.IndiceC}</p>
            <p>P: {consulta.IndiceP}</p>
            <p>O: {consulta.IndiceO}</p>
            <p><strong>TOTAL:</strong>{consulta.TotalCPO} </p>
          </div>
          <div class="column">
            <label ><strong>d</strong></label>
            <p>c: {consulta.Indicedc}</p>
            <p>e: {consulta.Indicede}</p>
            <p>o: {consulta.Indicedo}</p>
            <p><strong>TOTAL:</strong> {consulta.Totalceo}</p>
          </div>
        </div>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="PlanDiagnostico"><strong>10. PLANES DE DIAGNÓSTICO, TERAPÉUTICO Y EDUCACIONAL</strong></label>
        <p>TIPO DE EXAMEN QUE SE REQUIERE: {consulta.OpcionPlan}</p>
        <input type="text" name="PlanDiagnostico" id="PlanDiagnostico" onChange={handleChange} value={consulta.PlanDiagnostico} readOnly/>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="Diagnostico"><strong>11. DIAGNÓSTICO</strong></label>
        <input type="text" name="Diagnostico" id="Diagnostico" onChange={handleChange} value={consulta.Diagnostico} readOnly/>
        <p><strong>CIE:</strong> {consulta.Cie}</p>
        <p><strong>PRE o DEF:</strong> {consulta.PreoDef}</p>
      </div>
      <br></br>
      <div className="column">
        <p><strong>FECHA DE APERTURA:</strong> </p>
        <p><strong>FECHA DE CONTROL:</strong> {consulta.FechaProximaConsulta}</p>
        <p><strong>PROFESIONAL:</strong> DR. ALEXANDER CÁRDENAS </p>
        <p><strong>CÓDIGO:</strong> 0214512 </p>
        <p><strong>FIRMA:</strong> </p>
        <p><strong>NUMERO DE HOJA:</strong> 1</p>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="Tratamientos"><strong>12. TRATAMIENTO</strong></label>
        <p><strong>FECHA:</strong> {consulta.FechaConsulta}</p>
        <p><strong>DIAGNOSTICOS Y COMPLICACIONES:</strong> {consulta.Tratamientos}</p>
        <p><strong>PROCEDIMIENTOS: </strong>{consulta.Procedimientos}</p>
        <p><strong>PRESCRIPCIONES:</strong> {consulta.Prescripcion}</p>
        <p><strong>CÓDIGO:</strong> {consulta.Codigo}</p>
      </div>
      

      
      
      
      
      
    </form>
    </div>
    
    <Link to={`/historia-clinica-form/${consulta.ID_HistoriaC}`}><button>REGRESAR</button></Link>
  </div>
    
  );
}


