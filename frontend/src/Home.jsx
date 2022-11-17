import './App.css';

import { Grid, Button } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{height: '100vh'}}>
                <Grid item>
                    <Button className="index-btn" variant="contained" color="primary" onClick={() => navigate('/cliente')}>«Cliente</Button>
                    <Button className="index-btn" variant="contained" color="secondary" onClick={() => navigate('/distribuidora')}>Distribuidora</Button>
                    <Button className="index-btn" variant="contained" color="success" onClick={() => navigate('/transportador')}>Transportador</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;