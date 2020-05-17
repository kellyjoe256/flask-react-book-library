import Index from '../components/Index';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Dashboard from '../components/admin/Dashboard';

// /admin/categories
import CategoriesIndex from '../components/admin/categories/Index';
import CategoriesAdd from '../components/admin/categories/Add';
import CategoriesEdit from '../components/admin/categories/Edit';

// /admin/authors
import AuthorsIndex from '../components/admin/authors/Index';
import AuthorsAdd from '../components/admin/authors/Add';
import AuthorsEdit from '../components/admin/authors/Edit';

// /admin/books
import BooksIndex from '../components/admin/books/Index';
import BooksAdd from '../components/admin/books/Add';
import BooksEdit from '../components/admin/books/Edit';

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
    // /admin/authors
    {
        path: '/admin/authors/:id/edit',
        title: 'Edit Author',
        component: AuthorsEdit,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/authors/add',
        title: 'Add Author',
        component: AuthorsAdd,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/authors',
        title: 'Authors',
        component: AuthorsIndex,
        meta: {
            auth: true,
        },
    },
    // /admin/books
    {
        path: '/admin/books/:id/edit',
        title: 'Edit Book',
        component: BooksEdit,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/books/add',
        title: 'Add Book',
        component: BooksAdd,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/books',
        title: 'Books',
        component: BooksIndex,
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
