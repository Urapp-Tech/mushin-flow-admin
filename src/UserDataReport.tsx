'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import Paginator from './components/Paginator';
import { Input } from './components/ui/input';
import { usePostsQuery } from './queries/post.query';

function UserDataReport() {
  const [currentLimit, _setCurrentLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(10)
  );
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const debouncedSetSearch = debounce(setSearch, 384);

  const { data } = usePostsQuery(
    Math.max(currentPage, 1),
    Math.max(currentLimit, 10),
    search
  );

  // const deleteMutation = useDeletePostMutation();

  /* const _handleEdit = (id: string) => {
    console.log(`Edit User with id: ${id}`);
  }; */

  /* const _handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  }; */

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="tw:flex-1 tw:p-6">
      <div className="tw:space-y-6">
        <div className="tw:w-full tw:rounded-3xl tw:bg-zinc-100 tw:p-6">
          <div className="tw:flex tw:items-center">
            <h1 className="tw:mb-6 tw:grow tw:text-2xl tw:font-semibold tw:text-gray-900">
              User Data Preview
            </h1>

            <div className="tw:relative">
              <Search className="tw:absolute tw:top-1/2 tw:left-3 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:text-gray-400" />
              <Input
                defaultValue={search}
                onChange={(e) => debouncedSetSearch(e.target.value)}
                placeholder="Search"
                className="tw:w-80 tw:border-0 tw:bg-white tw:pl-10"
              />
            </div>
          </div>

          <div className="tw:overflow-hidden tw:rounded-lg tw:border tw:border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="tw:bg-gray-50">
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Name
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Email Address
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Signup Data
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Device
                  </TableHead>
                  <TableHead className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-700">
                    Early Access
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.data ?? []).map((post, index) => (
                  <TableRow
                    key={post.ID}
                    className={
                      index % 2 === 0 ? 'tw:bg-white' : 'tw:bg-gray-50'
                    }
                  >
                    <TableCell className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">
                      {post.formdata.name?.value ?? '-'}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      {post.formdata.email?.value ?? '-'}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      {format(post.post_date, 'EEE MMM dd yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      iOS
                    </TableCell>
                    {/* <TableCell className="tw:px-6 tw:py-4">
                      <Badge
                        variant={
                          bartender.payment === 'Paid' ? 'default' : 'secondary'
                        }
                        className={
                          bartender.payment === 'Paid'
                            ? 'tw:bg-green-100 tw:text-green-800'
                            : 'tw:bg-gray-100 tw:text-gray-800'
                        }
                      >
                        {bartender.payment}
                      </Badge>
                    </TableCell> */}
                    <TableCell className="tw:px-6 tw:py-4 tw:text-gray-600">
                      Enabled
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
  );
}

export default UserDataReport;
