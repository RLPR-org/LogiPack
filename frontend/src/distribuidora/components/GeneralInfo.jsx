import '../../App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Chart } from './PieCharts';

const encomendasDataChart = {
    labels: ['Em espera', 'Em distribuição', 'Em trânsito', 'Entregue'],
    datasets: [
        {
        label: '# of Votes',
        data: [12, 10, 30, 20],
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
    labels: ['Em deslocação', 'Em pausa'],
    datasets: [
        {
        label: '# of Votes',
        data: [5, 29],
        backgroundColor: [
            'rgba( 117, 246, 69 , 0.2)',
            'rgba( 238, 179, 75 , 0.2)'
        ],
        borderColor: [
            'rgba( 69, 209, 16 , 1)',
            'rgba( 221, 144, 9 , 1)'
        ],
        borderWidth: 1,
        },
    ],
};

function GeneralInfo() {
    return (
        <Box style={{padding: "30px"}}>
            
            {/* ---------- general info ---------- */}
            <Grid container spacing={2}>

                <Grid xs style={{height: "300px"}}>
                    <Box className='info-box'>
                        <h3 style={{margin: "0"}}>Encomendas em distribuição</h3>
                        <div style={{textAlign: "center"}}>
                            <p style={{fontSize: "35px", margin: "15px 0 0 0", color: "#0072d8"}}>125</p>
                        </div>
                    </Box>
        
                    <Box className='info-box'>                     
                        <h3 style={{margin: "0"}}>Transportadores ativos</h3>
                        <div style={{textAlign: "center"}}>
                            <p style={{fontSize: "35px", margin: "15px 0 0 0", color: "#298800"}}>34</p>
                        </div>
                    </Box>
                </Grid>
        
                <Grid xs display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                    <Chart data={encomendasDataChart}></Chart>
                </Grid>
        
                <Grid xs display="flex" justifyContent="center" alignItems="center"  style={{height: "300px"}}>
                    <Chart data={CarriersDataChart}></Chart>
                </Grid>
        
            </Grid>
        </Box>
    )
}

export { GeneralInfo };