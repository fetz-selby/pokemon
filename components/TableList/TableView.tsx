import { useState } from 'react'
import { Pokemon } from '@/types'
import {
  ColumnDef,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  Row,
} from '@tanstack/react-table'
import Filter from '@/components/TableList/Filter'
import Dialog from '@mui/material/Dialog'
import DetailView from '../DetailView/DetailView'
import useDetailView from '../DetailView/useDetailView'
import { styled } from '@mui/material/styles'

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    maxWidth: '800px',
  },
}))

interface TableViewProps {
  data: Pokemon[]
  columns: ColumnDef<Pokemon>[]
  rowCount?: number
  pageSize?: number
  offset: number | null
  isLoading?: boolean
  onNextPage?: () => void
  onPreviousPage?: () => void
  onGoToPage?: (page: number) => void
}

enum ViewState {
  loading = 'loading',
  empty = 'empty',
  loaded = 'loaded',
}

const TableView = ({
  data,
  columns,
  isLoading = false,
  onNextPage,
  onPreviousPage,
  rowCount = 0,
  pageSize = 0,
  offset = 0,
  onGoToPage,
}: TableViewProps) => {
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  })

  const { getPokemonDetail, pokemonDetail } = useDetailView()

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  const handleOnRowClick = (row: Row<Pokemon>) => {
    const pokemonName = row.original.name
    getPokemonDetail(pokemonName)
    setIsDetailViewOpen(true)
  }

  const pageLimit =
    Math.ceil(rowCount / pagination.pageSize) || table.getPageCount()

  const currentPage =
    offset === 0
      ? 1
      : offset === null
      ? pageLimit
      : offset / pagination.pageSize + 1

  const viewState: ViewState = isLoading
    ? ViewState.loading
    : data.length === 0
    ? ViewState.empty
    : ViewState.loaded

  const loadedView = table.getRowModel().rows.map((row) => {
    return (
      <tr
        key={row.id}
        style={{ cursor: 'pointer' }}
        onClick={() => handleOnRowClick(row)}
      >
        {row.getVisibleCells().map((cell) => {
          return (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          )
        })}
      </tr>
    )
  })

  // Needs more styling 🎨
  const emptyView = (
    <tr>
      <td colSpan={columns.length} style={{ textAlign: 'center' }}>
        No data available
      </td>
    </tr>
  )

  // Needs more styling 🎨
  const loadingView = (
    <tr>
      <td colSpan={columns.length} style={{ textAlign: 'center' }}>
        Loading...
      </td>
    </tr>
  )

  return (
    <div>
      <div />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: '500px' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingBottom: '10px',
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {viewState === ViewState.loading
            ? loadingView
            : viewState === ViewState.empty
            ? emptyView
            : loadedView}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => onPreviousPage?.()}
        >
          {'<'}
        </button>
        <button className="border rounded p-1" onClick={() => onNextPage?.()}>
          {'>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {currentPage} of {pageLimit.toLocaleString() || 0}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={pageLimit}
            defaultValue={2}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0
              onGoToPage?.(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
      <div>
        Showing{' '}
        {(offset === null
          ? rowCount
          : currentPage * data.length
        ).toLocaleString()}{' '}
        of {rowCount.toLocaleString()} Rows
      </div>
      <BootstrapDialog
        open={isDetailViewOpen}
        onClose={() => setIsDetailViewOpen(false)}
        sx={{ width: '100%' }}
      >
        <DetailView pokemonDetail={pokemonDetail} />
      </BootstrapDialog>
    </div>
  )
}

export default TableView
