import TableMain from '@/components/TableList/TableMain'
import { getPokemonResponse } from '@/utils/api'

const [LIMIT, OFFSET] = [20, 20]

const TablePage = async () => {
  const initialPokemon = await getPokemonResponse(LIMIT, OFFSET)

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <TableMain initialPokemonResponse={initialPokemon} />
    </div>
  )
}

export default TablePage
