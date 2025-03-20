import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // Asegúrate de que la ruta sea correcta
import LangSearch from './LangSearch'; // Asegúrate de que la ruta sea correcta
import NameSearch from './NameSearch'; // Asegúrate de que la ruta sea correcta
import RegionSearch from './RegionSearch'; // Asegúrate de que la ruta sea correcta
import SobreNosotros from './SobreNosotros';

const AppRoutes = () => {
  return (
    <Router>
      {/* Elimina la línea que intenta renderizar el componente Header */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lang-search" element={<LangSearch />} />
        <Route path="/name-search" element={<NameSearch />} />
        <Route path="/region-search" element={<RegionSearch />} />
        <Route path="/about" element={<SobreNosotros />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
