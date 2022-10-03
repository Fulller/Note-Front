import { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.scss';
import classNames from 'classnames/bind';

import { GlobalContext } from '../../App';
import { login, allnotes } from '../../services';
import { doc } from 'prettier';
import language from '../../assets/language';

let cx = classNames.bind(style);
function Login() {
    let [globalState, dispacth] = useContext(GlobalContext);
    let laguageName = globalState.language;
    if (globalState.isLogin) {
        setTimeout(() => {
            document.querySelector('.loginSucceeds').click();
        }, 1000);
    }
    let massageUsername = document.querySelector('.massageUsername');
    let massagePassword = document.querySelector('.massagePassword');
    let massageLogin = document.querySelector('.massageLogin');
    let passwordRef = useRef();
    let [userNameValue, setUserNameValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');
    let [massageLoginValue, setMassageLogin] = useState('error');
    let submit = document.querySelector('.submit');

    function handleEntetUserName(e) {
        setUserNameValue(e.target.value);
    }
    function handleEntetPassword(e) {
        setPasswordValue(e.target.value);
    }
    function handleSeePassword(e, password) {
        if (e.target.className == 'fa-regular fa-eye-slash') {
            e.target.className = 'fa-regular fa-eye';
            password.type = 'text';
            password.focus();
        } else {
            e.target.className = 'fa-regular fa-eye-slash';
            password.type = 'password';
            password.focus();
        }
    }
    function validateUserName() {
        if (userNameValue.trim() == '') {
            massageUsername.style.visibility = 'visible';
            return false;
        } else {
            massageUsername.style.visibility = 'hidden';
            return true;
        }
    }
    function validatePasword() {
        if (passwordValue.trim() == '') {
            massagePassword.style.visibility = 'visible';
            return false;
        } else {
            massagePassword.style.visibility = 'hidden';
            return true;
        }
    }
    async function handleLogin(e) {
        e.preventDefault();
        if (validateUserName() && validatePasword()) {
            let data = await login(userNameValue, passwordValue);
            if (data.errCode == 0) {
                document.querySelector('.loginSucceeds').click();
                dispacth([
                    'login',
                    {
                        user: data.user,
                    },
                ]);
            } else {
                massageLogin.style.visibility = 'visible';
                setMassageLogin(data.massage);
            }
        }
    }
    return (
        <div className={cx('wrapper')}>
            <form className={cx('login')} action="">
                <h1>{language.login[laguageName]}</h1>
                <div className={cx('input-group')}>
                    <label>{language.username[laguageName]} </label>
                    <input
                        onChange={(e) => {
                            handleEntetUserName(e);
                            massageUsername.style.visibility = 'hidden';
                            massageLogin.style.visibility = 'hidden';
                        }}
                        onBlur={validateUserName}
                        spellCheck="false"
                        // placeholder="Enter user name ..."
                        placeholder={language.enteryourusername[laguageName]}
                        name="userName"
                    ></input>
                </div>
                <p className={cx('massageUsername')}>{language.pleaseusername[laguageName]}</p>
                <div className={cx('input-group')}>
                    <label>{language.pasword[laguageName]} </label>
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder={language.enterpassword[laguageName]}
                        name="password"
                        spellCheck="false"
                        onChange={(e) => {
                            handleEntetPassword(e);
                            massagePassword.style.visibility = 'hidden';
                            massageLogin.style.visibility = 'hidden';
                        }}
                        onBlur={validatePasword}
                    ></input>
                    <span>
                        <i
                            className="fa-regular fa-eye-slash"
                            onClick={(e) => handleSeePassword(e, passwordRef.current)}
                        ></i>
                    </span>
                </div>
                <p className={cx('massagePassword')}>{language.pleasepassword[laguageName]}</p>
                <p className={cx('massageLogin')}>{massageLoginValue}</p>
                <button className={cx('submit')} onClick={handleLogin}>
                    {language.login[laguageName]}
                </button>
                <footer>
                    <Link to="/signin" className={cx('signin')}>
                        {language.signinaccount[laguageName]}
                    </Link>
                    <Link to="/" className={cx('loginSucceeds')} style={{ visibility: 'visible' }}></Link>
                </footer>
            </form>
        </div>
    );
}
export default Login;
