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
    let [page, setPage] = useState('information');
    let [password, setPassword] = useState();
    let [newpassword, setNewpassword] = useState();
    let passwordRef = useRef();
    let newpasswordRef = useRef();
    let mesPasswordRef = useRef();
    let mesNewPasswordRef = useRef();
    function handleShowAvatar(file) {
        setAvatar(URL.createObjectURL(file));
    }
    async function handleSave() {
        let user = globalState.user;
        let pathAvatar = user.avatar;
        if (avatarFile) {
            pathAvatar = await updateavatar(avatarFile);
        }
        let data = await updateuser(user._id, pathAvatar, firstname, lastname, user.password);
        setLocalStorage('noteuser', data.data);
        dispacth(['reload', data.data]);
        homeRef.current.click();
    }
    function passwordValidate() {
        if (passwordRef.current.value != globalState.user.password) {
            mesPasswordRef.current.style.visibility = 'visible';
            return false;
        } else {
            mesPasswordRef.current.style.visibility = 'hidden';
            return true;
        }
    }
    function newpasswordValidate() {
        if (newpasswordRef.current.value === '') {
            mesNewPasswordRef.current.style.visibility = 'visible';
            return false;
        } else {
            mesNewPasswordRef.current.style.visibility = 'hidden';
            return true;
        }
    }
    async function hanleSubmitChangepassword() {
        let user = globalState.user;
        if (passwordValidate() && newpasswordValidate()) {
            let data = await updateuser(user._id, avatar, firstname, lastname, newpassword);
            setLocalStorage('noteuser', data.data);
            dispacth(['reload', data.data]);
            homeRef.current.click();
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('account')}>
                <Link to="/home">
                    <button ref={homeRef} className={cx('home')}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </Link>
                {page == 'information' ? (
                    <>
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
                        <div className={cx('acvanced')}>
                            <button onClick={() => setPage('changepassword')}>
                                {language.changepassword[languageName]}
                            </button>
                            <button>{language.deleteaccount[languageName]}</button>
                        </div>
                        <div className={cx('action')}>
                            <Link to="/home">
                                <button className={cx('cancel')}>{language.cancel[languageName]}</button>
                            </Link>
                            <button className={cx('save')} onClick={handleSave}>
                                {language.save[languageName]}{' '}
                            </button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {page == 'changepassword' ? (
                    <div className={cx('changepassword')}>
                        <button className={cx('prev')} onClick={() => setPage('information')}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h1>{language.changepassword[languageName]}</h1>
                        <div className={cx('password')}>
                            <div className={cx('input-group')}>
                                <label>{language.currentpassword[languageName]}</label>
                                <input
                                    ref={passwordRef}
                                    className={cx('firstname')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={passwordValidate}
                                    onInput={() => (mesPasswordRef.current.style.visibility = 'hidden')}
                                ></input>
                                <p ref={mesPasswordRef}>{language.wrongpassword[languageName]}</p>
                            </div>
                            <div className={cx('input-group')}>
                                <label>{language.newpassword[languageName]}</label>
                                <input
                                    ref={newpasswordRef}
                                    className={cx('lastname')}
                                    value={newpassword}
                                    onChange={(e) => setNewpassword(e.target.value)}
                                    onBlur={newpasswordValidate}
                                    onInput={() => (mesNewPasswordRef.current.style.visibility = 'hidden')}
                                ></input>
                                <p ref={mesNewPasswordRef}>{language.pleasenewpassword[languageName]}</p>
                            </div>
                        </div>
                        <div className={cx('action')}>
                            <button className={cx('cancel')} onClick={() => setPage('information')}>
                                {language.cancel[languageName]}
                            </button>
                            <button className={cx('save')} onClick={hanleSubmitChangepassword}>
                                {language.save[languageName]}{' '}
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
export default Account;
