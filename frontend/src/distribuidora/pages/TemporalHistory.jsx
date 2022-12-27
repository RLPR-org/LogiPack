import '../../App.css';

import { CheckLogin } from '../../CheckLogin';

import React from 'react';
import Container from '@mui/material/Container';

import { DistribuidoraBox } from '../components/DistribuidoraBox';
import {PackageHistory} from '../components/PackageHistory';


function TemporalHistory() {
    return (
        <>
            <CheckLogin user="distribuidora" />
            <DistribuidoraBox>

                <h1 style={{margin: "0"}}>Histórico</h1>
                <hr style={{height: "1px"}}/>

                <Container maxWidth="xl" style={{padding: "40px 0 20px 0"}}>
                    <PackageHistory></PackageHistory> 
                </Container>

            </DistribuidoraBox>
        </>
    )

}

export default TemporalHistory;