import '../../App.css';

import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { CarrierDetails } from '../components/CarrierDetails';

function Carrier() {

    let carrierId = useParams().id;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [carrierInfo, setCarrierInfo] = useState(null)
    const [carrierDetails, setCarrierDetails] = useState(null)


    //API CALL - CARRIER
    useEffect(() => {
        fetch("http://localhost:8080/transportadores/" + carrierId)
            .then(res => res.json())
            .then(
                (result) => {
                    setCarrierInfo(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])



    //API CALL - CARRIER DETAILS
    useEffect(() => {

        fetch("http://localhost:8080/transportadores/" + carrierId + "/details")
            .then(res => res.json())
            .then(
                (result) => {
                    setCarrierDetails(result);
                    setIsLoaded(true);
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

                    <h1 style={{margin: "0"}}>Transportador {carrierId}</h1>
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

                    <h1 style={{margin: "0"}}>Transportador {carrierId}</h1>
                    <hr style={{height: "1px"}}/>

                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <CarrierDetails carrierInfo={carrierInfo} carrierDetails={carrierDetails}></CarrierDetails>
                    </Container> 

                </DistribuidoraBox>
            </>
        )
    }

}

export default Carrier;