import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../../App';
import style from '../Home.module.scss';

let cx = classNames.bind(style);
function Header() {
    let [globalState, dispatch] = useContext(GlobalContext);
    let [showAccount, setShowAccount] = useState(false);
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
                        <button>Manage your account</button>
                    </div>
                </Link>
                <div>Full name: {user.firstName + ' ' + user.lastName}</div>
                <div>User name: {user.userName}</div>
                <Link to={'/login'}>
                    <div onClick={() => dispatch(['logout'])}>
                        <button>Sign out</button>
                    </div>
                </Link>
            </div>
        );
    }
    return (
        <header>
            <div className={cx('header-menu')}>
                <i className="fa-solid fa-bars"></i>
            </div>
            {globalState.isLogin ? (
                <Tippy
                    onClickOutside={() => setShowAccount(false)}
                    visible={showAccount}
                    render={(attrs) => <AccountPopper></AccountPopper>}
                    interactive={true}
                >
                    <div onClick={() => handleShow(showAccount, setShowAccount)} className={cx('header-account')}>
                        <div className={cx('name')}>
                            <h3>{user.lastName}</h3>
                        </div>
                        <img src={user.avatar}></img>
                    </div>
                </Tippy>
            ) : (
                <div className={cx('header-account')}>
                    <Link to={'/login'}>
                        <div className={cx('name')}>
                            <h3>Click me to Log In</h3>
                        </div>
                    </Link>
                </div>
            )}
        </header>
    );
}
export default Header;
