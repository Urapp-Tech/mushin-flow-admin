import AuthenticationGuard from '@/guards/AuthenticationGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'sonner';

window.Buffer = Buffer;

const SignIn = lazy(() => import('@/pages/(unauthenticated)/sign-in/SignIn'));

const Layout = lazy(() => import('@/pages/(authenticated)/Layout'));
const Dashboard = lazy(
  () => import('@/pages/(authenticated)/dashboard/Dashboard')
);
const UserManagement = lazy(
  () => import('@/pages/(authenticated)/user-management/UserManagement')
);
const PaymentManagement = lazy(
  () => import('@/pages/(authenticated)/payment-management/PaymentManagement')
);
const UserDataReport = lazy(
  () => import('@/pages/(authenticated)/user-data-report/UserDataReport')
);
const TransactionDataReport = lazy(
  () =>
    import(
      '@/pages/(authenticated)/transaction-data-report/TransactionDataReport'
    )
);

const router = createBrowserRouter(
  [
    {
      path: 'sign-in',

      element: (
        <Suspense fallback={<div>loading ...</div>}>
          <SignIn />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<div>loading ...</div>}>
          <AuthenticationGuard>
            <Layout />
          </AuthenticationGuard>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" />,
        },
        {
          path: 'dashboard',
          element: (
            <Suspense fallback={<div>loading ...</div>}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: 'user-management',
          element: (
            <Suspense fallback={<div>loading ...</div>}>
              <UserManagement />
            </Suspense>
          ),
        },
        {
          path: 'payment-management',
          element: (
            <Suspense fallback={<div>loading ...</div>}>
              <PaymentManagement />
            </Suspense>
          ),
        },
        {
          path: 'user-data-report',
          element: (
            <Suspense fallback={<div>loading ...</div>}>
              <UserDataReport />
            </Suspense>
          ),
        },
        {
          path: 'transaction-data-report',
          element: (
            <Suspense fallback={<div>loading ...</div>}>
              <TransactionDataReport />
            </Suspense>
          ),
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
    <>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
      </QueryClientProvider>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
