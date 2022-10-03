import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../../App';
import style from '../Home.module.scss';
import language from '../../../assets/language';

let cx = classNames.bind(style);
function Header({ HomeController, page }) {
    let [globalState, dispatch] = useContext(GlobalContext);
    let languageName = globalState.language;
    let [showAccount, setShowAccount] = useState(false);
    let [showMenu, setShowMenu] = useState(false);
    let user = globalState.user;
    user.avatar = 'https://anhdephd.vn/wp-content/uploads/2022/02/tai-anh-avatar-dep-hinh-dai-dien-facebook.jpg';
    function handleShow(show, setShow) {
        show ? setShow(false) : setShow(true);
    }
    function AccountPopper() {
        return (
            <div className={cx('account-popper')}>
                <Link to={'/account'}>
                    <div className={cx('avatar')}>
                        <img src={user.avatar}></img>
                    </div>
                </Link>
                <Link to={'/account'}>
                    <div>
                        <button>{language.manegeyouraccount[languageName]}</button>
                    </div>
                </Link>
                <div>
                    {language.fullname[languageName]}: {user.firstName + ' ' + user.lastName}
                </div>
                <div>
                    {language.username[languageName]}: {user.userName}
                </div>
                <Link to={'/login'}>
                    <div onClick={() => dispatch(['logout'])}>
                        <button>{language.logout[languageName]}</button>
                    </div>
                </Link>
            </div>
        );
    }
    function MenuPopper() {
        function handleActive(e) {
            let unactive = document.querySelector('.active');
            console.log(unactive);
        }
        return (
            <div className={cx('menu-popper')}>
                <div
                    onClick={() => {
                        setShowMenu(false);
                        HomeController.changePage('allnote');
                    }}
                    className={cx(page == 'allnote' ? 'active' : '')}
                >
                    <i class="fa-regular fa-lightbulb"></i>
                    <span>{language.allnote[languageName]}</span>
                </div>
                <div
                    onClick={() => {
                        setShowMenu(false);
                        HomeController.changePage('garbage');
                    }}
                    className={cx(page == 'garbage' ? 'active' : '')}
                >
                    <i className="fa-regular fa-trash-can"></i>
                    <span>{language.grabagecan[languageName]}</span>
                </div>
                <div className={cx('language')}>
                    <span
                        className={cx(languageName == 'vi' ? 'active' : '')}
                        onClick={(e) => {
                            dispatch(['languageVI']);
                            setShowMenu(false);
                        }}
                    >
                        Tiếng việt
                    </span>
                    <span
                        className={cx(languageName == 'en' ? 'active' : '')}
                        onClick={(e) => {
                            dispatch(['languageEN']);
                            setShowMenu(false);
                        }}
                    >
                        English
                    </span>
                </div>
            </div>
        );
    }
    return (
        <header>
            <Tippy
                onClickOutside={() => setShowMenu(false)}
                visible={showMenu}
                render={(attrs) => <MenuPopper></MenuPopper>}
                interactive={true}
            >
                <div onClick={() => handleShow(showMenu, setShowMenu)} className={cx('header-menu')}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </Tippy>
            {globalState.isLogin ? (
                <Tippy
                    onClickOutside={() => setShowAccount(false)}
                    visible={showAccount}
                    render={(attrs) => <AccountPopper></AccountPopper>}
                    interactive={true}
                >
                    <div onClick={() => handleShow(showAccount, setShowAccount)} className={cx('header-acount')}>
                        <div className={cx('name')}>
                            <h3>{user.lastName}</h3>
                        </div>
                        <img src={user.avatar}></img>
                    </div>
                </Tippy>
            ) : (
                <div className={cx('header-acount')}>
                    <Link to={'/login'}>
                        <div className={cx('name')}>
                            <h3>{language.clikmetologin[languageName]}</h3>
                        </div>
                    </Link>
                </div>
            )}
        </header>
    );
}
export default Header;
