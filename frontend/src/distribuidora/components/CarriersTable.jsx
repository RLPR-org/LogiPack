import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

function createData(packageID, packageStatus, packages, vehicleID, lastUpdateTimestamp) {
  return {packageID, packageStatus, packages, vehicleID, lastUpdateTimestamp};
}

const rows = [
    createData(1, 1, "Ver mercadoria", 24, "2021-10-01 12:00:00"),
    createData(2, 2, "Ver mercadoria", 37, "2021-10-01 12:00:00"),
    createData(4, 1, "Ver mercadoria", 67, "2021-10-01 12:00:00"),
    createData(6, 1, "Ver mercadoria", 49, "2021-10-01 12:00:00"),
    createData(5, 2, "Ver mercadoria", 49, "2021-10-01 12:00:00"),
    createData(3, 2, "Ver mercadoria", 24, "2021-10-01 12:00:00")
];

const status = {
    1: <Chip label="Em deslocação" color="success" size="small" style={{backgroundColor: "#3DDE5F", color: "white"}}/>,
    2: <Chip label="Em pausa" size="small" style={{backgroundColor: "#F3B104", color: "white"}}/>
}

function CarriersTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Estado</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Mercadoria</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Veículo</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Última atualização</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.packageID}</TableCell>
              <TableCell>{status[row.packageStatus]}</TableCell>
              <TableCell>{row.packages}</TableCell>
              <TableCell>{row.vehicleID}</TableCell>
              <TableCell align="right" style={{color: "gray"}}>{row.lastUpdateTimestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CarriersTable };