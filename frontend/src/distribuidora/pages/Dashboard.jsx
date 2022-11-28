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

    
    //API CALL - PACKAGES
    useEffect(() => {

        fetch("https://6383db854ce192ac604c09da.mockapi.io/logipack/encomendas")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    const resultsSorted = result.sort((a, b) => (a.lastUpdate < b.lastUpdate) ? 1 : -1) 
                    setPackages(resultsSorted.slice(0, 10));
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
                        <GeneralInfo></GeneralInfo>
                    </Container>  
                    

                    {/* ------- Encomendas ativas ------- */}
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Encomendas Ativas</h3>
                        <PackagesTable packages={packages}></PackagesTable>
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
}

export default Dashboard;