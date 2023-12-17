import './index.css';

import type { Router as RemixRouter } from '@remix-run/router';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

//import LoginScreen from './modules/login';
import { loginRoutes } from './modules/login/routes';

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>Tela Principal</div>,
    errorElement: <div>Página não encontrada</div>,
  },
];

const router: RemixRouter = createBrowserRouter([
  ...mainRoutes,
  ...loginRoutes,
]); /*

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
]);
*/
function App() {
  return <RouterProvider router={router} />;
}

export default App;
