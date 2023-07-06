// ConsultaForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ConsultaForm.css';
import { Link, useLocation } from 'react-router-dom';

export default function ConsultaForm() {
  const location = useLocation();
  const historiaId = location.state?.historiaId;

  console.log(location.state);
  console.log(historiaId);


  
  const [formData, setFormData] = useState({
    ID_HistoriaC: historiaId,
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/consultas/', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><form onSubmit={handleSubmit} className="consulta-form">
      <h2>Crear Consulta</h2>
      <div className="input-group">
        <label htmlFor="ID_HistoriaC">ID de Historia Clínica</label>
        <input type="text" name="ID_HistoriaC" id="ID_HistoriaC" onChange={handleChange} value={formData.ID_HistoriaC} readOnly />
      </div>
      <div className="input-group">
        <label htmlFor="FechaConsulta">Fecha de Consulta</label>
        <input type="date" name="FechaConsulta" id="FechaConsulta" onChange={handleChange} value={formData.FechaConsulta} />
      </div>
      <div className="input-group">
        <label htmlFor="EnfActual">Enfermedad Actual</label>
        <input type="text" name="EnfActual" id="EnfActual" onChange={handleChange} value={formData.EnfActual} />
      </div>
      <div className="input-group">
        <label htmlFor="Antecedentes">Antecedentes</label>
        <input type="text" name="Antecedentes" id="Antecedentes" onChange={handleChange} value={formData.Antecedentes} />
      </div>
      <div className="input-group">
        <label htmlFor="SignosVitales">Signos Vitales</label>
        <input type="text" name="SignosVitales" id="SignosVitales" onChange={handleChange} value={formData.SignosVitales} />
      </div>
      <div className="input-group">
        <label htmlFor="ExamenEstomat">Examen Estomatológico</label>
        <input type="text" name="ExamenEstomat" id="ExamenEstomat" onChange={handleChange} value={formData.ExamenEstomat} />
      </div>
      <div className="input-group">
        <label htmlFor="Odontograma">Odontograma</label>
        <input type="text" name="Odontograma" id="Odontograma" onChange={handleChange} value={formData.Odontograma} />
      </div>
      <div className="input-group">
        <label htmlFor="IndicadoresSalud">Indicadores de Salud</label>
        <input type="text" name="IndicadoresSalud" id="IndicadoresSalud" onChange={handleChange} value={formData.IndicadoresSalud} />
      </div>
      <div className="input-group">
        <label htmlFor="IndicesCPO">Índices CPO</label>
        <input type="text" name="IndicesCPO" id="IndicesCPO" onChange={handleChange} value={formData.IndicesCPO} />
      </div>
      <div className="input-group">
        <label htmlFor="PlanDiagnostico">Plan de Diagnóstico</label>
        <input type="text" name="PlanDiagnostico" id="PlanDiagnostico" onChange={handleChange} value={formData.PlanDiagnostico} />
      </div>
      <div className="input-group">
        <label htmlFor="Diagnostico">Diagnóstico</label>
        <input type="text" name="Diagnostico" id="Diagnostico" onChange={handleChange} value={formData.Diagnostico} />
      </div>
      <div className="input-group">
        <label htmlFor="Tratamientos">Tratamientos</label>
        <input type="text" name="Tratamientos" id="Tratamientos" onChange={handleChange} value={formData.Tratamientos} />
      </div>
      <div className="input-group">
        <label htmlFor="MotivoC">Motivo de Consulta</label>
        <input type="text" name="MotivoC" id="MotivoC" onChange={handleChange} value={formData.MotivoC} />
      </div>
      <button type="submit">Enviar</button>
    </form>
    <Link to="/"><button>INICIO</button></Link>
    </>
  );
}
