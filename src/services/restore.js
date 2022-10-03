import axios from 'axios';
import { httpApi } from '../assets/api';
function restorenote(id) {
    let url = `${httpApi}/restoreNote`;
    return axios({
        method: 'post',
        url: url,
        data: {
            id: id,
        },
    }).then((data) => data.data);
}
export default restorenote;
