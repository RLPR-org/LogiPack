import '../../App.css';

import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackageDetails } from '../components/PackageDetails';


function Package() {
    let packageId = useParams().id;

    //make an API call with the packageId and pass to component
    const packageData = null

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