import { Pokemon } from '@/types'
import { Column, Table } from '@tanstack/react-table'

const Filter = ({
  column,
  table,
}: {
  column: Column<Pokemon, unknown>
  table: Table<Pokemon>
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? null : (
    <input
      className="w-36 border shadow rounded"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
}

export default Filter
