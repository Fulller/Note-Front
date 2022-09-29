import axios from 'axios';
import { httpApi } from '../assets/api';
function register(userName, firstName, lastName, password) {
    let url = `${httpApi}register`;
    return axios({
        method: 'post',
        url: url,
        data: {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
        },
    }).then((data) => data.data);
}
export default register;
