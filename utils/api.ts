import { PokemonService } from '@/services/third-party/PokemonService'
import { PokemonResponse } from '@/types'

export const getPokemonResponse = async (
  limit: number,
  offset: number
): Promise<PokemonResponse> => await PokemonService.getPokemons(limit, offset)

export const getPokemonByName = async (name: string) =>
  await PokemonService.getPokemonByName(name)

export const getSearchMatch = async (searchStr: string) =>
  await PokemonService.getSearchMatch(searchStr)
