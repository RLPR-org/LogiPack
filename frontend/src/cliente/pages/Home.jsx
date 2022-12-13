import '../../App.css';
import { CheckLogin } from '../../CheckLogin';

import Container from '@mui/material/Container';

import { ClienteBox } from '../components/ClienteBox';
import { PackagesTable } from '../components/PackagesTable';

function Home() {
    
    const packagesData = null

    return (
        <>
            <CheckLogin user="cliente" />

            <ClienteBox>
                <h1 style={{margin: "0"}}>Encomendas</h1>
                <hr style={{height: "1px"}}/>
                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <PackagesTable packagesData={packagesData}></PackagesTable>
                </Container>
            </ClienteBox>
        </>
    )
}

export default Home;