import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div className="tw:flex tw:min-h-screen tw:bg-gray-50">
      <Sidebar />

      <div className="tw:flex tw:flex-1 tw:flex-col">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
