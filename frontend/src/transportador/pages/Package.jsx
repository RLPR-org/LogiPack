import '../../App.css';
import { CheckLogin } from '../../CheckLogin';

import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { TransportadorBox } from '../components/TransportadorBox';
import { PackageDetails } from '../components/PackageDetails';
import { FormControl , FormLabel , FormHelperText,RadioGroup,FormControlLabel,Radio ,Button} from '@mui/material';


function Package() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [packageInfo, setPackageInfo] = useState(null)
    const [packageDetails, setPackageDetails] = useState(null)


    var estados = ["REGISTADA","EM_TRANSITO","ENTREGUE","EM_DISTRIBUICAO"];


    let carrierId = useParams().id;
    let packageId = useParams().package;

    //API CALLs
    function fetchData() {
        const infoURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/" + packageId;
        const detailsURL = "http://" + process.env.REACT_APP_API_HOST + ":8080/encomendas/" + packageId + "/details";

        const getInfo = axios.get(infoURL);
        const getDetails = axios.get(detailsURL);

        axios.all([getInfo,getDetails]).then(
            axios.spread(
                (...allData) => {
                    setPackageInfo(allData[0].data);
                    setPackageDetails(allData[1].data);
                    setIsLoaded(true);
                }
            )
        )

    }



    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Escolha uma Opção');


    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (value === '') {
            setHelperText('Selectione uma opção.');
            setError(true);
        } else {
            var str = 'estado='+value
            const response = await axios.put('http://localhost:8080/estados/encomendas/'+ packageId, str);
            console.log(response);
            window.location.reload();
        } 
        
      };

    useEffect(() => {
        fetchData();
    }, []);


    if (!isLoaded) {
        return (
            <>
                <CheckLogin user="transportador"/>
                <TransportadorBox carrierId={carrierId}>

                    <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
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

        const index = estados.indexOf(packageInfo.estado);
        if (index > -1) { // only splice array when item is found
            estados.splice(index, 1); // 2nd parameter means remove one item only
        }

        return (
            <>
                <CheckLogin user="transportador"/>
                <TransportadorBox carrierId={carrierId}>
                    <h1 style={{margin: "0"}}>Encomenda {packageId}</h1>
                    <hr style={{height: "1px"}}/>

                    <Container maxWidth="xl" style={{padding: "30px 0 20px 0"}}>
                    <PackageDetails packageInfo={packageInfo} packageDetails={packageDetails}></PackageDetails> 
                    </Container> 


                    {MudarEstado()}

                </TransportadorBox>
            </>
        )
    }



    function MudarEstado() {
        return <form onSubmit={handleSubmit}>
            <FormControl error={error} variant="standard">
                <h2 >Mudar Estado de Encomenda</h2>
                <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >

                    {estados.map((estado) => (
                        <FormControlLabel key={estado} value={estado} control={<Radio />} label={estado} />
                    ))}

                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                    Atualizar
                </Button>
            </FormControl>
        </form>;
    }
}

export default Package;