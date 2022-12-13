import '../../App.css';

import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { TransportadorBox } from '../components/TransportadorBox';
import { PackageDetails } from '../components/PackageDetails';


function Package() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [packageInfo, setPackageInfo] = useState(null)
    const [packageDetails, setPackageDetails] = useState(null)

    let carrierId = useParams().id;
    let packageId = useParams().package;

    //API CALLs
    function fetchData() {
        const infoURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/" + packageId;
        const detailsURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/" + packageId + "/details";

        const getInfo = axios.get(infoURL);
        const getDetails = axios.get(detailsURL);

        axios.all([getInfo, getDetails]).then(
            axios.spread(
                (...allData) => {
                    setPackageInfo(allData[0].data);
                    setPackageDetails(allData[1].data);
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

                    <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
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
                    <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
                    <hr style={{height: "1px"}}/>

                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <PackageDetails packageInfo={packageInfo} packageDetails={packageDetails}></PackageDetails>
                    </Container> 

                </TransportadorBox>
            </>
        )
    }
}

export default Package;