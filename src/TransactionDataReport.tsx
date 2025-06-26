'use client';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Bell, Edit, Trash2 } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Fragment } from 'react';
import Paginator from './components/Paginator';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Button } from './components/ui/button';
import { Dialog, DialogContent } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Separator } from './components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './components/ui/sheet';
import { usePostsQuery } from './queries/post.query';

const transactionsData = [
  {
    id: 'D4723269-0db9-464...',
    name: 'Darrin Pacocha',
    email: 'Darrin Pacocha@XMLSerializer.com',
    amount: 2953.99,
    date: 'Wed Jul 26 2079 00:37:07 GMT+0500',
    payment: 'Completed',
    method: 'IPay',
    type: 'Payment',
  },
  {
    id: '829a549d-612b-48a...',
    name: 'Wilson Stracke',
    email: 'Wilson Stracke@XMLSerializer.com',
    amount: 2953.99,
    date: 'Wed Nov 20 2058 11:32:05 GMT+0500',
    payment: 'Processing',
    method: 'Credit Card',
    type: 'Refund',
  },
  {
    id: '2134ff80-Df6e-4ab7-...',
    name: 'Sophie Stracke',
    email: 'SophieStracke@XMLSerializer.com',
    amount: 2953.99,
    date: 'Mon Mar 10 2003 11:02:51 GMT+0500',
    payment: 'Failed',
    method: 'Google Pay',
    type: 'Payment',
  },
  {
    id: '41c5af2c-d608-4ec2...',
    name: 'Nick Grimes',
    email: 'Nick Grimes@XMLSerializer.com',
    amount: 2953.99,
    date: 'Thu Apr 16 2020 11:48:39 GMT+0500',
    payment: 'Processing',
    method: 'Paypal',
    type: 'Payment',
  },
  {
    id: '29164d23-Dc6d-4e2f...',
    name: 'Toni Durgan',
    email: 'Toni Durgan@XMLSerializer.com',
    amount: 2953.99,
    date: 'Fri Jun 29 1990 18:59:20 GMT+0500',
    payment: 'Completed',
    method: 'PayPal',
    type: 'Payment',
  },
  {
    id: 'Ec8c34ce-2b52-4be...',
    name: 'Christian Kuphal',
    email: 'Christian Kuphal@XMLSerializer.com',
    amount: 2953.99,
    date: 'Sun Sep 03 2000 08:44:20 GMT+0500',
    payment: 'Completed',
    method: 'Credit Card',
    type: 'Refund',
  },
];

const notifications = [
  {
    id: 1,
    type: 'credit_card',
    user: 'Dr. Marcella Schroeder',
    message: 'subscribed to early accesss through credit card ***********71',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=68', // Placeholder avatar
    dotColor: 'tw:bg-yellow-400',
  },
  {
    id: 2,
    type: 'bug_report',
    user: 'Edward Hagenes',
    message: 'reported a bug related to Tasks',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=67', // Placeholder avatar
    dotColor: 'tw:bg-yellow-400',
  },
  {
    id: 3,
    type: 'refund_request',
    user: 'Mr. Willis Schuster',
    message: 'submitted a refund request',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=66', // Placeholder avatar
    dotColor: 'tw:bg-yellow-400',
  },
  {
    id: 4,
    type: 'task_goal',
    user: 'Joann Cronin',
    message: 'reached the Tasks Goal',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=65', // Placeholder avatar
    dotColor: 'tw:bg-transparent', // No dot for this type
  },
  {
    id: 5,
    type: 'task_goal',
    user: 'Manuel Zieme',
    message: 'reached the Tasks Goal',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=64', // Placeholder avatar
    dotColor: 'tw:bg-transparent',
  },
  {
    id: 6,
    type: 'task_goal',
    user: 'Mohammed Al Marzouqui',
    message: 'reached the Tasks Goal',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=63', // Placeholder avatar
    dotColor: 'tw:bg-transparent',
  },
  {
    id: 7,
    type: 'task_goal',
    user: 'Miss Gerard McClure',
    message: 'reached the Tasks Goal',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=62', // Placeholder avatar
    dotColor: 'tw:bg-transparent',
  },
  {
    id: 8,
    type: 'task_goal',
    user: 'Jeannie Armstrong Sr.',
    message: 'reached the Tasks Goal',
    time: '53 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=61', // Placeholder avatar
    dotColor: 'tw:bg-transparent',
  },
];

