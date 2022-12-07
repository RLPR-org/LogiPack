import '../../App.css';

import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackageDetails } from '../components/PackageDetails';


function Package() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [packageInfo, setPackageInfo] = useState(null)
    const [packageDetails, setPackageDetails] = useState(null)
    const [carriers, setCarriers] = useState([])

    let packageId = useParams().id;
    

    //make an API call with the packageId and pass to component
    const packageData = null
    var aux = 0;

    //API CALL - PACKAGE
    useEffect(() => {

        fetch("http://localhost:8080/encomendas/" + packageId)
            .then(res => res.json())
            .then(
                (result) => {
                    setPackageInfo(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])



    //API CALL - PACKAGE DETAILS
    useEffect(() => {

        fetch("http://localhost:8080/encomendas/" + packageId + "/details")
            .then(res => res.json())
            .then(
                (result) => {
                    setPackageDetails(result);
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

                    <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
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
                    <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
                    <hr style={{height: "1px"}}/>

                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <PackageDetails packageInfo={packageInfo} packageDetails={packageDetails}></PackageDetails>
                    </Container> 

                </DistribuidoraBox>
            </>
        )
    }












































    return (
        <>
            <DistribuidoraBox>
                <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
                <hr style={{height: "1px"}}/>

                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <PackageDetails packageId={packageId} packageData={packageData}></PackageDetails>
                </Container> 

            </DistribuidoraBox>
        </>
    )
}

export default Package;