import { PokemonDetail } from '@/types'
import { Box, Card, Chip, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import DetailRow from '@/components/DetailRow/DetailRow'

type DetailViewProps = {
  pokemonDetail: PokemonDetail | null
}

const DetailView = ({ pokemonDetail }: DetailViewProps) => {
  return (
    <>
      {pokemonDetail ? (
        <Card sx={{ padding: 2, marginTop: 2, width: '100%' }}>
          <Stack spacing={2}>
            <Typography variant="h3" gutterBottom>
              {pokemonDetail?.name || 'Pokemon Detail'}
            </Typography>
            <DetailRow label="Height" value={pokemonDetail?.height} />
            <DetailRow label="Weight" value={pokemonDetail?.weight} />
            <DetailRow
              label="Base Experience"
              value={pokemonDetail?.baseExperience}
            />
            <DetailRow
              label="Abilities"
              valueComponent={pokemonDetail?.abilities.map((ability) => (
                <Chip
                  key={ability.name}
                  label={ability.name}
                  variant={ability.is_hidden ? 'filled' : 'outlined'}
                />
              ))}
            />
            <DetailRow
              label="Moves"
              valueComponent={pokemonDetail?.moves.map((move) => (
                <Chip key={move} label={move} variant="outlined" />
              ))}
            />
            <DetailRow
              label="Types"
              valueComponent={pokemonDetail?.types.map((type) => (
                <Chip key={type} label={type} variant="outlined" />
              ))}
            />
            <DetailRow
              key={pokemonDetail?.id}
              label="Cries"
              valueComponent={
                <Stack spacing={2} direction="row">
                  <Stack spacing={1}>
                    <Typography
                      variant="body1"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    >
                      latest:
                    </Typography>
                    <audio controls>
                      <source
                        src={pokemonDetail?.cries.latest}
                        type="audio/mpeg"
                      />
                    </audio>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography
                      variant="body1"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    >
                      legacy:
                    </Typography>
                    <audio controls>
                      <source
                        src={pokemonDetail?.cries.legacy}
                        type="audio/mpeg"
                      />
                    </audio>
                  </Stack>
                </Stack>
              }
            />
            <DetailRow
              label="Game Indices"
              valueComponent={pokemonDetail?.gameIndices.map((index) => (
                <Chip key={index} label={index} variant="outlined" />
              ))}
            />

            <DetailRow
              label="Stats"
              valueComponent={pokemonDetail?.stats.map((stat) => (
                <Chip key={stat} label={stat} variant="outlined" />
              ))}
            />
          </Stack>
        </Card>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            height: '100%',
          }}
        >
          <Typography variant="h6">Select a Pokemon to see details</Typography>
        </Box>
      )}
    </>
  )
}

export default DetailView