function TransactionDataReport() {
  const [currentLimit, _setCurrentLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(10)
  );
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data } = usePostsQuery(
    Math.max(currentPage, 1),
    Math.max(currentLimit, 10)
  );

  return (
    <>
      <Sheet open={false}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="tw:flex tw:items-center">
              <Bell className="tw:mr-2" /> Notifications
            </SheetTitle>
          </SheetHeader>
          <div className="tw:space-y-4 tw:p-6">
            {notifications.map((notification, index) => (
              <Fragment key={notification.id}>
                <div className="tw:flex tw:items-start tw:space-x-4">
                  <div className="tw:relative tw:flex-shrink-0">
                    <Avatar className="tw:h-10 tw:w-10">
                      <img
                        src={notification.avatar}
                        alt={`${notification.user}'s avatar`}
                      />
                      <AvatarFallback>
                        {notification.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {notification.dotColor !== 'tw:bg-transparent' && (
                      <span
                        className={`tw:absolute tw:right-0 tw:bottom-0 tw:block tw:h-2.5 tw:w-2.5 tw:rounded-full tw:ring-2 tw:ring-white ${notification.dotColor}`}
                      ></span>
                    )}
                  </div>
                  <div className="tw:flex-grow">
                    <p className="tw:text-sm tw:font-medium tw:text-gray-900">
                      <span className="tw:font-bold">{notification.user}</span>{' '}
                      {notification.message}
                    </p>
                    <p className="tw:text-xs tw:text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator />}
              </Fragment>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="link">View All</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={false}>
        <DialogContent>
          {/* Profile header section */}
          <div className="tw:flex tw:flex-col tw:items-center tw:py-4">
            {/* Avatar image */}
            <div className="tw:mb-4 tw:h-24 tw:w-24 tw:overflow-hidden tw:rounded-full">
              <img
                src="https://placehold.co/96x96/ADD8E6/000000?text=Profile" // Placeholder image
                alt="Dr. Rosemary Kunze"
                className="tw:h-full tw:w-full tw:object-cover"
              />
            </div>
            {/* User's name */}
            <h2 className="tw:text-xl tw:font-semibold tw:text-gray-800">
              Dr. Rosemary Kunze
            </h2>
            {/* Username */}
            <p className="tw:text-sm tw:text-gray-500">@rose_k</p>
          </div>

          <div className="tw:py-2"></div>

          {/* Details section */}
          <div className="tw:space-y-4 tw:py-4">
            {/* Device Type */}
            <div>
              <Label
                htmlFor="deviceType"
                className="tw:mb-1 tw:block tw:text-sm tw:font-medium tw:text-gray-500"
              >
                Device Type
              </Label>
              <div className="tw:relative">
                <Input
                  type="text"
                  id="deviceType"
                  className="tw:w-full tw:rounded-xl tw:bg-gray-100 tw:px-4 tw:py-3 tw:pr-10 tw:text-gray-800 tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:outline-none"
                  value="iOS (iPhone 16 Pro Max)"
                  readOnly
                />
                <span className="tw:absolute tw:inset-y-0 tw:right-0 tw:flex tw:items-center tw:pr-3">
                  <svg
                    className="tw:h-5 tw:w-5 tw:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.53 2.162A4.55 4.55 0 0011.666 0c-2.477 0-4.502 1.954-4.502 4.35 0 1.968 1.137 3.668 2.766 4.316a.4.4 0 00.32-.016l.245-.098a.4.4 0 00.198-.445L9.67 6.438A.4.4 0 009.282 6c-.927 0-1.685-.705-1.685-1.575 0-.868.758-1.573 1.685-1.573.473 0 .907.21 1.22.56a.4.4 0 00.598-.016l.128-.152a.4.4 0 00-.01-.582 4.55 4.55 0 003.117-1.18zM12.923 10.22l-.128-.152a.4.4 0 00-.598-.016c-.313-.35-.747-.56-1.22-.56-.927 0-1.685.705-1.685 1.575 0 .868.758 1.573 1.685 1.573.388 0 .74-.158 1.002-.405l.388.385a.4.4 0 00.283.117h.002a.4.4 0 00.283-.117l.004-.004a.4.4 0 00.117-.283v-.002a.4.4 0 00-.117-.283z"></path>
                  </svg>
                </span>
              </div>
            </div>

            {/* Signup Date */}
            <div>
              <Label
                htmlFor="signupDate"
                className="tw:mb-1 tw:block tw:text-sm tw:font-medium tw:text-gray-500"
              >
                Signup Date
              </Label>
              <Input
                type="text"
                id="signupDate"
                className="tw:w-full tw:rounded-xl tw:bg-gray-100 tw:px-4 tw:py-3 tw:text-gray-800 tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:outline-none"
                value="Wed Feb 12 2025 13:32:55 GMT+0500"
                readOnly
              />
            </div>

            <div className="tw:py-2"></div>

            {/* Payment Status and Early Access */}
            <div className="tw:flex tw:justify-between tw:gap-4">
              <div className="tw:flex-1">
                <Label className="tw:mb-1 tw:block tw:text-sm tw:font-medium tw:text-gray-500">
                  Payment Status
                </Label>
                <Badge className="tw:w-full tw:rounded-xl tw:bg-black tw:py-2 tw:font-medium tw:text-white tw:shadow-sm">
                  Completed
                </Badge>
              </div>
              <div className="tw:flex-1">
                <Label className="tw:mb-1 tw:block tw:text-sm tw:font-medium tw:text-gray-500">
                  Early Access
                </Label>
                <Badge className="tw:w-full tw:rounded-xl tw:bg-gray-100 tw:py-2 tw:text-center tw:font-medium tw:text-gray-800">
                  Enabled
                </Badge>
              </div>
            </div>
          </div>

          <div className="tw:py-8"></div>

          {/* Action buttons */}
          <div className="tw:mt-6 tw:flex tw:justify-between tw:gap-4">
            <Button className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:rounded-xl tw:bg-yellow-400 tw:px-4 tw:py-6 tw:font-semibold tw:text-black tw:shadow-md tw:transition-colors tw:hover:bg-yellow-500">
              <Edit />
              Edit
            </Button>
            <Button className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:rounded-xl tw:bg-gray-800 tw:px-4 tw:py-6 tw:font-semibold tw:text-white tw:shadow-md tw:transition-colors tw:hover:bg-gray-700">
              <Trash2 />
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main className="tw:flex-1 tw:p-6">
        <div className="tw:space-y-6">
          <div className="tw:w-full tw:rounded-3xl tw:bg-zinc-100 tw:p-6">
            <h1 className="tw:mb-6 tw:text-2xl tw:font-semibold tw:text-gray-900">
              User Data Preview
            </h1>

            <div className="tw:overflow-hidden tw:rounded-lg tw:border tw:border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="tw:bg-gray-50">
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Transaction ID
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Name
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Email Address
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Amount
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Type
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Status
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Date
                    </TableHead>
                    <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                      Method
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsData.map((transaction, index) => (
                    <TableRow
                      key={transaction.id}
                      className={
                        index % 2 === 0 ? 'tw:bg-white' : 'tw:bg-gray-50'
                      }
                    >
                      <TableCell className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">
                        {transaction.id}
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">
                        {transaction.name}
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                        {transaction.email}
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                        $
                        {transaction.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                        {transaction.type}
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4">
                        <Badge
                          variant={
                            transaction.payment === 'Completed'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            transaction.payment === 'Completed'
                              ? 'tw:bg-green-100 tw:text-green-800'
                              : 'tw:bg-gray-100 tw:text-gray-800'
                          }
                        >
                          {transaction.payment}
                        </Badge>
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                        {transaction.date}
                      </TableCell>
                      <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                        {transaction.method}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="tw:mt-6 tw:flex tw:items-center tw:justify-center tw:space-x-2">
              <Paginator
                currentPage={currentPage}
                onPageChange={(pageNumber) =>
                  handlePageChange(Math.max(1, pageNumber))
                }
                showPreviousNext
                totalPages={(data?.total ?? 0) / currentLimit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TransactionDataReport;
