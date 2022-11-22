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

function createData(packageID, packageStatus, carrierID, vehicleID, lastUpdateTimestamp) {
  return {packageID, packageStatus, carrierID, vehicleID, lastUpdateTimestamp};
}

const rows = [
    createData(1, 1, 6, 24, "2021-10-01 12:00:00"),
    createData(2, 2, 9, 37, "2021-10-01 12:00:00"),
    createData(4, 4, 3, 67, "2021-10-01 12:00:00"),
    createData(6, 3, 16, 49, "2021-10-01 12:00:00"),
    createData(5, 4, 10, 49, "2021-10-01 12:00:00"),
    createData(3, 3, 16, 24, "2021-10-01 12:00:00")
];

const status = {
    1: <Chip label="Em espera" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
    2: <Chip label="Em trânsito" size="small" style={{backgroundColor: "#F3B104", color: "white"}}/>,
    3: <Chip label="Em distribuição" color="info" size="small" style={{backgroundColor: "#4393F3", color: "white"}}/>,
    4: <Chip label="Entregue" color="success" size="small" style={{backgroundColor: "#3DDE5F", color: "white"}}/>,
}

function PackagesTable(props) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Estado</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Transportador</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Veículo</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Última atualização</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Info.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.packageID}</TableCell>
              <TableCell>{status[row.packageStatus]}</TableCell>
              <TableCell>{row.carrierID}</TableCell>
              <TableCell>{row.vehicleID}</TableCell>
              <TableCell align="right" style={{color: "gray"}}>{row.lastUpdateTimestamp}</TableCell>
              <TableCell align="right">
                <InfoIcon className='info-btn' onClick={()=> navigate('/distribuidora/encomendas/' + row.packageID)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { PackagesTable };