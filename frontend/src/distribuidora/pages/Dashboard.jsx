import '../../App.css';

import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';
import { CarriersTable } from '../components/CarriersTable';
import { GeneralInfo } from '../components/GeneralInfo';


function Dashboard() {

    const navigate = useNavigate();

    return (
        <>
            <DistribuidoraBox>

                <h1 style={{margin: "0"}}>Dashboard</h1>
                <hr style={{height: "1px"}}/>

                {/* ------- Dashboard general info ------- */}
                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <GeneralInfo></GeneralInfo>
                </Container>  
                

                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <h3>Encomendas Ativas</h3>
                    <PackagesTable></PackagesTable>
                </Container>


                {/* ------- Transportadores ativos ------- */}
                <Container maxWidth="xl" style={{padding: "40px 0 20px 0"}}>
                    <h3>Transportadores Ativos</h3>
                    <CarriersTable></CarriersTable>
                </Container>

            </DistribuidoraBox>
        </>
    )
}

export default Dashboard;