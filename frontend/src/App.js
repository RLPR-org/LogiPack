import './App.css';
import { HashRouter as Router, Routes, Route} from "react-router-dom";

import Home from './Home.jsx';
import ClientePage from './cliente/pages/Home.jsx';

import DistribuidoraPage from './distribuidora/pages/Dashboard.jsx';
import Carrier from './distribuidora/pages/Carrier.jsx';
import Package from './distribuidora/pages/Package';

import Transportador from './transportador/pages/Home.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/distribuidora" element={<DistribuidoraPage />} />
          <Route path="/distribuidora/transportadores" element={<Carrier />} />
          <Route path="/distribuidora/encomendas" element={<Package />} />
          <Route path="/transportador" element={<Transportador />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
