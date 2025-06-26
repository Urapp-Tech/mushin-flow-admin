import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Layout from './Layout';
import PaymentManagement from './PaymentManagement';
import TransactionDataReport from './TransactionDataReport';
import UserDataReport from './UserDataReport';
import UserManagement from './UserManagement';

window.Buffer = Buffer;

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'user-management',
          element: <UserManagement />,
        },
        {
          path: 'payment-management',
          element: <PaymentManagement />,
        },
        {
          path: 'user-data-report',
          element: <UserDataReport />,
        },
        {
          path: 'transaction-data-report',
          element: <TransactionDataReport />,
        },
      ],
    },
  ],

  { basename: '/admin' }
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export default App;
