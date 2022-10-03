import { useContext, useState, useRef } from 'react';
import style from './Account.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import setLocalStorage from '../../assets/setLocalStorage';
import { updateavatar, updateuser } from '../../services';
import language from '../../assets/language';
import { GlobalContext } from '../../App';
let cx = classNames.bind(style);
function Account() {
    let homeRef = useRef();
    let [globalState, dispacth] = useContext(GlobalContext);
    let languageName = globalState.language;
    let [firstname, setFirstname] = useState(globalState.user.firstName);
    let [lastname, setLastname] = useState(globalState.user.lastName);
    let [avatarFile, setAvatarFile] = useState();
    let [avatar, setAvatar] = useState(globalState.user.avatar);
    function handleShowAvatar(file) {
        setAvatar(URL.createObjectURL(file));
    }
    async function handleSave() {
        let user = globalState.user;
        let pathAvatar = user.avatar;
        if (avatarFile) {
            pathAvatar = await updateavatar(avatarFile);
        }
        let data = await updateuser(user._id, pathAvatar, firstname, lastname);
        setLocalStorage('noteuser', data.data);
        dispacth(['reload', data.data]);
        homeRef.current.click();
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('account')}>
                <Link to="/home">
                    <button ref={homeRef} className={cx('home')}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </Link>
                <div className={cx('avatar')}>
                    <div>
                        <img src={avatar}></img>
                        <input
                            id="avatar-account"
                            type="file"
                            onChange={(e) => {
                                setAvatarFile(e.target.files[0]);
                                handleShowAvatar(e.target.files[0]);
                            }}
                        ></input>
                        <label for="avatar-account">
                            <i className="fa-regular fa-image"></i>
                        </label>
                    </div>
                </div>
                <div className={cx('name')}>
                    <div className={cx('input-group')}>
                        <label>{language.firstname[languageName]}</label>
                        <input
                            className={cx('firstname')}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        ></input>
                    </div>
                    <div className={cx('input-group')}>
                        <label>{language.lastname[languageName]}</label>
                        <input
                            className={cx('lastname')}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className={cx('action')}>
                    <Link to="/home">
                        <button className={cx('cancel')}>{language.cancel[languageName]}</button>
                    </Link>
                    <button className={cx('save')} onClick={handleSave}>
                        {language.save[languageName]}{' '}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Account;
