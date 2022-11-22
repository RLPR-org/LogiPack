import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const packageData = [
  {
    "packageID": 1,
    "sender": "João",
    "receiver": "Maria",
    "weight": 2.5,
  },
  {
    "packageID": 2,
    "sender": "Rafael",
    "receiver": "Pedro",
    "weight": 3.0
  },
  {
    "packageID": 3,
    "sender": "Leo",
    "receiver": "Pedro",
    "weight": 1.5
  }
]

function PackagesTable(props) {

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Emissor</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Recetor</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Peso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packageData.map((row) => (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.packageID}</TableCell>
                <TableCell>{row.sender}</TableCell>
                <TableCell>{row.receiver}</TableCell>
                <TableCell>{row.weight}</TableCell>
            </TableRow> 
          ))}                     
        </TableBody>
    </Table>
</TableContainer>
  );
}

export { PackagesTable };