import '../../App.css';

import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TransportadorBox } from '../components/TransportadorBox';
import { PackagesTable } from '../components/PackagesTable';
import axios from 'axios';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Packages() {
    let carrierId = useParams().id;
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const packagesURL = "http://localhost:8080/transportadores/" +  carrierId;

        axios.get(packagesURL).then(
            (response) => {
                setPackages(response.data.encomendas);
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
    
                    <h1 style={{margin: "0"}}>Mercadoria</h1>
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
    
                    <h1 style={{margin: "0"}}>Mercadoria</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>A sua mercadoria</h3>
                        <PackagesTable packages={packages}></PackagesTable>
                    </Container>
    
                </TransportadorBox>
            </>
        )
    }
}

export default Packages;