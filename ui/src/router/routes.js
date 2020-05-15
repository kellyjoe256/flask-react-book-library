import Index from '../components/Index';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Dashboard from '../components/admin/Dashboard';

// /admin/categories
import CategoriesIndex from '../components/admin/categories/Index';
import CategoriesAdd from '../components/admin/categories/Add';
import CategoriesEdit from '../components/admin/categories/Edit';

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
    // /admin/categories
    {
        path: '/admin/categories/:id/edit',
        title: 'Edit Category',
        component: CategoriesEdit,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/categories/add',
        title: 'Add Category',
        component: CategoriesAdd,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/categories',
        title: 'Categories',
        component: CategoriesIndex,
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
