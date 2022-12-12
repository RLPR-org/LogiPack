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


function Dashboard() {
    let clientId = useParams().id;
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [notifications, setNotifications] = useState([])
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const notificationsURL = "http://localhost:8080/cliente/" + clientId + "/notificacoes";
        const packagesURL = "http://localhost:8080/cliente/" + clientId + "/encomendas";

        const getNotifications = axios.get(notificationsURL);
        const getPackages = axios.get(packagesURL);

        axios.all([getNotifications, getPackages]).then(
            axios.spread(
                (...allData) => {
                    const notifications = allData[0].data;
                    const packages = allData[1].data;

                    setNotifications(notifications.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));
                    setPackages(packages.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).slice(0, 5));

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
                {/* <CheckLogin user="cliente"></CheckLogin> */}
                <ClienteBox clientId={clientId}>
    
                    <h1 style={{margin: "0"}}>Dashboard</h1>
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
            {/* <CheckLogin user="cliente"></CheckLogin> */}
            <ClienteBox>

                <h1 style={{margin: "0"}}>Dashboard</h1>
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

export default Dashboard;