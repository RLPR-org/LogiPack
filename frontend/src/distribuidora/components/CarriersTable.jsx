import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';

function createData(packageID, packageStatus, packages, vehicleID, lastUpdateTimestamp) {
  return {packageID, packageStatus, packages, vehicleID, lastUpdateTimestamp};
}


const status = {
  "INATIVO": <Chip label="Inativo" color="success" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
  "EM_TRANSITO": <Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/>,
  "PARADO": <Chip label="Parado" size="small" style={{backgroundColor: "#8618ee", color: "white"}}/>,
  "EM_PAUSA": <Chip label="Em pausa" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>
}

function CarriersTable(props) {
  const navigate = useNavigate();
  const carriers = props.carriers;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Estado</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Total encomendas</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Veículo</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Última atualização</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Info.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carriers.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{status[row.estado]}</TableCell>
              <TableCell>{row.encomendas.length}</TableCell>
              <TableCell>{row.matricula}</TableCell>
              <TableCell align="right" style={{color: "gray"}}>{row.timestamp}</TableCell>
              <TableCell align="right">
                <InfoIcon className='info-btn' onClick={()=> navigate('/distribuidora/transportadores/' + row.packageID)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CarriersTable };