import './index.css';

import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { produtoScreens } from './modules/produto/routes';
import { useNotification } from './shared/hooks/useNotification';

const router: RemixRouter = createBrowserRouter([
  ...firstScreenRoutes,
  ...loginRoutes,
  ...produtoScreens,
]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
