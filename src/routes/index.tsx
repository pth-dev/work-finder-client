import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout/index';
import AuthLayout from '../layout/AuthLayout/index';

// Import your pages here
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Register from '../pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        // element: <Home />,
      },
      // Add more routes for authenticated users here
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        // element: <Login />,
      },
      {
        path: 'register',
        // element: <Register />,
      },
      // Add more authentication routes here
    ],
  },
]);

export default router;
