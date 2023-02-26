/**
 * Router Config File to handle URL paths
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Views
import Home from '../views/Home';
import Error from '../views/Error';
import Menu from '../views/Menu';

function Router() {

  /**
   * JSON based Path Config
   *
   * @param path: URL path to catch
   * @param element: React Component to render
   * @param errorElement: Error Element to show on failure
   */
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