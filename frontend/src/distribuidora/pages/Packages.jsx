import '../../App.css';

import Container from '@mui/material/Container';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';

import { Grid, Button } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

function Packages() {
    const navigate = useNavigate();

    //make an API call and pass the data to component
    const packagesData = null

    return (
        <>
            <DistribuidoraBox>

                <h1 style={{margin: "0"}}>Encomendas</h1>
                <hr style={{height: "1px"}}/>


                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <h3>Encomendas Ativas</h3>
                    <PackagesTable packagesData={packagesData}></PackagesTable>
                </Container>

            </DistribuidoraBox>
        </>
    )
}

export default Packages;