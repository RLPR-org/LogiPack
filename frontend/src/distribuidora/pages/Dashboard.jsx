import '../../App.css';

import { CheckLogin } from '../../CheckLogin';

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
    const [packagesView, setPackagesView] = useState([])
    const [carriersView, setCarriersView] = useState([])
    const [packages, setPackages] = useState([])
    const [carriers, setCarriers] = useState([])


    function fetchData() {
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas";
        const carriersURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/transportadores";

        const getPackages = axios.get(packagesURL);
        const getCarriers = axios.get(carriersURL);

        axios.all([getPackages, getCarriers]).then(
            axios.spread(
                (...allData) => {
                    const packages = allData[0].data;
                    const carriers = allData[1].data;

                    setPackages(packages);
                    setCarriers(carriers);

                    setPackagesView(packages.filter((p) => p.estado != "CONFIRMADA").sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));
                    setCarriersView(carriers.filter((c) => c.estado != "INATIVO").sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));

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
                <CheckLogin user="distribuidora" />
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
                <CheckLogin user="distribuidora" />
                <DistribuidoraBox>

                    <h1 style={{margin: "0"}}>Dashboard</h1>
                    <hr style={{height: "1px"}}/>

                    {/* ------- Dashboard general info ------- */}
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <GeneralInfo
                            packages={packages}
                            carriers={carriers}

                    >
                            
                            </GeneralInfo>
                    </Container>  
                    

                    {/* ------- Encomendas ativas ------- */}
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Encomendas Ativas</h3>
                        <PackagesTable packages={packagesView}></PackagesTable>
                    </Container>


                    {/* ------- Transportadores ativos ------- */}
                    <Container maxWidth="xl" style={{padding: "40px 0 20px 0"}}>
                        <h3>Transportadores Ativos</h3>
                        <CarriersTable carriers={carriersView}></CarriersTable>
                    </Container>

                </DistribuidoraBox>
            </>
        )
    }
}

export default Dashboard;