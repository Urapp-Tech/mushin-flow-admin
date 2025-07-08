import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import AuthenticationGuard from './guards/AuthenticationGuard';
import Dashboard from './pages/(authenticated)/dashboard/Dashboard';
import Layout from './pages/(authenticated)/Layout';
import PaymentManagement from './pages/(authenticated)/payment-management/PaymentManagement';
import TransactionDataReport from './pages/(authenticated)/transaction-data-report/TransactionDataReport';
import UserDataReport from './pages/(authenticated)/user-management/user-data-report/UserDataReport';
import UserManagement from './pages/(authenticated)/user-management/UserManagement';
import SignIn from './pages/(unauthenticated)/sign-in/SignIn';

window.Buffer = Buffer;

const router = createBrowserRouter(
  [
    {
      path: 'sign-in',
      element: <SignIn />,
    },
    {
      path: '/',
      element: (
        <AuthenticationGuard>
          <Layout />
        </AuthenticationGuard>
      ),
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
        <Toaster position="top-center" />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export default App;
