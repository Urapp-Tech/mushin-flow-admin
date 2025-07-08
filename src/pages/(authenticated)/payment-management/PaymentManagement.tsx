'use client';
import Paginator from '@/components/Paginator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const bartendersData = [
  {
    id: 'D4723269-0db9-464...',
    name: 'Darrin Pacocha',
    amount: 291.15,
    method: 'stripe',
    device: 'iOS',
    timestamp: 'Wed Jul 26 2079 00:37:07 GMT+0500',
    status: 'Completed',
  },
  {
    id: '829a549d-612b-48a...',
    name: 'Wilson Stracke',
    amount: 12.35,
    method: 'Paypal',
    device: 'Android',
    timestamp: 'Wed Nov 20 2058 11:32:05 GMT+0500',
    status: 'Pending',
  },
  {
    id: '2134ff80-Df6e-4ab7-...',
    name: 'Sophie Stracke',
    amount: 848.52,
    method: 'Paypal',
    device: 'iOS',
    timestamp: 'Mon Mar 10 2003 11:02:51 GMT+0500',
    status: 'Failed',
  },
  {
    id: '41c5af2c-d608-4ec2...',
    name: 'Nick Grimes',
    amount: 688.61,
    method: 'stripe',
    device: 'iOS',
    timestamp: 'Thu Apr 16 2020 11:48:39 GMT+0500',
    status: 'Pending',
  },
  {
    id: '29164d23-Dc6d-4e2f...',
    name: 'Toni Durgan',
    amount: 815.26,
    method: 'Paypal',
    device: 'Android',
    timestamp: 'Fri Jun 29 1990 18:59:20 GMT+0500',
    status: 'Completed',
  },
  {
    id: 'Ec8c34ce-2b52-4be...',
    name: 'Christian Kuphal',
    amount: 588.35,
    method: 'stripe',
    device: 'iOS',
    timestamp: 'Sun Sep 03 2000 08:44:20 GMT+0500',
    status: 'Completed',
  },
];

function PaymentManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 69;

  const handleEdit = (id: string) => {
    console.log(`Edit bartender with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete bartender with id: ${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="tw:flex-1 tw:p-6">
      <div className="tw:ml-4 tw:flex tw:items-center tw:gap-x-12">
        <div className="tw:p-4">
          <div className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-black">
            $ Total Revenue
          </div>
          <div className="tw:text-3xl tw:font-bold tw:text-black">$ 11,700</div>
        </div>
        <div className="tw:p-4">
          <div className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-black">
            $ Total Transactions
          </div>
          <div className="tw:text-3xl tw:font-bold tw:text-black">48</div>
        </div>
      </div>

      <div className="tw:space-y-6">
        <div className="tw:w-full tw:rounded-3xl tw:bg-zinc-100 tw:p-6">
          <h1 className="tw:mb-6 tw:text-2xl tw:font-semibold tw:text-gray-900">
            Bartenders
          </h1>

          <div className="tw:overflow-hidden tw:rounded-lg tw:border tw:border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="tw:bg-gray-50">
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Transaction ID
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    User
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Amount
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Method
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Device
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Timestamp
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bartendersData.map((bartender, index) => (
                  <TableRow
                    key={bartender.id}
                    className={
                      index % 2 === 0 ? 'tw:bg-white' : 'tw:bg-gray-50'
                    }
                  >
                    <TableCell className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">
                      {bartender.id}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">
                      {bartender.name}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      {bartender.amount}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      {bartender.method}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      {bartender.device}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      {bartender.timestamp}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4">
                      <Badge
                        variant={
                          bartender.status === 'Completed'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          bartender.status === 'Completed'
                            ? 'tw:bg-green-100 tw:text-green-800'
                            : 'tw:bg-gray-100 tw:text-gray-800'
                        }
                      >
                        {bartender.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4">
                      <div className="tw:flex tw:space-x-2">
                        <Button
                          size="sm"
                          className="tw:bg-yellow-400 tw:text-black tw:hover:bg-yellow-500"
                          onClick={() => handleEdit(bartender.id)}
                        >
                          <Edit className="h-4 tw:w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="tw:bg-gray-900 tw:hover:bg-gray-800"
                          onClick={() => handleDelete(bartender.id)}
                        >
                          <Trash2 className="h-4 tw:w-4" />
                        </Button>
                      </div>
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
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentManagement;
