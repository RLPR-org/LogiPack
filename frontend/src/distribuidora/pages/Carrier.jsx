import '../../App.css';

import Container from '@mui/material/Container';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { CarriersTable } from '../components/CarriersTable';

function Carrier() {
    return (
        <>
            <DistribuidoraBox>

                <h1 style={{margin: "0"}}>Transportadores</h1>
                <hr style={{height: "1px"}}/>

                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "40px 0 20px 0"}}>
                    <h3>Transportadores Ativos</h3>
                    <CarriersTable></CarriersTable>
                </Container>

            </DistribuidoraBox>
        </>
    )
}

export default Carrier;