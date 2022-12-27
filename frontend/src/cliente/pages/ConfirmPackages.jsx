import '../../App.css';

import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ClienteBox } from '../components/ClienteBox';
import { PackagesTableConfirm } from '../components/PackagesTableConfirm';
import axios from '../../CustomAxios';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function ConfirmPackages() {
    let clientId = useParams().id;
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/cliente/" +  clientId + "/encomendas";

        axios.get(packagesURL).then(
            (response) => {
                const aux = []

                for (var i=0; i<response.data.length; i++) {
                    if (response.data[i].estado == "ENTREGUE") {
                        aux.push(response.data[i])
                    }
                }
                setPackages(aux);
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
                <ClienteBox clientId={clientId}>
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>

                        {packages.length == 0 ?
                            <div style={{"textAlign": "center"}}>
                                <h3 style={{"color": "gray"}}>Não existem encomendas a confirmar</h3> 
                            </div>

                            :

                            <>
                                <h3>As suas encomendas</h3>
                                <PackagesTableConfirm packages={packages}></PackagesTableConfirm>
                            </>
                        }

                    </Container>
    
                </ClienteBox>
            </>
        )
    }
}

export default ConfirmPackages;