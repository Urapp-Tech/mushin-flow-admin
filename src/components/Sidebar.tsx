import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { BarChart3, CreditCard, Settings, Users } from 'lucide-react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRouteActive = useCallback(
    (path: string) => {
      return location.pathname.includes(path);
    },
    [location.pathname]
  );

  return (
    <aside className="tw:min-h-screen tw:w-64 tw:border-r tw:border-gray-200 tw:bg-white">
      {/* Sidebar Header */}
      <div className="tw:border-b tw:border-gray-200 tw:px-6 tw:py-5">
        <div className="tw:flex tw:items-center tw:space-x-2">
          <div className="tw:flex tw:h-8 tw:w-8 tw:items-center tw:justify-center tw:rounded-lg tw:bg-gray-800">
            <div className="tw:h-4 tw:w-4 tw:rounded-sm tw:bg-yellow-300"></div>
          </div>
          <span className="tw:text-xl tw:font-semibold tw:text-gray-900">
            Mushin Flow
          </span>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="tw:space-y-6 tw:p-6">
        {/* Profile Section */}
        <div className="tw:text-center">
          <Avatar className="tw:mx-auto tw:mb-4 tw:h-20 tw:w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <h3 className="tw:font-semibold tw:text-gray-900">Arman</h3>
          <p className="tw:text-sm tw:text-gray-500">Admin</p>
          <Button className="tw:mt-3 tw:rounded-3xl tw:bg-yellow-300 tw:text-black tw:hover:bg-yellow-500">
            Update Profile
          </Button>
        </div>

        {/* Navigation */}
        <nav className="tw:mt-4 tw:space-y-2">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className={cn(
              'tw:w-full tw:justify-start tw:rounded-3xl tw:text-start tw:text-gray-600',
              isRouteActive('/dashboard') && 'tw:bg-gray-900 tw:text-white'
            )}
          >
            <BarChart3 className="tw:mr-3 tw:h-4 tw:w-4" />
            Dashboard
          </Button>
          <Button
            onClick={() => navigate('/user-management')}
            variant="ghost"
            className={cn(
              'tw:w-full tw:justify-start tw:rounded-3xl tw:text-start tw:text-gray-600',
              isRouteActive('/user-management') &&
                'tw:bg-gray-900 tw:text-white'
            )}
          >
            <Users className="tw:mr-3 tw:h-4 tw:w-4" />
            User Management
          </Button>
          {/* <Button
            onClick={() => navigate('/payment-management')}
            variant="ghost"
            className={cn(
              'tw:w-full tw:justify-start tw:rounded-3xl tw:text-start tw:text-gray-600',
              isRouteActive('/payment-management') &&
                'tw:bg-gray-900 tw:text-white'
            )}
          >
            <CreditCard className="tw:mr-3 tw:h-4 tw:w-4" />
            Payment Management
          </Button> */}

          <Collapsible className="tw:group/collapsible tw:w-full">
            <CollapsibleTrigger
              type="button"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-start tw:rounded-3xl tw:text-start tw:text-gray-600'
              )}
            >
              <Settings className="tw:mr-3 tw:h-4 tw:w-4" />
              Reporting And Export
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Button
                onClick={() => navigate('/user-data-report')}
                variant="ghost"
                className={cn(
                  'tw:w-full tw:justify-start tw:rounded-3xl tw:text-start tw:text-gray-600',
                  isRouteActive('/user-data-report') &&
                    'tw:bg-gray-900 tw:text-white'
                )}
              >
                <CreditCard className="tw:mr-3 tw:h-4 tw:w-4" />
                User Data Report
              </Button>

              <Button
                onClick={() => navigate('/transaction-data-report')}
                variant="ghost"
                className={cn(
                  'tw:w-full tw:justify-start tw:rounded-3xl tw:text-start tw:text-gray-600',
                  isRouteActive('/transaction-data-report') &&
                    'tw:bg-gray-900 tw:text-white'
                )}
              >
                <CreditCard className="tw:mr-3 tw:h-4 tw:w-4" />
                Transaction Data Report
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
