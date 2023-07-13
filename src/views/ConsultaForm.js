import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ConsultaForm.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ConsultaForm() {
  const location = useLocation();
  const historiaId = location.state?.historiaId;
  //regresar
  const navigate = useNavigate();
  //mensaje
  const [showMessage, setShowMessage] = useState(false);


  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if(historiaId) {
      setFormData(prevData => ({...prevData, ID_HistoriaC: historiaId}))
    }
  }, [historiaId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  //me quede aqui
  const handleSubmit = async (e) => {
    e.preventDefault();
    //suma y asugna a los totales
    const {
      IndiceC,
      IndiceP,
      IndiceO,
      Indicedc,
      Indicede,
      Indicedo,
      Placa16_17_55 ,
      Placa11_21_51 ,
      Placa26_27_65 ,
      Placa36_37_75 ,
      Placa31_41_71 ,
      Placa46_47_85 ,
      
      Calculo16_17_55 ,
      Calculo11_21_51 ,
      Calculo26_27_65 ,
      Calculo36_37_75 ,
      Calculo31_41_71 ,
      Calculo46_47_85 ,
      
      Gingivitis16_17_55 ,
      Gingivitis11_21_51 ,
      Gingivitis26_27_65 ,
      Gingivitis36_37_75 ,
      Gingivitis31_41_71 ,
      Gingivitis46_47_85 ,
      

    } = formData;
    const TotalCPO = parseInt(IndiceC || 0) + parseInt(IndiceP || 0) + parseInt(IndiceO || 0);
    const Totalceo = parseInt(Indicedc || 0) + parseInt(Indicede || 0) + parseInt(Indicedo || 0);

    const TotalPlaca = (
      parseFloat(parseInt(Placa16_17_55) || 0) +
      parseFloat(parseInt(Placa11_21_51) || 0) +
      parseFloat(parseInt(Placa26_27_65) || 0) +
      parseFloat(parseInt(Placa36_37_75) || 0) +
      parseFloat(parseInt(Placa31_41_71) || 0) +
      parseFloat(parseInt(Placa46_47_85) || 0)
    ) / 6;

    const TotalCalculo = (
      parseFloat(parseInt(Calculo16_17_55) || 0) +
      parseFloat(parseInt(Calculo11_21_51) || 0) +
      parseFloat(parseInt(Calculo26_27_65) || 0) +
      parseFloat(parseInt(Calculo36_37_75) || 0) +
      parseFloat(parseInt(Calculo31_41_71) || 0) +
      parseFloat(parseInt(Calculo46_47_85) || 0)
    ) / 6;

    const TotalGingivitis = (
      parseFloat(parseInt(Gingivitis16_17_55) || 0) +
      parseFloat(parseInt(Gingivitis11_21_51) || 0) +
      parseFloat(parseInt(Gingivitis26_27_65) || 0) +
      parseFloat(parseInt(Gingivitis36_37_75) || 0) +
      parseFloat(parseInt(Gingivitis31_41_71) || 0) +
      parseFloat(parseInt(Gingivitis46_47_85) || 0)
    ) / 6;

    setFormData((prevData) => ({
      ...prevData,
      TotalCPO: TotalCPO.toString(),
      Totalceo: Totalceo.toString(),
      TotalPlaca: TotalPlaca.toString(),
      TotalCalculo: TotalCalculo.toString(),
      TotalGingivitis: TotalGingivitis.toString()
    }));



    try {
      const response = await axios.post('http://localhost:8000/consultas/', formData);
      console.log(response.data);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate(`/historia-clinica-form/${historiaId}`); // Redireccionar a la vista BuscarPaciente.js
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegresar = () => {
    navigate(`/historia-clinica-form/${historiaId}`);
  };

  return (
    <div className="page-container">
      <button onClick={handleRegresar}>REGRESAR</button>
      <div className={`form-container ${showMessage ? 'show-message' : ''}`}>
      <form onSubmit={handleSubmit} className="consulta-form">
      <h2>Crear Consulta</h2>
      <div className="input-group">
        <input type="hidden" name="ID_HistoriaC" id="ID_HistoriaC" onChange={handleChange} value={formData.ID_HistoriaC} readOnly />
      </div>

      <div className="input-group3">
        <label htmlFor="FechaConsulta"><strong>CICLO DE VIDA</strong></label>
        <div className="column3">
          <div class="horizontal-container2">
            <input type="radio" name="RangoAños" id="Menor 1 año" onChange={handleChange} value="Menor 1 año" required />
            <label htmlFor="Menor 1 año">MENOR DE 1 AÑO</label>
            <input type="radio" name="RangoAños" id="1 a 4 años" onChange={handleChange} value="1 a 4 años" required />
            <label htmlFor="1 a 4 años">1 - 4 AÑOS</label>
            <input type="radio" name="RangoAños" id="5 a 9 años programado" onChange={handleChange} value="5 a 9 años programado" required />
            <label htmlFor="5 a 9 años programado">5 - 9 AÑOS PROGRAMADO</label>
            <input type="radio" name="RangoAños" id="5 a 14 años no programado" onChange={handleChange} value="5 a 14 años no programado" required />
            <label htmlFor="5 a 14 años no programado">5 - 14 AÑOS NO PROGRAMADO</label>
          </div>

          <div class="horizontal-container2">
            <input type="radio" name="RangoAños" id="10 a 14 años programado" onChange={handleChange} value="10 a 14 años programado" required />
            <label htmlFor="10 a 14 años programado">10 - 14 AÑOS PROGRAMADO</label>
            <input type="radio" name="RangoAños" id="15 a 19 años" onChange={handleChange} value="15 a 19 años" required />
            <label htmlFor="15 a 19 años">15 - 19 AÑOS</label>
            <input type="radio" name="RangoAños" id="mayor de 20 años" onChange={handleChange} value="mayor de 20 años" required />
            <label htmlFor="mayor de 20 años">MAYOR DE 20 AÑOS</label>
            <input type="radio" name="RangoAños" id="embarazada" onChange={handleChange} value="embarazada" required />
            <label htmlFor="embarazada">EMBARAZADA</label>
          </div>

        </div>
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="MotivoC"><strong>1. MOTIVO DE CONSULTA</strong></label>
        <input type="text" name="MotivoC" id="MotivoC" onChange={handleChange} value={formData.MotivoC} />
      </div>
      <br></br>
      <div className="input-group">
        <label htmlFor="EnfActual"><strong>2. ENFERMEDAD O PROBLEMA ACTUAL</strong></label>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={formData.EnfActual} />
      </div>
      <br></br>

      <div className="input-group">
        <label htmlFor="Antecedentes"><strong>3. ANTECEDENTES PERSONALES Y FAMILIARES</strong></label>
        <div className="form-control">
          <input type="radio" name="OpcionesAntecedentes" id="Alergia Antibiotico" onChange={handleChange} value="Alergia Antibiotico" required />
          <label htmlFor="Alergia Antibiotico">1. ALERGIA ANTIBIÓTICO</label>

          <input type="radio" name="OpcionesAntecedentes" id="Alergia Anestesia" onChange={handleChange} value="Alergia Anestesia" required />
          <label htmlFor="Alergia Anestesia">2. ALERGIA ANESTESIA</label>

          <input type="radio" name="OpcionesAntecedentes" id="Hemorragias" onChange={handleChange} value="Hemorragias" required />
          <label htmlFor="Hemorragias">3. HEMORRAGIAS</label>

          <input type="radio" name="OpcionesAntecedentes" id="vih/sida" onChange={handleChange} value="vih/sida" required />
          <label htmlFor="vih/sida">4. VIH/SIDA</label>

          <input type="radio" name="OpcionesAntecedentes" id="Tuberculosis" onChange={handleChange} value="Tuberculosis" required />
          <label htmlFor="Tuberculosis">5. TUBERCULOSIS</label>

          <input type="radio" name="OpcionesAntecedentes" id="Asma" onChange={handleChange} value="Asma" required />
          <label htmlFor="Asma">6. ASMA</label>

          <input type="radio" name="OpcionesAntecedentes" id="Diabetes" onChange={handleChange} value="Diabetes" required />
          <label htmlFor="Diabetes">7. DIABETES</label>

          <input type="radio" name="OpcionesAntecedentes" id="Hipertension" onChange={handleChange} value="Hipertension" required />
          <label htmlFor="Hipertension">8. HIPERTENSIÓN</label>

          <input type="radio" name="OpcionesAntecedentes" id="Enfermedad Cardiaca" onChange={handleChange} value="Enfermedad Cardiaca" required />
          <label htmlFor="Enfermedad Cardiaca">9. ENFERMEDAD CARDIACA</label>

          <input type="radio" name="OpcionesAntecedentes" id="Otro" onChange={handleChange} value="Otro" required />
          <label htmlFor="Otro">10. OTRO</label>

          <input type="radio" name="OpcionesAntecedentes" id="Ninguno" onChange={handleChange} value="Ninguno" required />
          <label htmlFor="Ninguno">11. NINGUNO</label>
        </div>
        <input type="text" name="Antecedentes" id="Antecedentes" onChange={handleChange} value={formData.Antecedentes} />
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="SignosVitales"><strong>4. SIGNOS VITALES</strong></label>
        <p>PRESIÓN ARTERIAL</p>
        <input type="text" name="SignosVitales" id="SignosVitales" onChange={handleChange} value={formData.SignosVitales} />
        <p>FRECUENCIA CARDIACA min</p>
        <input type="text" name="FrecuenciaCar" id="FrecuenciaCar" onChange={handleChange} value={formData.FrecuenciaCar} />
        <p>TEMPERATURA °C</p>
        <input type="text" name="Temperatura" id="Temperatura" onChange={handleChange} value={formData.Temperatura} />
        <p>FRECUENCIA RESPIRATORIA min</p>
        <input type="text" name="FrecuenciaRes" id="FrecuenciaRes" onChange={handleChange} value={formData.FrecuenciaRes} />
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="ExamenEstomat"><strong>5. EXAMEN ESTOMATOGNÁTICO</strong></label>
        <div className="form-control"> 
          <input type="radio" name="OpcionesEstomatognatico" id="Labios" onChange={handleChange} value="Labios" required />
          <label htmlFor="Labios">1. LABIOS</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Mejillas" onChange={handleChange} value="Mejillas" required />
          <label htmlFor="Mejillas">2. MEJILLAS</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Maxilar superior" onChange={handleChange} value="Maxilar superior" required />
          <label htmlFor="Maxilar superior">3. MAXILAR SUPERIOR</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Maxilar inferior" onChange={handleChange} value="Maxilar inferior" required />
          <label htmlFor="Maxilar inferior">4. MAXILAS INFERIOR</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Lengua" onChange={handleChange} value="Lengua" required />
          <label htmlFor="Lengua">5. LENGUA</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Paladar" onChange={handleChange} value="Paladar" required />
          <label htmlFor="Paladar">6. PALADAR</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Piso" onChange={handleChange} value="Piso" required />
          <label htmlFor="Piso">7. PISO</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Carrillos" onChange={handleChange} value="Carrillos" required />
          <label htmlFor="Carrillos">8. CARRILLOS</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Glandulas salivales" onChange={handleChange} value="Glandulas salivales" required />
          <label htmlFor="Glandulas salivales">9. GLÁNDULAS SALIVALES</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Oro faringe" onChange={handleChange} value="Oro faringe" required />
          <label htmlFor="Oro faringe">10. ORO FARINGE</label>

          <input type="radio" name="OpcionesEstomatognatico" id="ATM" onChange={handleChange} value="ATM" required />
          <label htmlFor="ATM">11. A.T.M.</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Ganglios" onChange={handleChange} value="Ganglios" required />
          <label htmlFor="Ganglios">12. GANGLIOS</label>

          <input type="radio" name="OpcionesEstomatognatico" id="Ninguno" onChange={handleChange} value="Ninguno" required />
          <label htmlFor="Ninguno">13. NINGUNO</label>

        </div>
        <input type="text" name="ExamenEstomat" id="ExamenEstomat" onChange={handleChange} value={formData.ExamenEstomat} />
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="Odontograma"><strong>6. ODONTOGRAMA</strong></label>
        <input type="text" name="Odontograma" id="Odontograma" onChange={handleChange} value={formData.Odontograma} />
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="IndicadoresSalud"><strong>7. INDICADORES DE SALUD BUCAL</strong></label>
        <p><strong>HIGIENE ORAL SIMPLIFICADA</strong></p>
        <div class="container-form2">
          <div class="column2">
            <label><strong>PIEZAS DENTALES</strong></label>
            <br></br>
            <div class="horizontal-container">
              <input type="radio" name="PiezaDental16_17_55" id="16" onChange={handleChange} value="16" required />
              <label htmlFor="16">16</label>
              <input type="radio" name="PiezaDental16_17_55" id="17" onChange={handleChange} value="17" required />
              <label htmlFor="17">17</label>
              <input type="radio" name="PiezaDental16_17_55" id="55" onChange={handleChange} value="55" required />
              <label htmlFor="55">55</label>
            </div>
            <div class="horizontal-container">
              <input type="radio" name="PiezaDental11_21_51" id="11" onChange={handleChange} value="11" required />
              <label htmlFor="11">11</label>
              <input type="radio" name="PiezaDental11_21_51" id="21" onChange={handleChange} value="21" required />
              <label htmlFor="21">21</label>
              <input type="radio" name="PiezaDental11_21_51" id="51" onChange={handleChange} value="51" required />
              <label htmlFor="51">51</label>
            </div>

            <div class="horizontal-container">
              <input type="radio" name="PiezaDental26_27_65" id="26" onChange={handleChange} value="26" required />
              <label htmlFor="26">26</label>
              <input type="radio" name="PiezaDental26_27_65" id="27" onChange={handleChange} value="27" required />
              <label htmlFor="27">27</label>
              <input type="radio" name="PiezaDental26_27_65" id="65" onChange={handleChange} value="65" required />
              <label htmlFor="65">65</label>
            </div>

            <div class="horizontal-container">
              <input type="radio" name="PiezaDental36_37_75" id="36" onChange={handleChange} value="36" required />
              <label htmlFor="36">36</label>
              <input type="radio" name="PiezaDental36_37_75" id="37" onChange={handleChange} value="37" required />
              <label htmlFor="37">37</label>
              <input type="radio" name="PiezaDental36_37_75" id="75" onChange={handleChange} value="75" required />
              <label htmlFor="75">75</label>
            </div>

            <div class="horizontal-container">
              <input type="radio" name="PiezaDental31_41_71" id="31" onChange={handleChange} value="31" required />
              <label htmlFor="31">31</label>
              <input type="radio" name="PiezaDental31_41_71" id="41" onChange={handleChange} value="41" required />
              <label htmlFor="41">41</label>
              <input type="radio" name="PiezaDental31_41_71" id="71" onChange={handleChange} value="71" required />
              <label htmlFor="71">71</label>
            </div>

            <div class="horizontal-container">
              <input type="radio" name="PiezaDental46_47_85" id="46" onChange={handleChange} value="46" required />
              <label htmlFor="46">46</label>
              <input type="radio" name="PiezaDental46_47_85" id="47" onChange={handleChange} value="47" required />
              <label htmlFor="47">47</label>
              <input type="radio" name="PiezaDental46_47_85" id="85" onChange={handleChange} value="85" required />
              <label htmlFor="85">85</label>
            </div>
            
          </div >
          <div class="column2">
            <label><strong>PLACA.. 0-1-2-3</strong></label>
            <div class="">
              <input type="number" name="Placa16_17_55" id="Placa16_17_55" onChange={handleChange} value={formData.Placa16_17_55} min="0" max="3"/>
              <input type="number" name="Placa11_21_51" id="Placa11_21_51" onChange={handleChange} value={formData.Placa11_21_51} min="0" max="3"/>
              <input type="number" name="Placa26_27_65" id="Placa26_27_65" onChange={handleChange} value={formData.Placa26_27_65} min="0" max="3"/>
              <input type="number" name="Placa36_37_75" id="Placa36_37_75" onChange={handleChange} value={formData.Placa36_37_75} min="0" max="3"/>
              <input type="number" name="Placa31_41_71" id="Placa31_41_71" onChange={handleChange} value={formData.Placa31_41_71} min="0" max="3"/>
              <input type="number" name="Placa46_47_85" id="Placa46_47_85" onChange={handleChange} value={formData.Placa46_47_85} min="0" max="3"/>
            </div>

          </div>
          <div class="column2">
            <label><strong>CÁLCULO 0-1-2-3</strong></label>
            <div class="">
              <input type="number" name="Calculo16_17_55" id="Calculo16_17_55" onChange={handleChange} value={formData.Calculo16_17_55} min="0" max="3"/>
              <input type="number" name="Calculo11_21_51" id="Calculo11_21_51" onChange={handleChange} value={formData.Calculo11_21_51} min="0" max="3"/>
              <input type="number" name="Calculo26_27_65" id="Calculo26_27_65" onChange={handleChange} value={formData.Calculo26_27_65} min="0" max="3"/>
              <input type="number" name="Calculo36_37_75" id="Calculo36_37_75" onChange={handleChange} value={formData.Calculo36_37_75} min="0" max="3"/>
              <input type="number" name="Calculo31_41_71" id="Calculo31_41_71" onChange={handleChange} value={formData.Calculo31_41_71} min="0" max="3"/>
              <input type="number" name="Calculo46_47_85" id="Calculo46_47_85" onChange={handleChange} value={formData.Calculo46_47_85} min="0" max="3"/>
            </div>

          </div>
          <div class="column2">
            <label><strong>GINGIVITIS 0-1</strong></label>
            <div class="">
              <input type="number" name="Gingivitis16_17_55" id="Gingivitis16_17_55" onChange={handleChange} value={formData.Gingivitis16_17_55} min="0" max="1"/>
              <input type="number" name="Gingivitis11_21_51" id="Gingivitis11_21_51" onChange={handleChange} value={formData.Gingivitis11_21_51} min="0" max="1"/>
              <input type="number" name="Gingivitis26_27_65" id="Gingivitis26_27_65" onChange={handleChange} value={formData.Gingivitis26_27_65} min="0" max="1"/>
              <input type="number" name="Gingivitis36_37_75" id="Gingivitis36_37_75" onChange={handleChange} value={formData.Gingivitis36_37_75} min="0" max="1"/>
              <input type="number" name="Gingivitis31_41_71" id="Gingivitis31_41_71" onChange={handleChange} value={formData.Gingivitis31_41_71} min="0" max="1"/>
              <input type="number" name="Gingivitis46_47_85" id="Gingivitis46_47_85" onChange={handleChange} value={formData.Gingivitis46_47_85} min="0" max="1"/>
            </div>

          </div>

        </div>

        <p><strong>ENFERMEDAD PERIODONTAL</strong></p>
        <div className="form-control">
          <input type="radio" name="EnfermedadPerio" id="Leve" onChange={handleChange} value="Leve" required />
          <label htmlFor="Leve">LEVE</label>

          <input type="radio" name="EnfermedadPerio" id="Moderada" onChange={handleChange} value="Moderada" required />
          <label htmlFor="Moderada">MODERADA</label>

          <input type="radio" name="EnfermedadPerio" id="Severa" onChange={handleChange} value="Severa" required />
          <label htmlFor="Severa">SEVERA</label>
        </div>

        <p><strong>MAL OCLUSIÓN</strong></p>
        <div className="form-control">
          <input type="radio" name="MalOclusion" id="Angle I" onChange={handleChange} value="Angle I" required />
          <label htmlFor="Angle I">ANGLE I</label>

          <input type="radio" name="MalOclusion" id="Angle II" onChange={handleChange} value="Angle II" required />
          <label htmlFor="Angle II">ANGLE II</label>

          <input type="radio" name="MalOclusion" id="Angle III" onChange={handleChange} value="Angle III" required />
          <label htmlFor="Angle III">ANGLE III</label>
        </div>

        <p><strong>FLUOROSIS</strong></p>
        <div className="form-control">
          <input type="radio" name="Fluorosis" id="Leve" onChange={handleChange} value="Leve" required />
          <label htmlFor="Leve">LEVE</label>

          <input type="radio" name="Fluorosis" id="Moderada" onChange={handleChange} value="Moderada" required />
          <label htmlFor="Moderada">MODERADA</label>

          <input type="radio" name="Fluorosis" id="Severa" onChange={handleChange} value="Severa" required />
          <label htmlFor="Severa">SEVERA</label>
        </div>
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="IndicesCPO"><strong>8. INDICES CPO-ceo</strong></label>   
        <div class="container-form">
          <div class="column">
            <label><strong>D</strong></label>
            <p>C:<input type="number" name="IndiceC" id="IndiceC" onChange={handleChange} value={formData.IndiceC} min="0"/> </p>
            <p>P:<input type="number" name="IndiceP" id="IndiceP" onChange={handleChange} value={formData.IndiceP} min="0"/> </p>
            <p>O:<input type="number" name="IndiceO" id="IndiceO" onChange={handleChange} value={formData.IndiceO} min="0"/> </p>
          </div>
          <div class="column">
            <label><strong>d</strong></label>
            <p>c:<input type="number" name="Indicedc" id="Indicedc" onChange={handleChange} value={formData.Indicedc} min="0"/> </p>
            <p>e:<input type="number" name="Indicede" id="Indicede" onChange={handleChange} value={formData.Indicede} min="0"/> </p>
            <p>o:<input type="number" name="Indicedo" id="Indicedo" onChange={handleChange} value={formData.Indicedo} min="0"/> </p>
          </div>
        </div>
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="PlanDiagnostico"><strong>10. PLANES DE DIAGNÓSTICO, TERAPÉUTICO Y EDUCACIONAL</strong></label>
        <div className="form-control">
          <input type="radio" name="OpcionPlan" id="Biometria" onChange={handleChange} value="Biometria" required />
          <label htmlFor="Biometria">BIOMETRIA</label>

          <input type="radio" name="OpcionPlan" id="Quimica sanguinea" onChange={handleChange} value="Quimica sanguinea" required />
          <label htmlFor="Quimica sanguinea">QUIMICA SANGUINEA</label>

          <input type="radio" name="OpcionPlan" id="Rayos-x" onChange={handleChange} value="Rayos-x" required />
          <label htmlFor="Rayos-x">RAYOS-X</label>

          <input type="radio" name="OpcionPlan" id="Otros" onChange={handleChange} value="Otros" required />
          <label htmlFor="Otros">OTROS</label>
        </div>
        <input type="text" name="PlanDiagnostico" id="PlanDiagnostico" onChange={handleChange} value={formData.PlanDiagnostico} />
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="Diagnostico"><strong>11. DIAGNÓSTICO</strong></label>
        <input type="text" name="Diagnostico" id="Diagnostico" onChange={handleChange} value={formData.Diagnostico} />
        <p>CIE:</p>  
        <input type="text" name="Cie" id="Cie" onChange={handleChange} value={formData.Cie} />
        <p>DIAGNOSTICO PRESUNTIVO O DEFINITIVO:</p>  
        <div class="container-form2">
          <div class="horizontal-container">
              <input type="radio" name="PreoDef" id="PRE" onChange={handleChange} value="PRE" required />
              <label htmlFor="PRE"><strong>PRE</strong></label>
              <input type="radio" name="PreoDef" id="DEF" onChange={handleChange} value="DEF" required />
              <label htmlFor="DEF"><strong>DEF</strong></label>
          </div>
        </div>
      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="FechaProximaConsulta"><strong>FECHA DE PROXIMA CONSULTA:</strong></label>
        <input type="date" name="FechaProximaConsulta" id="FechaProximaConsulta" onChange={handleChange} value={formData.FechaProximaConsulta} />

      </div>

      <br></br>
      <div className="input-group">
        <label htmlFor="Tratamientos"><strong>12. TRATAMIENTOS</strong></label>
        <p>FECHA DE CONSULTA</p>
        <input type="date" name="FechaConsulta" id="FechaConsulta" onChange={handleChange} value={formData.FechaConsulta} />
        <p>DIAGNÓSTICO Y COMPLICACIONES</p>
        <input type="text" name="Tratamientos" id="Tratamientos" onChange={handleChange} value={formData.Tratamientos} />
        <p>PROCEDIMIENTOS</p>
        <input type="text" name="Procedimientos" id="Procedimientos" onChange={handleChange} value={formData.Procedimientos} />
        <p>PRESCRIPCIONES</p>
        <input type="text" name="Prescripcion" id="Prescripcion" onChange={handleChange} value={formData.Prescripcion} />
        <p>CÓDIGO</p>
        <input type="text" name="Codigo" id="Codigo" onChange={handleChange} value={formData.Codigo} />
      </div>

      <button type="submit">Enviar</button>
    </form>
    </div>
    {showMessage && (
        <div className="message-popup">
          <p><strong>SE AGREGO LA CONSULTA CORRECTAMENTE</strong></p>
        </div>
      )}
    </div>
    
  );
}
