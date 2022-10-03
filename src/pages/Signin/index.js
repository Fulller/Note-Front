import { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './Signin.module.scss';
import classNames from 'classnames/bind';

import { register } from '../../services';
import language from '../../assets/language';
import { GlobalContext } from '../../App';

let cx = classNames.bind(style);
function Signin() {
    let [globalState, dispacth] = useContext(GlobalContext);
    let languageName = globalState.language;
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
                <h1>{language.signin[languageName]}</h1>
                <div className={cx('parent-group')}>
                    <div className={cx(['input-group', 'username-group'])}>
                        <label>{language.username[languageName]}</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-username')}
                            spellCheck="false"
                            onInput={(e) => handleInput(e.target, 'message-username', setUsernameValue)}
                            className={cx('username')}
                            placeholder={language.enteryourusername[languageName]}
                        ></input>
                    </div>
                </div>
                <div className={cx('message-group')}>
                    <p className={cx('message-username')}>{language.pleaseusername[languageName]}</p>
                </div>
                <div className={cx('parent-group')}>
                    <div className={cx('input-group')}>
                        <label>{language.firstname[languageName]}</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-firstname')}
                            onInput={(e) => handleInput(e.target, 'message-firstname', setFirstValue)}
                            spellCheck="false"
                            className={cx('firstname')}
                            placeholder={language.enterfirstname[languageName]}
                        ></input>
                    </div>
                    <div className={cx('input-group')}>
                        <label>{language.lastname[languageName]}</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-lastname')}
                            onInput={(e) => handleInput(e.target, 'message-lastname', setLastnameValue)}
                            spellCheck="false"
                            className={cx('lastname')}
                            placeholder={language.enterlastname[languageName]}
                        ></input>
                    </div>
                </div>
                <div className={cx('message-group')}>
                    <p className={cx('message-firstname')}>{language.plaasefirstname[languageName]}</p>
                    <p className={cx('message-lastname')}>{language.pleaselastname[languageName]}</p>
                </div>
                <div className={cx('parent-group')}>
                    <div className={cx('input-group')}>
                        <label>{language.pasword[languageName]}</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-password')}
                            onInput={(e) => handleInput(e.target, 'message-password', setPasswordValue)}
                            spellCheck="false"
                            className={cx('password')}
                            placeholder={language.enterpassword[languageName]}
                        ></input>
                    </div>
                    <div className={cx('input-group')}>
                        <label>{language.repassword[languageName]}</label>
                        <input
                            onBlur={(e) => validateInput(e.target, 'message-password-again')}
                            onInput={(e) => handleInput(e.target, 'message-password-again', setRepasswordValue)}
                            spellCheck="false"
                            className={cx('re-password')}
                            placeholder={language.enterrepassword[languageName]}
                        ></input>
                    </div>
                </div>
                <div className={cx('message-group')}>
                    <p className={cx('message-password')}>{language.pleasepassword[languageName]}</p>
                    <p className={cx('message-password-again')}>{language.pleasepassword[languageName]}</p>
                </div>
                <button type="submit" className={cx('signin-btn')} onClick={handleSubmit}>
                    {language.signin[languageName]}
                </button>
                <footer>
                    <Link to="/login" className={cx('login')} id="loginofsignin">
                        {language.login[languageName]}
                    </Link>
                </footer>
            </div>
        </div>
    );
}
export default Signin;
