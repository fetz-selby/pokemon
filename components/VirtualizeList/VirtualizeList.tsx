'use client'

import React from 'react'
import { Pokemon, PokemonResponse } from '@/types'
import useVirtualizeList from './useVirtualizeList'
import useDetailView from '../DetailView/useDetailView'
import Box from '@mui/material/Box'

type VirtualizedPaginatedListProps = {
  pokemonResponse: PokemonResponse
  onListChange?: (items: Pokemon[]) => void
  onRowClick?: (pokemonName: string) => void
}

const VirtualizedPaginatedList = ({
  pokemonResponse,
  onListChange,
  onRowClick,
}: VirtualizedPaginatedListProps) => {
  const { items, parentRef, rowVirtualizer, hasMore } = useVirtualizeList(
    pokemonResponse,
    70,
    onListChange
  )

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Pokemon List</h1>
        <p className="text-gray-600 mb-2">Total Pokemon: {items.length}</p>
      </div>
      <div
        ref={parentRef}
        style={{
          height: `600px`,
          width: '100%',
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index >= items.length
            const item = items[virtualRow.index]

            return (
              <div
                data-index={virtualRow.index}
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: '12px',
                  boxSizing: 'border-box',
                  borderBottom: '1px solid #eee',
                  background: virtualRow.index % 2 === 0 ? '#fafafa' : '#fff',
                }}
              >
                {isLoaderRow ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    {hasMore ? 'Loading more...' : 'No more posts'}
                  </div>
                ) : (
                  <Box
                    onClick={() => onRowClick?.(item.name)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <strong>{item?.name}</strong>
                    <p>{item?.url}</p>
                  </Box>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VirtualizedPaginatedList
