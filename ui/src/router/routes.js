import Index from '../components/Index';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Dashboard from '../components/admin/Dashboard';

export default [
    {
        path: '/',
        exact: true,
        title: 'Book Library',
        component: Index,
        meta: {
            guest: true,
        },
    },
    {
        path: '/login',
        title: 'Login',
        component: Login,
        meta: {
            guest: true,
        },
    },
    {
        path: '/login',
        title: 'Login',
        component: Login,
        meta: {
            guest: true,
        },
    },
    {
        path: '/admin',
        title: 'Dashboard',
        exact: true,
        component: Dashboard,
        meta: {
            auth: true,
        },
    },
    {
        path: '/not-found',
        title: 'Page not found',
        component: NotFound,
    },
];
