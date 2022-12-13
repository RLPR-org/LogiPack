import '../../App.css';

import Container from '@mui/material/Container';
import { Button } from '@mui/material/';
import { TextField } from '@mui/material/';
import { Grid } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

function ClienteLogin() {

    const navigate = useNavigate();

    const handleLogin = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if(email === '' || password === '') {
            document.getElementById('error').innerHTML = 'Preencha todos os campos';
            return;
        }

        // call api
        // returns id, if not found returns -1
        let id = 0;

        if (id === -1) {
            document.getElementById('error').innerHTML = 'Email ou senha incorretos';
            return;
        }
        sessionStorage.setItem('user', 'cliente');
        sessionStorage.setItem('id', id);        
        navigate('/cliente/' + id);
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
                        <TextField 
                            required 
                            id="email"
                            type='email' 
                            label="Email" 
                            variant="outlined" 
                            style={{marginBottom: '30px', width: '100%'}} 
                        />
                        <TextField 
                            required 
                            id="password" 
                            type='password' 
                            label="Senha" 
                            variant="outlined" 
                            style={{marginBottom: '30px', width: '100%'}} 
                        />
                        <Button variant="contained" color="primary" style={{width: '200px', height: '50px'}} onClick={handleLogin}>Entrar</Button>
                        <p style={{color: 'red', marginTop: '20px'}} id='error'></p>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ClienteLogin;