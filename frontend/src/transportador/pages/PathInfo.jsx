import '../../App.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import axios from 'axios';
import { TransportadorBox } from '../components/TransportadorBox';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function PathInfo() {
    const API_KEY = "AIzaSyBhIQVqF_gxcKuvVy0f5q-Nif5u5MWCAto";

    const ORIGIN = {
        "distrito":	"Aveiro",
        "concelho":	"Aveiro",
        "freguesia":	"Vera Cruz",
        "rua":	"Av. Dr. David Cristo",
        "codigopostal":	"1070-036"
    }

    let carrierId = useParams().id;
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])


    //API call
    function fetchData() {
        const packagesURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/transportadores/" + carrierId;

        axios.get(packagesURL).then(
            (response) => {
                setPackages(response.data.encomendas.filter((p) => p.estado != "CONFIRMADA"));
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
                <TransportadorBox carrierId={carrierId}>
    
                    <h1 style={{margin: "0"}}>Trajeto</h1>
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

        if (packages.length == 0) {
            return (
                <>
                    <TransportadorBox carrierId={carrierId}>
        
                        <h1 style={{margin: "0"}}>Trajeto</h1>
                        <hr style={{height: "1px"}}/>
        
                        <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                            <div style={{"textAlign": "center"}}>
                                <h2 style={{"color": "gray"}}>Não tem encomendas para entregar</h2>
                            </div>
                        </Container>
        
                    </TransportadorBox>
                </>
            )
        }

        return (
            <>
                <TransportadorBox carrierId={carrierId}>

                    <h1 style={{margin: "0"}}>Trajeto</h1>
                    <hr style={{height: "1px"}}/>


                    {packages.length > 0 &&

                        <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                            <h2>Informações sobre o trajeto de entrega</h2>

                            <Box sx={{ flexGrow: 1 }} style={{"margin": "20px 0 30px 0"}}>
                                
                                <Grid container spacing={0}>

                                    <Grid item xs={5} className='locationContainer'>
                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Distrito</p>
                                            <p className='location'>{ORIGIN.distrito}</p>
                                        </div>

                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Concelho</p>
                                            <p className='location'>{ORIGIN.concelho}</p>
                                        </div>


                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Freguesia</p>
                                            <p className='location'>{ORIGIN.freguesia}</p>
                                        </div>

                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Rua</p>
                                            <p className='location'>{ORIGIN.rua}</p>
                                        </div>

                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Código Postal</p>
                                            <p className='location'>{ORIGIN.codigopostal}</p>
                                        </div>  
                                    </Grid>

                                    <Grid item xs={2} container display="flex" justifyContent="center" alignItems="center" style={{"padding": "0px"}}>
                                        <KeyboardDoubleArrowRightIcon fontSize='large'></KeyboardDoubleArrowRightIcon>
                                        <KeyboardDoubleArrowRightIcon fontSize='large'></KeyboardDoubleArrowRightIcon>
                                        <KeyboardDoubleArrowRightIcon fontSize='large'></KeyboardDoubleArrowRightIcon>
                                        <KeyboardDoubleArrowRightIcon fontSize='large'></KeyboardDoubleArrowRightIcon>
                                    </Grid>

                                    <Grid item xs={5} className='locationContainer'>
                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Distrito</p>
                                            <p className='location'>{packages[0].localizacao.distrito}</p>
                                        </div>

                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Concelho</p>
                                            <p className='location'>{packages[0].localizacao.concelho}</p>
                                        </div>


                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Freguesia</p>
                                            <p className='location'>{packages[0].localizacao.freguesia}</p>
                                        </div>

                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Rua</p>
                                            <p className='location'>{packages[0].localizacao.rua}</p>
                                        </div>

                                        <div style={{"padding": "5px 0 5px 0"}}>
                                            <p className='labelLocation'>Código Postal</p>
                                            <p className='location'>{packages[0].localizacao.codigopostal}</p>
                                        </div>  
                                    </Grid>

                                </Grid>
                            </Box>

                            <iframe
                                title="map"
                                width="100%"
                                height="500px"
                                style={{border:0}}
                                loading="lazy"
                                allowFullScreen
                                src={
                                    "https://www.google.com/maps/embed/v1/directions"
                                    + "?key=" + API_KEY
                                    + "&origin=Portugal+" + ORIGIN.distrito + "+" + ORIGIN.rua
                                    + "&destination=Portugal+" + packages[0].localizacao.distrito + "+" + packages[0].localizacao.rua
                                }
                                className='map'
                            >
                            </iframe>
                        
                        </Container>
                        
                    }

                </TransportadorBox>
            </>
        )
    }

}

export default PathInfo;