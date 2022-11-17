import '../../App.css';

import { Button } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <Button  variant="contained" color="primary" onClick={() => navigate('/')}>back</Button>
            <h1>Home Transportador</h1>
        </>
    )
}

export default Home;