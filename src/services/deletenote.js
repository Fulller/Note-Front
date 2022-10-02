import axios from 'axios';
import { httpApi } from '../assets/api';
function deletenote(id) {
    let url = `${httpApi}deleteNote`;
    return axios({
        method: 'post',
        url: url,
        data: {
            id: id,
        },
    }).then((data) => data.data);
}
export default deletenote;
