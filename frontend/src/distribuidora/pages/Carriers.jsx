import '../../App.css';

import React, { useEffect, useState } from 'react';
import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { CarriersTable } from '../components/CarriersTable';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';


function Carriers() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [carriers, setCarriers] = useState([])

    //API call
    function fetchData() {
        const carriersURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/transportadores";

        axios.get(carriersURL).then(
            (response) => {
                setCarriers(response.data);
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
                <DistribuidoraBox>
    
                    <h1 style={{margin: "0"}}>Transportadores</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </Container>
    
                </DistribuidoraBox>
            </>
        )
    }
    else {
        return (
            <>
            <DistribuidoraBox>

                <h1 style={{margin: "0"}}>Transportadores</h1>
                <hr style={{height: "1px"}}/>

                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "40px 0 20px 0"}}>
                    <h3>Transportadores Ativos</h3>
                    <CarriersTable carriers={carriers}></CarriersTable>
                </Container>

            </DistribuidoraBox>
        </>
        )
    }
}

export default Carriers;