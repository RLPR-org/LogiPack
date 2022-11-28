import '../../App.css';

import Container from '@mui/material/Container';

import React, { useEffect, useState } from 'react';
import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';
import { useNavigate } from 'react-router-dom';

function Packages() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])

    //API call
    useEffect(() => {

        fetch("https://6383db854ce192ac604c09da.mockapi.io/logipack/encomendas")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPackages(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <ul>
                {packages.map(obj => (
                <li key={obj.id}>
                    {obj.peso} {obj.emissor} {obj.destinatario}
                </li>
                ))}
          </ul>
        )
    }

    //make an API call and pass the data to component
    const packagesData = null

    return (
        <>
            <DistribuidoraBox>

                <h1 style={{margin: "0"}}>Encomendas</h1>
                <hr style={{height: "1px"}}/>


                {/* ------- Encomendas ativas ------- */}
                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <h3>Encomendas Ativas</h3>
                    <PackagesTable packagesData={packagesData}></PackagesTable>
                </Container>

            </DistribuidoraBox>
        </>
    )
}

export default Packages;