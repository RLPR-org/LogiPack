import '../../App.css';
import { CheckLogin } from '../../CheckLogin';

import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ClienteBox } from '../components/ClienteBox';
import { PackagesTable } from '../components/PackagesTable';
import axios from 'axios';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Packages() {
    let clientId = useParams().id;
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/cliente/" +  clientId + "/encomendas";

        axios.get(packagesURL).then(
            (response) => {
                setPackages(response.data);
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
                <CheckLogin user="cliente"/>
                <ClienteBox clientId={clientId}>
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </Container>
    
                </ClienteBox>
            </>
        )
    }
    else {
        return (
            <>
                <CheckLogin user="cliente"/>
                <ClienteBox clientId={clientId}>
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>

                        {packages.length == 0 ?
                            <div style={{"textAlign": "center"}}>
                                <h3 style={{"color": "gray"}}>Não existem encomendas ativas</h3> 
                            </div>

                            :

                            <>
                                <h3>As suas encomendas</h3>
                                <PackagesTable packages={packages}></PackagesTable>
                            </>
                        }
                    </Container>
    
                </ClienteBox>
            </>
        )
    }
}

export default Packages;