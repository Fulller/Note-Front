import axios from 'axios';
import { httpApi } from '../assets/api';
function updateuser(id, avatar, firstName, lastName) {
    let url = `${httpApi}/updateUser`;
    return axios({
        method: 'post',
        url: url,
        data: {
            id: id,
            avatar: avatar,
            firstName: firstName,
            lastName: lastName,
        },
    }).then((data) => data.data);
}
export default updateuser;
