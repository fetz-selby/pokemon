import { PokemonDetail } from '@/types'
import { getPokemonByName } from '@/utils/api'
import { getShapedPokemonDetail } from '@/utils/helpers'
import { useCallback, useState } from 'react'

const useDetailView = () => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null)

  const getPokemonDetail = useCallback(
    async (name: string) => {
      const response = await getPokemonByName(name)
      if (!response) {
        throw new Error(`Pokemon with name ${name} not found`)
      }
      console.log('Fetched Pokemon Detail:', response)
      setPokemonDetail(getShapedPokemonDetail(response))
    },
    [setPokemonDetail]
  )

  return { getPokemonDetail, pokemonDetail }
}

export default useDetailView
