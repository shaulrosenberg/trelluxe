import { HomePage } from './pages/home-page.jsx';
import { Workspace } from './pages/workspace.jsx';
import { BoardIndex } from './pages/board-index.jsx';
import { TaskDetails } from './pages/task-details.jsx';
import { LoginSignup } from './pages/login-signup.jsx';

const routes = [
    {
        path: '/',
        label: 'Trello',
        component: HomePage,
    },
    {
        path: '/workspace',
        label: 'Boards',
        component: Workspace,
    },
    {
        path: '/login',
        label: 'Login',
        component: LoginSignup,
    },
    {
        path: '/signup',
        label: 'Signup',
        component: LoginSignup,
    },

    {
        path: '/board/:id',
        label: 'Board',
        component: BoardIndex,
    },
];

export default routes;