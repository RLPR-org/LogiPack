import '../../App.css';

import Container from '@mui/material/Container';

import { TransportadorBox } from '../components/TransportadorBox';
import { PackagesTable } from '../components/PackagesTable';

function Dashboard() {

    const API_KEY = "AIzaSyBhIQVqF_gxcKuvVy0f5q-Nif5u5MWCAto";

    return (
        <>
            <TransportadorBox>

                <h1 style={{margin: "0"}}>Dashboard</h1>
                <hr style={{height: "1px"}}/>
                

                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <h3>Encomendas</h3>
                    <PackagesTable></PackagesTable>
                </Container>

                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <h3>Origem: Oslo, Noruega</h3>
                    <h3>Destino: Telemark, Noruega</h3>

                    <iframe
                        title="map"
                        width="100%"
                        height="1000px"
                        style={{border:0}}
                        loading="lazy"
                        allowfullscreen
                        src={
                            "https://www.google.com/maps/embed/v1/directions"
                            + "?key=" + API_KEY 
                            + "&origin=Oslo+Noruega"
                            + "&destination=Telemark+Noruega"
                        }
                    >
                    </iframe>
                </Container>
                
            </TransportadorBox>
        </>
    )
}

export default Dashboard;