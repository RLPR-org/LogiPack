import '../../App.css';
import { CheckLogin } from '../../CheckLogin';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ClienteBox } from '../components/ClienteBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from '../../CustomAxios';
import NotificationsList from '../components/NotificationsList';
import { PackagesTable } from '../components/PackagesTable';


function Dashboard() {
    let clientId = useParams().id;
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [notifications, setNotifications] = useState([])
    const [packages, setPackages] = useState([])

    //API call
    function fetchData() {
        const notificationsURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/cliente/" + clientId + "/notificacoes";
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/cliente/" + clientId + "/encomendas";

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
                <CheckLogin user="cliente"/>
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
            <CheckLogin user="cliente"/>
            <ClienteBox clientId={clientId}>

                <h1 style={{margin: "0"}}>Dashboard</h1>
                <hr style={{height: "1px"}}/>

                {notifications.length === 0 && packages.length === 0 &&
                    <div style={{"textAlign": "center"}}>
                        <h3 style={{"color": "gray"}}>Não existe conteúdo a mostrar</h3> 
                    </div>
                }


                {notifications.length > 0 &&
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                            <h3>Notificações recentes</h3>
                        <NotificationsList notifications={notifications}></NotificationsList>
                        <div style={{"textAlign": "center", "paddingTop": "10px"}}>
                            <span className='seeMoreLink' onClick={()=> navigate('/cliente/' + clientId + "/notificacoes")}>Ver mais notificações</span>
                        </div>
                    </Container>
                }


                {packages.length > 0 &&
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Encomendas atualizadas recentemente</h3>
                        <PackagesTable packages={packages}></PackagesTable>

                        <div style={{"textAlign": "center", "paddingTop": "15px"}}>
                            <span className='seeMoreLink' onClick={()=> navigate('/cliente/' + clientId + "/encomendas")}>Ver todas as encomendas</span>
                        </div>
                    </Container>
                }



            </ClienteBox>
           
        </>
    )
}

export default Dashboard;