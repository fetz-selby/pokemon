'use client'

import * as React from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

type SearchBoxProps = { options: string[]; onSelect?: (value: string) => void }

const SearchBox = ({ options, onSelect }: SearchBoxProps) => {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="pokemon-search"
        disableClearable
        options={options.map((option) => option)}
        onChange={(_, value) => {
          onSelect?.(value)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Pokemon Name"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
    </Stack>
  )
}

export default SearchBox
