import { PokemonService } from '@/services/third-party/PokemonService'
import { PokemonResponse } from '@/types'

export const getPokemonResponse = async (
  limit: number,
  offset: number
): Promise<PokemonResponse> => {
  const response = await PokemonService.getPokemons(limit, offset)
  console.log('Fetched Pokemons:', response)
  return response
}

export const getPokemonByName = async (name: string) => {
  const response = await PokemonService.getPokemonByName(name)
  return response
}

export const getSearchMatch = async (searchStr: string) => {
  const response = await PokemonService.getSearchMatch(searchStr)
  console.log('Search Match Response:', response)
  return response
}
