import '../../App.css';

import React, { useEffect, useState } from 'react';
import { DistribuidoraBox } from '../components/DistribuidoraBox';
import { PackagesTable } from '../components/PackagesTable';
import axios from '../../CustomAxios';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


function Packages() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [packages, setPackages] = useState([])
    const [stateFilter, setStateFilter] = useState("")

    //API call
    function fetchData(packagesURL) {
        console.log(packagesURL);

        axios.get(packagesURL).then(
            (response) => {
                setPackages(response.data.filter((p) => p.estado != "CONFIRMADA"));
                setIsLoaded(true);
            }
        )
    }

    const handleChange = (event) => {
        setStateFilter(event.target.value);
        fetchData("http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas?estado=" + event.target.value);
    };

    useEffect(() => {
        fetchData("http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas");
    }, []);


    if (!isLoaded) {
        return (
            <>
                <DistribuidoraBox>
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </Container>
    
                </DistribuidoraBox>
            </>
        )
    }
    else {
        return (
            <>
                <DistribuidoraBox>
    
                    <h1 style={{margin: "0"}}>Encomendas</h1>
                    <hr style={{height: "1px"}}/>
    
                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                        <h3>Encomendas Ativas</h3>

                        <div style={{"margin": "10px", "width": "300px", "float": "right"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Estado da encomenda</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={stateFilter} label="Estados" onChange={handleChange} >
                                    <MenuItem value={"REGISTADA"}><Chip label="Registada" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/></MenuItem>
                                    <MenuItem value={"EM_TRANSITO"}><Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/></MenuItem>
                                    <MenuItem value={"EM_DISTRIBUICAO"}><Chip label="Em distribuição" color="info" size="small" style={{backgroundColor: "#4B84FF", color: "white"}}/></MenuItem>
                                    <MenuItem value={"ENTREGUE"}><Chip label="Entregue" size="small" style={{backgroundColor: "#48AD32", color: "white"}}/></MenuItem>
                                    <MenuItem value={""}><Chip label="Limpar" size="small" style={{backgroundColor: "#cf3d3d", color: "white"}}/></MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        
                        <PackagesTable packages={packages}></PackagesTable>

                    </Container>
    
                </DistribuidoraBox>
            </>
        )
    }
}

export default Packages;