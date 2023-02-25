/**
 * Router Config File
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Views
import Home from '../views/Home';
import Error from '../views/Error';
import Menu from '../views/Menu';

function Router() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement: <Error/>
    },
    {
      path: '/menu',
      element: <Menu/>,
      errorElement: <Error/>
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default Router;