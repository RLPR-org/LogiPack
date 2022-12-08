import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CarrierDetails(props) {

    const carrierInfo = props.carrierInfo;
    const carrierDetails = props.carrierDetails;
    var componentID = 0;

    const status = {
        "INATIVO": <Chip label="Inativo" color="success" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
        "EM_TRANSITO": <Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/>,
        "PARADO": <Chip label="Parado" size="small" style={{backgroundColor: "#8618ee", color: "white"}}/>,
        "EM_PAUSA": <Chip label="Em pausa" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>
      }

    const statusText = {
        'INATIVO' : "Inativo",
        'EM_TRANSITO' : "Em trânsito",
        'PARADO' : "Parado",
        'EM_PAUSA': "Em pausa"
    }

  return (
    <>
        {/* ---------------------- Carrier info table ---------------------- */}

        <div>
            <h2>As suas informações</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">{carrierInfo.id}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">{carrierInfo.nome}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">{carrierInfo.email}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Telefone</TableCell>
                            <TableCell align="right">{carrierInfo.telefone}</TableCell>
                        </TableRow>

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Matricula</TableCell>
                            <TableCell align="right">{carrierInfo.matricula}</TableCell>
                        </TableRow> 

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Estado atual</TableCell>
                            <TableCell align="right">{status[carrierInfo.estado]}</TableCell>
                        </TableRow> 

                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>Última atualização</TableCell>
                            <TableCell align="right">{carrierInfo.timestamp}</TableCell>
                        </TableRow>
                                                                       
                    </TableBody>
                </Table>
            </TableContainer>

        </div>



        {/* ---------------------- Transportador destiny table (if there is at leat 1 package) ---------------------- */}
        {carrierInfo.encomendas.length > 0 &&

            <div style={{marginTop: "80px"}}>
                <h2>Último destino atribuído</h2>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>Distrito</TableCell>
                                <TableCell align="right">{carrierInfo.encomendas[0].localizacao.distrito}</TableCell>
                            </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>Concelho</TableCell>
                                <TableCell align="right">{carrierInfo.encomendas[0].localizacao.concelho}</TableCell>
                            </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>Freguesia</TableCell>
                                <TableCell align="right">{carrierInfo.encomendas[0].localizacao.freguesia}</TableCell>
                            </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>Rua</TableCell>
                                <TableCell align="right">{carrierInfo.encomendas[0].localizacao.rua}</TableCell>
                            </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>Código Postal</TableCell>
                                <TableCell align="right">{carrierInfo.encomendas[0].localizacao.codigopostal} {carrierInfo.encomendas[0].localizacao.distrito}</TableCell>
                            </TableRow>
                                                                        
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        }



        {/* ---------------------- Carrier event history ---------------------- */}

        <div style={{marginTop: "80px"}}>
            <h2>Histórico de eventos da última entrega</h2>

            <div className='package-history'>

                {carrierDetails.history.slice(0, carrierDetails.history.length-1).map((event) => (
                    <div key={componentID+=1} className='package-state'>
                        <p style={{margin: "0"}}>{statusText[event.estado]}</p>
                        <p className='package-history-time'>{event.timestamp}</p>
                    </div>
                ))}

                <div className='package-state package-state-active'>
                    <p style={{margin: "0"}}>{statusText[carrierDetails.history.at(-1).estado]}</p>
                    <p className='package-history-time'>{carrierDetails.history.at(-1).timestamp}</p>
                </div>

            </div>
        </div>

    </>
  );
}

export { CarrierDetails };