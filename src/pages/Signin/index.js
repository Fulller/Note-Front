import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './Signin.module.scss';
import classNames from 'classnames/bind';

import { register } from '../../services';

let cx = classNames.bind(style);
function Signin() {
    let [usernameValue, setUsernameValue] = useState('');
    let [firstValue, setFirstValue] = useState('');
    let [lastnameValue, setLastnameValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');
    let [repasswordValue, setRepasswordValue] = useState('');
    let listValueInput = [usernameValue, firstValue, lastnameValue, passwordValue, repasswordValue];
    function validateInput(input, selectorMessage) {
        let message = document.querySelector(`.${selectorMessage}`);
        if (input.value.trim() == '') {
            message.style.visibility = 'visible';
        }
    }
    function handleInput(input, selectorMessage, setState) {
        let message = document.querySelector(`.${selectorMessage}`);
        message.style.visibility = 'hidden';
        setState(input.value);
    }
    async function handleSubmit(e) {
        for (let value of listValueInput) {
            if (value.trim() == '') {
                return;
            }
        }
        let data = await register(listValueInput[0], listValueInput[1], listValueInput[2], listValueInput[3]);
        if (data.errCode == 0) {
            let login = document.querySelector('#loginofsignin');
            login.click();
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('signin')}>
                <h1>SIGN IN</h1>
                <div className={cx('parent-group')}>
                    <div className={cx(['input-group', 'username-group'])}>
                        <label>User name:</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-username')}
                            spellCheck="false"
                            onInput={(e) => handleInput(e.target, 'message-username', setUsernameValue)}
                            className={cx('username')}
                            placeholder="Enter user name..."
                        ></input>
                    </div>
                </div>
                <div className={cx('message-group')}>
                    <p className={cx('message-username')}>Please enter your user name</p>
                </div>
                <div className={cx('parent-group')}>
                    <div className={cx('input-group')}>
                        <label>First name:</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-firstname')}
                            onInput={(e) => handleInput(e.target, 'message-firstname', setFirstValue)}
                            spellCheck="false"
                            className={cx('firstname')}
                            placeholder="Enter first name..."
                        ></input>
                    </div>
                    <div className={cx('input-group')}>
                        <label>Last name:</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-lastname')}
                            onInput={(e) => handleInput(e.target, 'message-lastname', setLastnameValue)}
                            spellCheck="false"
                            className={cx('lastname')}
                            placeholder="Enter last name..."
                        ></input>
                    </div>
                </div>
                <div className={cx('message-group')}>
                    <p className={cx('message-firstname')}>Please enter your first name</p>
                    <p className={cx('message-lastname')}>Please enter your last name</p>
                </div>
                <div className={cx('parent-group')}>
                    <div className={cx('input-group')}>
                        <label>Password: </label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-password')}
                            onInput={(e) => handleInput(e.target, 'message-password', setPasswordValue)}
                            spellCheck="false"
                            className={cx('password')}
                            placeholder="Enter password..."
                        ></input>
                    </div>
                    <div className={cx('input-group')}>
                        <label>Re-enter the password again: </label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-password-again')}
                            onInput={(e) => handleInput(e.target, 'message-password-again', setRepasswordValue)}
                            spellCheck="false"
                            className={cx('re-password')}
                            placeholder="Enter re-password..."
                        ></input>
                    </div>
                </div>
                <div className={cx('message-group')}>
                    <p className={cx('message-password')}>Please enter your password</p>
                    <p className={cx('message-password-again')}>Please enter your password</p>
                </div>
                <button type="submit" className={cx('signin-btn')} onClick={handleSubmit}>
                    Sign in
                </button>
                <footer>
                    <Link to="/login" className={cx('login')} id="loginofsignin">
                        Log in
                    </Link>
                </footer>
            </div>
        </div>
    );
}
export default Signin;
