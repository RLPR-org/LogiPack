import '../../App.css';

import Container from '@mui/material/Container';
import { Button } from '@mui/material/';
import { TextField } from '@mui/material/';
import { Grid } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

function DistribuidoraLogin() {

    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('email: ', document.getElementById('email').value);
        console.log('password: ', document.getElementById('password').value);
        navigate('/distribuidora');
    }

    return (
        <>
            <Container maxWidth="sm">
                <Grid container justifyContent="center" alignItems="center" style={{height: '100vh'}}>
                    <Grid item style={{
                        textAlign: 'center', 
                        border: '1px solid #000', 
                        padding: '20px', 
                        borderRadius: '10px',
                        boxShadow: '0 0 10px lightgray',
                        borderColor: 'lightgray',
                        width: '100%'
                        }}>
                        <h1>Login</h1>
                        <TextField id="email" label="Email" variant="outlined" style={{marginBottom: '30px', width: '100%'}} />
                        <TextField id="password" label="Senha" variant="outlined" style={{marginBottom: '30px', width: '100%'}} />
                        <Button variant="contained" color="primary" style={{width: '200px', height: '50px'}} onClick={handleLogin}>Entrar</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default DistribuidoraLogin;