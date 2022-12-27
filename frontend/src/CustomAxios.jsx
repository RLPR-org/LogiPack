import axios from 'axios'

const instance = axios.create();

axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;