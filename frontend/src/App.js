import './App.css';
import { HashRouter as Router, Routes, Route} from "react-router-dom";

import Home from './Home.jsx';

import ClienteLogin from './cliente/pages/ClienteLogin';
import DistribuidoraLogin from './distribuidora/pages/DistribuidoraLogin';
import TransportadorLogin from './transportador/pages/TransportadorLogin';

import ClientePage from './cliente/pages/Dashboard';
import ClientePackages from './cliente/pages/Packages';
import ClientePackage from './cliente/pages/Package';
import ClienteNotificationCenter from './cliente/pages/NotificationsCenter';
import ClienteConfirmPackages from './cliente/pages/ConfirmPackages';

import DistribuidoraPage from './distribuidora/pages/Dashboard.jsx';
import TemporalHistory from './distribuidora/pages/TemporalHistory';
import Carrier from './distribuidora/pages/Carrier.jsx';
import Carriers from './distribuidora/pages/Carriers.jsx';
import Packages from './distribuidora/pages/Packages';
import Package from './distribuidora/pages/Package';

import CarrierDashboar from './transportador/pages/Dashboard.jsx';
import CarrierPackages from './transportador/pages/Packages.jsx';
import CarrierPackage from './transportador/pages/Package';
import CarrierAccount from './transportador/pages/Account';
import CarrierPath from './transportador/pages/PathInfo';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cliente/login" element={<ClienteLogin />} />
          <Route path="/distribuidora/login" element={<DistribuidoraLogin />} />
          <Route path="/transportador/login" element={<TransportadorLogin />} />

          <Route path="/cliente/:id" element={<ClientePage />} />
          <Route path="/cliente/:id/notificacoes" element={<ClienteNotificationCenter />} />
          <Route path="/cliente/:id/encomendas" element={<ClientePackages />} />
          <Route path="/cliente/:id/confirmar" element={<ClienteConfirmPackages />} />
          <Route path="/cliente/:id/encomendas/:package" element={<ClientePackage />} />

          <Route path="/distribuidora" element={<DistribuidoraPage />} />
          <Route path="/distribuidora/historico" element={<TemporalHistory />} />
          <Route path="/distribuidora/transportadores" element={<Carriers />} />
          <Route path="/distribuidora/transportadores/:id" element={<Carrier />} />
          <Route path="/distribuidora/encomendas" element={<Packages />} />
          <Route path="/distribuidora/encomendas/:id" element={<Package />} />

          <Route path="/transportador/:id" element={<CarrierDashboar />} />
          <Route path="/transportador/:id/trajeto" element={<CarrierPath />} />
          <Route path="/transportador/:id/conta" element={<CarrierAccount />} />
          <Route path="/transportador/:id/mercadoria" element={<CarrierPackages />} />
          <Route path="/transportador/:id/mercadoria/:package" element={<CarrierPackage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
