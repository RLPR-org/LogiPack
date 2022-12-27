import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import axios from '../../CustomAxios';



const status = {
    'REGISTADA' : <Chip label="Registada" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
    'EM_TRANSITO' : <Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/>,
    'EM_DISTRIBUICAO' : <Chip label="Em distribuição" color="info" size="small" style={{backgroundColor: "#4B84FF", color: "white"}}/>,
    'ENTREGUE': <Chip label="Entregue" size="small" style={{backgroundColor: "#48AD32", color: "white"}}/>,
    'CONFIRMADA': <Chip label="Confirmada" size="small" style={{backgroundColor: "#8618ee", color: "white"}}/>
}

function getPackagesIds (packages) {
    const packagesId = [];
    for (var i=0; i<packages.length; i++) {
        packagesId.push(packages[i].id);
    }
    return packagesId;
}

function PackagesTableConfirm(props) {
  const navigate = useNavigate();
  const [packagesIds, setPackagesIds] = useState([]);
  const packages = props.packages;

  const confirm = (packageId) => {
    const url = "http://localhost:8080/cliente/" + props.clientId + "/confirmar/" + packageId;
    axios.put(url);
    setPackagesIds(packagesIds.filter(id => id !== packageId));
  }

  useEffect(() => {
    setPackagesIds(getPackagesIds(props.packages));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Estado</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Destino</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Transportador</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Confirmar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((row) => (
            <TableRow id={row.id} key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {packagesIds.includes(row.id) &&
                <>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{status[row.estado]}</TableCell>
                  <TableCell>{row.localizacao.distrito}</TableCell>
                  <TableCell>{row.transportador}</TableCell>
                  <TableCell align="right">
                    <form id='confirm' onSubmit={()=>{confirm(row.id)}}>
                        <Button style={{"backgroundColor": "green", "textTransform": "unset"}} type="submit"variant="contained" endIcon={<CheckCircleIcon />}>Confirmar receção</Button>
                    </form>
                  </TableCell>
                </>
              }

            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { PackagesTableConfirm };