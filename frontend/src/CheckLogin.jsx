import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CheckLogin(props) {
    let user = props.user;
    let id = useParams().id || undefined;
    let localUser = sessionStorage.getItem('user');
    let localId = sessionStorage.getItem('id');
    const navigate = useNavigate();
    const check = () => { 
        if (localUser !== user || (localId !== id && id !== undefined)) {
            return navigate('/');
        }
    }
    useEffect(() => {
        check();
    } ,[localUser, localId, user, id]);
}

export { CheckLogin };