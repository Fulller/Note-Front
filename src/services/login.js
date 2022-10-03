import axios from 'axios';
import { httpApi } from '../assets/api';
function login(userName, password) {
    let url = `${httpApi}/login`;
    return axios({
        method: 'post',
        url: url,
        data: {
            userName: userName,
            password: password,
        },
    }).then((data) => data.data);
}
export default login;
