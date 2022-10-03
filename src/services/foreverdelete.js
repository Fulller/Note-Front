import axios from 'axios';
import { httpApi } from '../assets/api';
function foreverdeletenote(id) {
    let url = `${httpApi}/foreverdeleteNote`;
    return axios({
        method: 'post',
        url: url,
        data: {
            id: id,
        },
    }).then((data) => data.data);
}
export default foreverdeletenote;
