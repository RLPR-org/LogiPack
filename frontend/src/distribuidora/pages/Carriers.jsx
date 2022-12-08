import '../../App.css';

import React, { useEffect, useState } from 'react';
import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { CarriersTable } from '../components/CarriersTable';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Carriers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [carriers, setCarriers] = useState([])

    //API call
    useEffect(() => {

        fetch("http://localhost:8080/transportadores")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    const resultsSorted = result.sort((a, b) => (a.id > b.id) ? 1 : -1) 
                    setCarriers(resultsSorted);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
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