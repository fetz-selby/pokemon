import { Box, Stack, Typography } from '@mui/material'

interface DetailRowProps {
  label: string
  value?: string | number | null
  valueComponent?: React.ReactNode
}

const DetailRow = ({ label, value, valueComponent }: DetailRowProps) => {
  return (
    <Stack direction={'row'} spacing={2} sx={{ width: '800px' }}>
      <Typography
        variant="h6"
        style={{ fontSize: '14px', fontWeight: 'bold', width: '150px' }}
      >
        {label}:
      </Typography>
      {value && <Typography variant="body1">{value}</Typography>}
      {!value && !valueComponent && (
        <Typography variant="body1">No data available</Typography>
      )}
      {valueComponent && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            border: '1px solid #f8f8f8',
            borderRadius: '4px',
            maxHeight: '120px',
            overflowY: 'auto',
          }}
        >
          {valueComponent}
        </Box>
      )}
    </Stack>
  )
}

export default DetailRow
