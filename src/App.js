import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PacienteForm from './views/PacienteForm.js';
import HistoriaClinicaForm from './views/HistoriaClinica.js';
import ConsultaForm from './views/ConsultaForm.js';
import Principal from './views/Principal.js';
import SoporteTecnico from './views/SoporteTecnico.js';
import BuscarPaciente from './views/BuscarPaciente.js';
import InicioPaciente from './views/InicioPaciente.js';
import EditarPaciente from './views/EditarPaciente.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/paciente-form" element={<PacienteForm />} />
        <Route path="/buscar-paciente" element={<BuscarPaciente />} />
        <Route path="/consulta-form" element={<ConsultaForm />} />
        <Route path="/soporte-tecnico" element={<SoporteTecnico />} />
        <Route path="/inicio-paciente" element={<InicioPaciente />} />

        <Route path="/editar-paciente/:pacienteId" element={<EditarPaciente />} />s
        <Route path="/historia-clinica-form/:pacienteId" element={<HistoriaClinicaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
