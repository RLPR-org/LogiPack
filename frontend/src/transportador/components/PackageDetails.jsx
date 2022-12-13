import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function getConfirmacao(confirmacao) {
    if (confirmacao)
        return (<Chip label="Confirmada" color="success" size="small" style={{backgroundColor: "#48AD32", color: "white"}}/>)
    return (<Chip label="Não confirmada" color="success" size="small" style={{backgroundColor: "#d31a1a", color: "white"}}/>)   
}


function PackageDetails(props) {
    const navigate = useNavigate();
    var componentID = 0;
    const packageInfo = props.packageInfo;
    const packageDetails = props.packageDetails;
    const status = {
        'REGISTADA' : <Chip label="Registada" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
        'EM_TRANSITO' : <Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/>,
        'EM_DISTRIBUICAO' : <Chip label="Em distribuição" color="info" size="small" style={{backgroundColor: "#4B84FF", color: "white"}}/>,
        'ENTREGUE': <Chip label="Entregue" size="small" style={{backgroundColor: "#48AD32", color: "white"}}/>,
        'CONFIRMADA': <Chip label="Confirmada" size="small" style={{backgroundColor: "#8618ee", color: "white"}}/>
    }

    const statusText = {
        'REGISTADA' : "Registada",
        'EM_TRANSITO' : "Em trânsito",
        'EM_DISTRIBUICAO' : "Em distribuição",
        'ENTREGUE': "Entregue",
        "CONFIRMADA": "Confirmada"
    }

  return (
    <>
        {/* ---------------------- Package info table ---------------------- */}

        <div>
            <h2>Informações sobre encomenda</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">{packageInfo.id}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Emissor</TableCell>
                            <TableCell align="right">{packageInfo.emissor}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Recetor</TableCell>
                            <TableCell align="right">{packageInfo.destinatario}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Peso</TableCell>
                            <TableCell align="right">{Math.round(packageInfo.peso * 10)/10} Kg</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Estado</TableCell>
                            <TableCell align="right">{status[packageInfo.estado]}</TableCell>
                        </TableRow> 

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Transportador</TableCell>
                            <TableCell align="right">{packageInfo.transportador}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Confirmação da receção</TableCell>
                            <TableCell align="right">{getConfirmacao(packageInfo.confirmacao)}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Última atualização</TableCell>
                            <TableCell align="right">{packageInfo.timestamp}</TableCell>
                        </TableRow>
                                                                       
                    </TableBody>
                </Table>
            </TableContainer>

        </div>


{/* ---------------------- Package destiny table ---------------------- */}

        <div style={{marginTop: "80px"}}>
            <h2>Destino da encomenda</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Distrito</TableCell>
                            <TableCell align="right">{packageInfo.localizacao.distrito}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Concelho</TableCell>
                            <TableCell align="right">{packageInfo.localizacao.concelho}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Freguesia</TableCell>
                            <TableCell align="right">{packageInfo.localizacao.freguesia}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Rua</TableCell>
                            <TableCell align="right">{packageInfo.localizacao.rua}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Código Postal</TableCell>
                            <TableCell align="right">{packageInfo.localizacao.codigopostal} {packageInfo.localizacao.distrito}</TableCell>
                        </TableRow>
                                                                       
                    </TableBody>
                </Table>
            </TableContainer>

        </div>


        {/* ---------------------- Package event history ---------------------- */}

        <div style={{marginTop: "80px"}}>
            <h2>Histórico da encomenda</h2>

            <div className='package-history'>

                {packageDetails.history.slice(0, packageDetails.history.length-1).map((event) => (
                    <div key={componentID+=1} className='package-state'>
                        <p style={{margin: "0"}}>{statusText[event.estado]}</p>
                        <p className='package-history-time'>{event.timestamp}</p>
                    </div>
                ))}

                <div className='package-state package-state-active'>
                    <p style={{margin: "0"}}>{statusText[packageDetails.history.at(-1).estado]}</p>
                    <p className='package-history-time'>{packageDetails.history.at(-1).timestamp}</p>
                </div>

            </div>
        </div>
    </>
  );
}

export { PackageDetails };