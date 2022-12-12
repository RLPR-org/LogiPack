import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CheckLogin(props) {
    let user = props.user;
    const navigate = useNavigate();
    const checkLogin = () => {
        if (sessionStorage.getItem('user') !== user) {
            navigate('/');
        }
    }
    useEffect(() => {
        checkLogin();
    }, []);
}

export { CheckLogin };