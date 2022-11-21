import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(packageFields, packageData) {
  return {packageFields, packageData};
}


function PackageDetails(props) {

    // pass as prop the api data of a specific package
    const rows = [
        createData("ID", 1),
        createData("Emissor", "Nome do emissor"),
        createData("Recetor", "Nome do recetor/cliente"),
        createData("peso", "20 Kg"),
        createData("Estado atual", "Em distribuição"),
        createData("Transportador ID", 21)

    ];

  return (
    <>
        {/* ---------------------- Package info table ---------------------- */}

        <div>
            <h2>Informações sobre encomenda</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>

                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.packageFields}</TableCell>
                        <TableCell align="right">{row.packageData}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>


        {/* ---------------------- Package event history ---------------------- */}

        <div style={{marginTop: "80px"}}>
            <h2>Histórico da encomenda</h2>

            <div className='package-history'>
                <div className='package-state'>
                    <p style={{margin: "0"}}>Encomenda registada</p>
                    <p className='package-history-time'>21/11/2022 14:45:00</p>
                </div>

                <div className='package-state'>
                    <p style={{margin: "0"}}>Em trânsito</p>
                    <p className='package-history-time'>21/11/2022 14:45:00</p>
                </div>

                <div className='package-state'>
                    <p style={{margin: "0"}}>Em pausa</p>
                    <p className='package-history-time'>21/11/2022 14:45:00</p>
                </div>

                <div className='package-state'>
                    <p style={{margin: "0"}}>Em trânsito</p>
                    <p className='package-history-time'>21/11/2022 14:45:00</p>
                </div>

                <div className='package-state package-state-active'>
                    <p style={{margin: "0"}}>Em distribuição</p>
                    <p className='package-history-time'>21/11/2022 14:45:00</p>
                </div>
            </div>
        </div>
    </>
  );
}

export { PackageDetails };