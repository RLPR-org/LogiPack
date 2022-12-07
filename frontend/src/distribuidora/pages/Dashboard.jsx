import '../../App.css';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';
import { CarriersTable } from '../components/CarriersTable';
import { GeneralInfo } from '../components/GeneralInfo';


function Dashboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])
    const [carriers, setCarriers] = useState([])
    const [totalEncomendas, setTotalEncomendas] = useState(0)
    const [totalTransportadores, setTotalTransportadores] = useState(0)

    
    //API CALL - PACKAGES
    useEffect(() => {

        fetch("http://localhost:8080/encomendas")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTotalEncomendas(result.length);
                    const resultsSorted = result.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1) 
                    setPackages(resultsSorted.slice(0, 5));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    //API CALL - CARRIERS
    useEffect(() => {

        fetch("http://localhost:8080/transportadores")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTotalTransportadores(result.length);
                    const resultsSorted = result.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1) 
                    setCarriers(resultsSorted.slice(0, 5));
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

                    <h1 style={{margin: "0"}}>Dashboard</h1>
                    <hr style={{height: "1px"}}/>

                    {/* ------- Dashboard general info ------- */}
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

                    <h1 style={{margin: "0"}}>Dashboard</h1>
                    <hr style={{height: "1px"}}/>

                    {/* ------- Dashboard general info ------- */}
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <GeneralInfo totalEncomendas={totalEncomendas} totalTransportadores={totalTransportadores}></GeneralInfo>
                    </Container>  
                    

                    {/* ------- Encomendas ativas ------- */}
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Encomendas Ativas</h3>
                        <PackagesTable packages={packages}></PackagesTable>
                    </Container>


                    {/* ------- Transportadores ativos ------- */}
                    <Container maxWidth="xl" style={{padding: "40px 0 20px 0"}}>
                        <h3>Transportadores Ativos</h3>
                        <CarriersTable carriers={carriers}></CarriersTable>
                    </Container>

                </DistribuidoraBox>
            </>
        )
    }
}

export default Dashboard;