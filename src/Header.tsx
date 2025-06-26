import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/dashboard': 'Analytics',
  '/user-management': 'User Management',
  '/payment-management': 'Payment Management',
  '/user-data-report': 'User Data Report',
  '/transaction-data-report': 'Transaction Data Report',
} as const;

function Header() {
  const location = useLocation();

  const title = useMemo(() => {
    const pathname = location.pathname as keyof typeof titles;
    return titles[pathname];
  }, [location.pathname]);

  return (
    <header className="tw:border-b tw:border-gray-200 tw:bg-white tw:px-6 tw:py-4">
      <div className="tw:flex tw:items-center tw:justify-between">
        <h1 className="tw:text-2xl tw:font-semibold tw:text-gray-900">
          {title}
        </h1>
        <div className="tw:flex tw:items-center tw:space-x-4">
          {/*  <div className="tw:relative">
            <Search className="tw:absolute tw:top-1/2 tw:left-3 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:text-gray-400" />
            <Input
              placeholder="Search"
              className="tw:w-80 tw:border-0 tw:bg-gray-100 tw:pl-10"
            />
          </div> */}
          <Button size="icon" variant="ghost">
            <Bell className="tw:h-5 tw:w-5" />
          </Button>
          <div className="tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:bg-yellow-300">
            <span className="tw:text-sm tw:font-medium">⚡</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
