import { Home, Login, Signin, Account } from '../pages';

let PublicRoute = [
    {
        path: '/',
        element: Home,
    },
    {
        path: '/home',
        element: Home,
    },
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/signin',
        element: Signin,
    },
    {
        path: '/account',
        element: Account,
    },
];

export { PublicRoute };
