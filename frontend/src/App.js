import './App.css';
import { HashRouter as Router, Routes, Route} from "react-router-dom";

import Home from './Home.jsx';
import ClientePage from './cliente/pages/Home.jsx';

import DistribuidoraPage from './distribuidora/pages/Dashboard.jsx';
import Carrier from './distribuidora/pages/Carrier.jsx';
import Carriers from './distribuidora/pages/Carriers.jsx';
import Packages from './distribuidora/pages/Packages';
import Package from './distribuidora/pages/Package';

import Transportador from './transportador/pages/Dashboard.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/distribuidora" element={<DistribuidoraPage />} />
          <Route path="/distribuidora/transportadores" element={<Carriers />} />
          <Route path="/distribuidora/transportadores/:id" element={<Carrier />} />
          <Route path="/distribuidora/encomendas" element={<Packages />} />
          <Route path="/distribuidora/encomendas/:id" element={<Package />} />
          <Route path="/transportador" element={<Transportador />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
