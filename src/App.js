import { createContext, useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { PublicRoute } from './routes';

import getLocalStorage from './assets/getLocalStorage';
import setLocalStorage from './assets/setLocalStorage';

let GlobalContext = createContext();
let isLogin = getLocalStorage('notelogin', false);
let user = getLocalStorage('noteuser', {});
let allnotes = getLocalStorage('noteall', {});
let initState = {
    isLogin: isLogin,
    user: user,
    allnotes: allnotes,
};
function reducer(state, [action, data]) {
    switch (action) {
        case 'login':
            setLocalStorage('notelogin', true);
            setLocalStorage('noteuser', data.user);
            return {
                ...state,
                user: data.user,
                isLogin: true,
            };
        case 'logout':
            setLocalStorage('notelogin', false);
            setLocalStorage('noteuser', {});
            setLocalStorage('noteall', {});
            return {
                ...state,
                user: {},
                allnotes: {},
                isLogin: false,
            };
        default:
            return true;
    }
    return true;
}
function App() {
    let [globalState, dispacth] = useReducer(reducer, initState);
    return (
        <div className="App">
            <GlobalContext.Provider value={[globalState, dispacth]}>
                <Routes>
                    {PublicRoute.map((route, index) => {
                        let path = route.path;
                        let Page = route.element;
                        return <Route key={index} path={path} element={<Page></Page>}></Route>;
                    })}
                </Routes>
            </GlobalContext.Provider>
        </div>
    );
}
export { GlobalContext };
export default App;
