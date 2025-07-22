'use client'

import React, { useCallback, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'

import { Pokemon, PokemonResponse } from '@/types'
import { getPokemonResponse } from '@/utils/api'
import TableView from '@/components/TableList/TableView'
import { getParamValue } from '@/utils/helpers'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

interface TableListProps {
  initialPokemonResponse: PokemonResponse
}

const LIMIT = 20

const TableMain = ({ initialPokemonResponse }: TableListProps) => {
  const columns = React.useMemo<ColumnDef<Pokemon>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Pokemon Name</span>,
      },
      {
        accessorFn: (row) => row.url,
        id: 'url',
        cell: (info) => info.getValue(),
        header: () => <span>URL</span>,
      },
    ],
    []
  )

  const [offset, setOffsets] = useState<{
    nextOffset: number | null
    previousOffset: number | null
  }>({
    nextOffset: Number(getParamValue(initialPokemonResponse.next, 'offset')),
    previousOffset: Number(
      getParamValue(initialPokemonResponse.previous, 'offset')
    ),
  })

  const [data, setData] = React.useState<Pokemon[]>(
    initialPokemonResponse.results
  )

  const [isLoading, setIsLoading] = useState(false)
  const isOnline = useOnlineStatus()

  const requestPokemon = useCallback(
    async (limit: number, offset: number | null) => {
      if (offset === null || offset < 0) {
        console.warn('Invalid offset:', offset)
        return
      }

      setIsLoading(true)
      const response = await getPokemonResponse(limit, offset)

      if (!Array.isArray(response.results)) {
        throw new Error('Invalid Pokemon data format')
      }

      setIsLoading(false)
      const [nextOffset, previousOffset] = [
        getParamValue(response.next, 'offset'),
        getParamValue(response.previous, 'offset'),
      ]

      setOffsets({
        nextOffset,
        previousOffset,
      })

      setData(response.results)
    },
    []
  )

  const handlePageMovement = (direction: 'next' | 'previous') => {
    const newOffset =
      direction === 'next' ? offset.nextOffset : offset.previousOffset
    requestPokemon(LIMIT, newOffset)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>{isOnline ? '' : ' ⚠️ You are browsing Offline'}</div>
      <>
        <TableView
          {...{
            data,
            columns,
          }}
          onNextPage={() => handlePageMovement('next')}
          onPreviousPage={() => handlePageMovement('previous')}
          rowCount={initialPokemonResponse.count}
          pageSize={LIMIT}
          offset={offset.nextOffset ? offset.nextOffset - LIMIT : null}
          onGoToPage={(page) => {
            requestPokemon(LIMIT, (page - 1) * LIMIT)
          }}
          isLoading={isLoading}
        />
        <hr />
      </>
    </div>
  )
}

export default TableMain
