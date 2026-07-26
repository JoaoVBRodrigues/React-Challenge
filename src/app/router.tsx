import { createHashRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from '@/pages/Home/Home';
import { UserDetails } from '@/pages/UserDetails/UserDetails';
import { NotFound } from '@/pages/NotFound/NotFound';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user/:id',
        element: <UserDetails />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
