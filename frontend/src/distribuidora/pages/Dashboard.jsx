import '../../App.css';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';
import { CarriersTable } from '../components/CarriersTable';
import { GeneralInfo } from '../components/GeneralInfo';


function Dashboard() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])
    const [carriers, setCarriers] = useState([])
    const [totalEncomendas, setTotalEncomendas] = useState(0)
    const [totalTransportadores, setTotalTransportadores] = useState(0)


    function fetchData() {
        const packagesURL = "http://localhost:8080/encomendas";
        const carriersURL = "http://localhost:8080/transportadores";

        const getPackages = axios.get(packagesURL);
        const getCarriers = axios.get(carriersURL);

        axios.all([getPackages, getCarriers]).then(
            axios.spread(
                (...allData) => {
                    const packages = allData[0].data;
                    const carriers = allData[1].data;

                    setTotalEncomendas(packages.length);
                    setTotalTransportadores(carriers.length);

                    setPackages(packages.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));
                    setCarriers(carriers.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));

                    setIsLoaded(true);
                }
            )
        )
    }


    useEffect(() => {
        fetchData();
    }, []);
    

    if (!isLoaded) {
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