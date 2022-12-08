import '../../App.css';

import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { CarrierDetails } from '../components/CarrierDetails';
import { TransportadorBox } from '../components/TransportadorBox';

function Account() {

    let carrierId = useParams().id;
    const [isLoaded, setIsLoaded] = useState(false);
    const [carrierInfo, setCarrierInfo] = useState(null)
    const [carrierDetails, setCarrierDetails] = useState(null)

    function fetchData() {
        const infoURL = "http://localhost:8080/transportadores/" + carrierId;
        const detailsURL = "http://localhost:8080/transportadores/" + carrierId + "/details";

        const getInfo = axios.get(infoURL);
        const getDetails = axios.get(detailsURL);

        axios.all([getInfo, getDetails]).then(
            axios.spread(
                (...allData) => {
                    setCarrierInfo(allData[0].data);
                    setCarrierDetails(allData[1].data);
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
                <TransportadorBox carrierId={carrierId}>

                    <h1 style={{margin: "0"}}>Transportador {carrierId}</h1>
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

                    <h1 style={{margin: "0"}}>Transportador {carrierId}</h1>
                    <hr style={{height: "1px"}}/>

                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <CarrierDetails carrierInfo={carrierInfo} carrierDetails={carrierDetails}></CarrierDetails>
                    </Container> 

                </TransportadorBox>
            </>
        )
    }

}

export default Account;