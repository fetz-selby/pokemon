'use client'

import React, { useState } from 'react'
import { Pokemon, PokemonResponse } from '@/types'
import SearchBox from '@/components/SearchBox/SearchBox'
import DetailView from '@/components/DetailView/DetailView'
import useDetailView from '@/components/DetailView/useDetailView'
import VirtualizedPaginatedList from '@/components/VirtualizeList/VirtualizeList'
import { Stack } from '@mui/material'

type VirtualizedPaginatedListProps = {
  pokemonResponse: PokemonResponse
}

const PageWithVirtualizer = ({
  pokemonResponse,
}: VirtualizedPaginatedListProps) => {
  const { getPokemonDetail, pokemonDetail } = useDetailView()
  const [items, setItems] = useState<Pokemon[]>(pokemonResponse.results)

  return (
    <Stack spacing={4} direction={'row'} sx={{ width: '100%', padding: 2 }}>
      <Stack spacing={1} sx={{ marginBottom: 2, width: '600px' }}>
        <SearchBox
          options={items.map((item) => item.name)}
          onSelect={(value) => getPokemonDetail(value)}
        />
        <VirtualizedPaginatedList
          pokemonResponse={pokemonResponse}
          onListChange={(items) => setItems(items)}
          onRowClick={(pokemonName) => getPokemonDetail(pokemonName)}
        />
      </Stack>
      <Stack sx={{ width: 'calc(100% - 600px)' }}>
        <DetailView pokemonDetail={pokemonDetail} />
      </Stack>
    </Stack>
  )
}

export default PageWithVirtualizer
