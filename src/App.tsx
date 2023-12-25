import './index.css';

import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { produtoScreens } from './modules/produto/routes';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useNotification } from './shared/hooks/useNotification';

const routes: RouteObject[] = [...loginRoutes];

const routesLoggedIn: RouteObject[] = [...produtoScreens, ...firstScreenRoutes].map(
  (route) => ({
    ...route,
    //verificar se existe usuario no conexto global
    loader: () => verifyLoggedIn(),
  }),
);

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  /*
  const { request } = useRequests();
  const { setUser } = useGlobalContext();

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUser);
  }, []);
*/
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
