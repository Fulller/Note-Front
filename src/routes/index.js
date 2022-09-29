import { Home, Login, Signin } from '../pages';

let PublicRoute = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/home',
        element: Home
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/signin',
        element: Signin
    },
]

export {PublicRoute}