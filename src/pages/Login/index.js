import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.scss';
import classNames from 'classnames/bind';

import { login } from '../../services';
import { doc } from 'prettier';

let cx = classNames.bind(style);
function Login() {
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
            } else {
                massageLogin.style.visibility = 'visible';
                setMassageLogin(data.massage);
            }
        }
    }
    return (
        <div className={cx('wrapper')}>
            <form className={cx('login')} action="">
                <h1>LOGIN</h1>
                <div className={cx('input-group')}>
                    <label>User name: </label>
                    <input
                        onChange={(e) => {
                            handleEntetUserName(e);
                            massageUsername.style.visibility = 'hidden';
                            massageLogin.style.visibility = 'hidden';
                        }}
                        onBlur={validateUserName}
                        spellCheck="false"
                        placeholder="Enter your username..."
                        name="userName"
                    ></input>
                </div>
                <p className={cx('massageUsername')}>Please enter your Username</p>
                <div className={cx('input-group')}>
                    <label>Password: </label>
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Enter your password..."
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
                <p className={cx('massagePassword')}>Please enter your Password</p>
                <p className={cx('massageLogin')}>{massageLoginValue}</p>
                <button className={cx('submit')} onClick={handleLogin}>
                    Login
                </button>
                <Link to="/signin" className={cx('signin')}>
                    Sign in account
                </Link>
                <Link to="/" className={cx('loginSucceeds')} style={{ visibility: 'hidden' }}></Link>
            </form>
        </div>
    );
}
export default Login;
