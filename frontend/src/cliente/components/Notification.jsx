import '../../App.css';
import Chip from '@mui/material/Chip';


const status = {
    'REGISTADA' : <Chip label="Registada" size="small" style={{backgroundColor: "#ABABAB", color: "white"}}/>,
    'EM_TRANSITO' : <Chip label="Em trânsito" size="small" style={{backgroundColor: "#EA7F00", color: "white"}}/>,
    'EM_DISTRIBUICAO' : <Chip label="Em distribuição" color="info" size="small" style={{backgroundColor: "#4B84FF", color: "white"}}/>,
    'ENTREGUE': <Chip label="Entregue" size="small" style={{backgroundColor: "#48AD32", color: "white"}}/>,
    'CONFIRMADA': <Chip label="Confirmada" size="small" style={{backgroundColor: "#8618ee", color: "white"}}/>
}


function Notification(props) {
    const notification = props.notification

    return (
        <>
            <div className='notification'>
                <div>
                    <span>A encomenda {notification.encomendaId} passou para o estado {status[notification.newState]}</span>
                </div>

                <div style={{"textAlign": "end"}}>
                    <p style={{"color": "gray", "fontSize": "12px", "margin": "0px"}}>{notification.timestamp}</p>
                </div>
            </div>
        </>
    );
}

export default Notification;