import '../../App.css';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ClienteBox } from '../components/ClienteBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios';
import NotificationsList from '../components/NotificationsList';


function NotificationsCenter() {
    let clientId = useParams().id;
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [notifications, setNotifications] = useState([])

    function clearNotificationCenter() {
        const url = "http://" + process.env.REACT_APP_API_HOST + ":8080/cliente/" + clientId + "/notificacoes";
        axios.delete(url);
        setNotifications([]);
    }

    //API call
    function fetchData() {
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/cliente/" + clientId + "/notificacoes";

        axios.get(packagesURL).then(
            (response) => {
                const notificationsAux = response.data;
                setNotifications(notificationsAux.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1));
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
            <ClienteBox clientId={clientId}>

                <h1 style={{margin: "0"}}>Central de Notificações</h1>
                <hr style={{height: "1px"}}/>


                <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>


                    {notifications.length > 0 ? (
                        <>
                            <div style={{"marginBottom": "20px", "textAlign": "end"}}>
                                <form id='deleteForm' onSubmit={ () => {clearNotificationCenter()}}>
                                    <Button style={{"backgroundColor": "#d52323", "textTransform": "unset"}} type="submit"variant="contained" endIcon={<DeleteIcon />}>Limpar central de notificações</Button>
                                </form>
                            </div>
                            <NotificationsList notifications={notifications}></NotificationsList>
                        </>
                    ) : (
                        <>
                            <div style={{"textAlign": "center"}}>
                                <h3 style={{"color": "gray"}}>Não existem novas notificações</h3> 
                            </div>
                        </>
                    )}


                </Container>


            </ClienteBox>
           
        </>
    )
}

export default NotificationsCenter;