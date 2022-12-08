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


const status = {
    'REGISTADA' : <Chip label="Registada" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
    'EM_TRANSITO' : <Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/>,
    'EM_DISTRIBUICAO' : <Chip label="Em distribuição" color="info" size="small" style={{backgroundColor: "#4B84FF", color: "white"}}/>,
    'ENTREGUE': <Chip label="Entregue" color="success" size="small" style={{backgroundColor: "#48AD32", color: "white"}}/>,
}


function PackagesTable(props) {
  const navigate = useNavigate();
  const packages = props.packages

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Estado</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Destino</TableCell>
            <TableCell style={{fontWeight: "bold"}}>Transportador</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Última atualização</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Info.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{status[row.estado]}</TableCell>
              <TableCell>{row.localizacao.distrito}</TableCell>

              <TableCell>
                <span className='linkPage' onClick={()=> navigate('/distribuidora/transportadores/' + row.transportador)}>{row.transportador}</span>
              </TableCell>

              <TableCell align="right" style={{color: "gray"}}>{row.timestamp}</TableCell>
              <TableCell align="right">
                <InfoIcon className='info-btn' onClick={()=> navigate('/distribuidora/encomendas/' + row.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { PackagesTable };