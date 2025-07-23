import PageWithVirtualizer from '@/components/PageWithVirtualizer/PageWithVirtualizer'
import { getPokemonResponse } from '@/utils/api'

const HomePage = async () => {
  const initialData = await getPokemonResponse(20, 20)

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <PageWithVirtualizer pokemonResponse={initialData} />
    </div>
  )
}

export default HomePage
