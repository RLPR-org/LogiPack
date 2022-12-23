import '../../App.css';

import React, { useEffect, useState } from 'react';
import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';
import axios from 'axios';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Packages() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas";

        axios.get(packagesURL).then(
            (response) => {
                setPackages(response.data.filter((p) => p.estado != "CONFIRMADA"));
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
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
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
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Encomendas Ativas</h3>
                        <PackagesTable packages={packages}></PackagesTable>
                    </Container>
    
                </DistribuidoraBox>
            </>
        )
    }
}

export default Packages;