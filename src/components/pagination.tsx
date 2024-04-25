import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  prevPage: number | null
  nextPage: number | null
  currentPage: number
  pageLink: string
}

export function Pagination({
  currentPage,
  nextPage,
  prevPage,
  pageLink,
}: PaginationProps) {
  return (
    <PaginationComponent>
      <PaginationContent>
        {prevPage && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`${pageLink}?page=${prevPage}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`${pageLink}?page=${prevPage}`}>
                {prevPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {nextPage && (
          <>
            <PaginationItem>
              <PaginationLink href={`${pageLink}?page=${nextPage}`}>
                {nextPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`${pageLink}?page=${nextPage}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </PaginationComponent>
  )
}
