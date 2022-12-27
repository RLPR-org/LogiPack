import './App.css';

import { Grid, Button } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

function Home() {

    sessionStorage.setItem('user', undefined);
    sessionStorage.setItem('id', -1);
    sessionStorage.setItem('token', undefined);

    const navigate = useNavigate();

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{height: '100vh'}}>
                <Grid item>
                    <Button className="index-btn" variant="contained" color="primary" onClick={() => navigate('/cliente/login')}>Cliente</Button>
                    <Button className="index-btn" variant="contained" color="secondary" onClick={() => navigate('/distribuidora/login')}>Distribuidora</Button>
                    <Button className="index-btn" variant="contained" color="success" onClick={() => navigate('/transportador/login')}>Transportador</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;