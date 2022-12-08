import '../../App.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import axios from 'axios';
import { TransportadorBox } from '../components/TransportadorBox';
import { PackagesTable } from '../components/PackagesTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Dashboard() {
    const API_KEY = "AIzaSyBhIQVqF_gxcKuvVy0f5q-Nif5u5MWCAto";
    const carrierId = 1;
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const packagesURL = "http://localhost:8080/transportadores/" + carrierId;

        axios.get(packagesURL).then(
            (response) => {
                const packages = response.data.encomendas;
                setPackages(packages.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));
                setIsLoaded(true);
            }
        )

    }

    useEffect(() => {
        fetchData();
    }, []);


    if (!isLoaded) {
        return (
            <>
                <TransportadorBox carrierId={carrierId}>
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </Container>
    
                </TransportadorBox>
            </>
        )
    }
    else {
        return (
            <>
                <TransportadorBox carrierId={carrierId}>

                    <h1 style={{margin: "0"}}>Dashboard</h1>
                    <hr style={{height: "1px"}}/>


                    {/* ------- Encomendas ativas ------- */}
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Alguma da sua mercadoria</h3>
                        <PackagesTable packages={packages}></PackagesTable>

                        <div style={{"textAlign": "center", "paddingTop": "10px"}}>
                            <span className='seeMoreLink' onClick={()=> navigate('/transportador/' + carrierId + "/mercadoria")}>Ver toda a mercadoria</span>
                        </div>
                    </Container>


                    {/* ------- Mapa ------- */}
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
                                + "?key=" + "API_KEY" 
                                + "&origin=Portugal+Aveiro"
                                + "&destination=Portugal+Viseu"
                            }
                        >
                        </iframe>
                    </Container>

                </TransportadorBox>
            </>
        )
    }

}

export default Dashboard;