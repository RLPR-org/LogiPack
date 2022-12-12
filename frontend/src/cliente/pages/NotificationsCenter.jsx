import '../../App.css';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ClienteBox } from '../components/ClienteBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import NotificationsList from '../components/NotificationsList';


function NotificationsCenter() {
    let clientId = useParams().id;
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [notifications, setNotifications] = useState([])


    //API call
    function fetchData() {
        const packagesURL = "http://localhost:8080/transportadores/" + carrierId;

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
                <ClienteBox clientId={clientId}>
    
                    <h1 style={{margin: "0"}}>Central de Notificações</h1>
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

    return (
        <>
            <ClienteBox>

                <h1 style={{margin: "0"}}>Central de Notificações</h1>
                <hr style={{height: "1px"}}/>


                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Notificações recentes</h3>
                    <NotificationsList notifications={notifications}></NotificationsList>
                    <div style={{"textAlign": "center", "paddingTop": "10px"}}>
                        <span className='seeMoreLink' onClick={()=> navigate('/cliente/' + clientId + "/notificacoes")}>Ver mais notificações</span>
                    </div>
                </Container>


            </ClienteBox>
           
        </>
    )
}

export default NotificationsCenter;