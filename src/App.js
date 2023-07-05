import React, { useState } from 'react';
import PacienteForm from './views/PacienteForm.js';
import HistoriaClinicaForm from './views/HistoriaClinica.js';
import ConsultaForm from './views/ConsultaForm.js';
import Principal from './views/Principal.js';
import SoporteTecnico from './views/SoporteTecnico.js';

function App() {
  const [currentView, setCurrentView] = useState('principal');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {currentView === 'principal' && <Principal onViewChange={handleViewChange} />}
      {currentView === 'pacienteForm' && <PacienteForm onViewChange={handleViewChange}/>}
      {currentView === 'historiaClinicaForm' && <HistoriaClinicaForm onViewChange={handleViewChange}/>}
      {currentView === 'consultaForm' && <ConsultaForm onViewChange={handleViewChange}/>}
      {currentView === 'soporteTecnico' && <SoporteTecnico onViewChange={handleViewChange}/>}
    </div>
  );
}

export default App;
