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
            <Grid container justifyContent="center" alignItems="center" style={{
                height: '100vh',
                backgroundImage: 'url(https://www.wallpapertip.com/wmimgs/78-782409_truck-driving-industry-shutterstock-caminho.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
                }}>
                <Grid item style={{
                    height: '40vh',
                    width: '100%',
                    // glass effect
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 10px lightgray',
                    borderColor: 'lightgray',
                    // vertical align
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button className="index-btn" variant="contained" color="primary" onClick={() => navigate('/cliente/login')}>
                        <div className='index-btn-text'>Cliente</div></Button>
                    <Button className="index-btn" variant="contained" color="secondary" onClick={() => navigate('/distribuidora/login')}>
                    <div className='index-btn-text'>Distribuidora</div></Button>
                    <Button className="index-btn" variant="contained" color="success" onClick={() => navigate('/transportador/login')}>
                    <div className='index-btn-text'>Transportador</div></Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;