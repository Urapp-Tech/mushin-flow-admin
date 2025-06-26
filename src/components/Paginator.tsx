import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
  siblingCount?: number; // how many links to show on each side of ellipses
};

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
  siblingCount = 3,
}: PaginatorProps) {
  // Helper to generate a range of numbers
  const range = useCallback(
    (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i),
    []
  );

  // Calculate the page numbers to show
  let pages: number[] = [];
  const totalNumbers = siblingCount * 2 + 1;
  const totalBlocks = totalNumbers + 2; // +2 for first and last

  if (totalPages <= 1) {
    pages = [1];
  } else if (totalPages <= totalBlocks) {
    pages = range(1, totalPages);
  } else {
    const left = range(1, siblingCount);
    const right = range(totalPages - siblingCount + 1, totalPages);

    // Center the middle block around currentPage
    let middleStart = Math.max(
      siblingCount + 1,
      currentPage - Math.floor(siblingCount / 2)
    );
    let middleEnd = middleStart + siblingCount - 1;

    // Clamp middleEnd to not overlap with right
    if (middleEnd > totalPages - siblingCount) {
      middleEnd = totalPages - siblingCount;
      middleStart = middleEnd - siblingCount + 1;
    }
    // Clamp middleStart to not overlap with left
    if (middleStart < siblingCount + 1) {
      middleStart = siblingCount + 1;
      middleEnd = middleStart + siblingCount - 1;
    }

    const middle = range(middleStart, middleEnd);

    pages = [
      ...left,
      ...(middleStart > siblingCount + 1 ? [0] : []), // 0 will be replaced by ellipsis
      ...middle,
      ...(middleEnd < totalPages - siblingCount ? [0] : []), // 0 will be replaced by ellipsis
      ...right,
    ];
  }

  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                'tw:cursor-pointer',
                currentPage - 1 < 1 && 'tw:cursor-not-allowed'
              )}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage - 1 < 1}
            />
          </PaginationItem>
        ) : null}

        {/* Render pagination links with ellipses */}
        {pages.map((page, idx) =>
          page === 0 ? (
            <PaginationEllipsis key={`ellipsis-${idx}`} />
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                className="tw:cursor-pointer"
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <PaginationNext
              className={cn(
                'tw:cursor-pointer',
                currentPage > totalPages - 1 && 'tw:cursor-not-allowed'
              )}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage > totalPages - 1}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
