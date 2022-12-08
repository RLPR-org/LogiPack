import '../../App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Chart } from './PieCharts';
import React, { useEffect, useState } from 'react';


function getStatisticPackages(packages) {
    const statistic = [0, 0, 0, 0];

    for (var i=0; i<packages.length; i++) {

        switch (packages[i].estado) {
            case "REGISTADA":
                statistic[0] += 1;
                break;

            case "EM_DISTRIBUICAO":
                statistic[1] += 1;
                break;

            case "EM_TRANSITO":
                statistic[2] += 1;
                break;

            case "ENTREGUE":
                statistic[3] += 1;
                break;
        
            default:
                break;
        }
    }

    return statistic;
}

function getStatisticCarriers(carriers) {
    const statistic = [0, 0, 0, 0];

    for (var i=0; i<carriers.length; i++) {

        switch (carriers[i].estado) {
            case "INATIVO":
                statistic[0] += 1;
                break;

            case "EM_TRANSITO":
                statistic[1] += 1;
                break;

            case "PARADO":
                statistic[2] += 1;
                break;

            case "EM_PAUSA":
                statistic[3] += 1;
                break;
        
            default:
                break;
        }
    }

    return statistic;
    
}


function GeneralInfo(props) {

    const packages = props.packages;
    const carriers = props.carriers;
    const [packagesChart, setPackagesChart] = useState([])
    const [carriersChart, setCarriersChart] = useState([])

    useEffect(() => {
        setPackagesChart(getStatisticPackages(packages));
        setCarriersChart(getStatisticCarriers(carriers));
    }, []);

    const encomendasDataChart = {
        labels: ['Registada', 'Em distribuição', 'Em trânsito', 'Entregue'],
        datasets: [
            {
                data: packagesChart,
                backgroundColor: [
                    'rgba(205, 205, 205, 0.2)',
                    'rgba(108, 179, 255, 0.2)',
                    'rgba( 238, 179, 75 , 0.2)',
                    'rgba( 117, 246, 69 , 0.2)'
                ],
                borderColor: [
                    'rgba(132, 132, 132 , 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba( 221, 144, 9 , 1)',
                    'rgba( 69, 209, 16 , 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const CarriersDataChart = {
        labels: ['Inativo', 'Em trânsito', 'Parado', 'Em pausa'],
        datasets: [
            {
                data: carriersChart,
                backgroundColor: [
                    'rgba(205, 205, 205, 0.2)',
                    'rgba( 238, 179, 75 , 0.2)',
                    'rgba(157, 45, 255 , 0.2)',
                    'rgba(108, 179, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(132, 132, 132 , 1)',
                    'rgba( 221, 144, 9 , 1)',
                    'rgba(157, 45, 255 , 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    

    return (
        <Box style={{padding: "30px"}}>
            
            {/* ---------- general info ---------- */}
            <Grid container spacing={2}>

                <Grid item xs={4} style={{height: "300px"}}>
                    <Box className='info-box'>
                        <h3 style={{margin: "0"}}>Encomendas em processamento</h3>
                        <div style={{textAlign: "center"}}>
                            <p style={{fontSize: "35px", margin: "15px 0 0 0", color: "#0072d8"}}>{packages.length}</p>
                        </div>
                    </Box>
        
                    <Box className='info-box'>                     
                        <h3 style={{margin: "0"}}>Transportadores ativos</h3>
                        <div style={{textAlign: "center"}}>
                            <p style={{fontSize: "35px", margin: "15px 0 0 0", color: "#298800"}}>{carriers.length}</p>
                        </div>
                    </Box>
                </Grid>
        
                <Grid item xs={4} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                    <Chart data={encomendasDataChart}></Chart>
                </Grid>
        
                <Grid item xs={4} display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                    <Chart data={CarriersDataChart}></Chart>
                </Grid>
        
            </Grid>
        </Box>
    )
}

export { GeneralInfo };