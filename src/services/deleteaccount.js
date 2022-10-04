import axios from 'axios';
import { httpApi } from '../assets/api';
function deleteaccount(id) {
    let url = `${httpApi}/deleteAccount`;
    return axios({
        method: 'post',
        url: url,
        data: {
            id: id,
        },
    }).then((data) => data.data);
}
export default deleteaccount;
