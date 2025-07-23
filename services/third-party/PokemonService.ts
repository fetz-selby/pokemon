import { PokemonResponse } from '@/types'
import {
  getAllPokemonResults,
  getPokemonNames,
  searchPokemonByName,
} from '@/utils/helpers'
import NCache from '@/utils/NCache'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

class PokemonService {
  private static PokemonCacheWithOffsetAndLimit = new NCache().getInstance()
  private static PokemonCacheWithName = new NCache().getInstance()

  static async getPokemons(
    limit: number,
    offset: number
  ): Promise<PokemonResponse> {
    const cacheKey = `pokemons_limit_offset:${limit}:${offset}`
    const cachedData =
      PokemonService.PokemonCacheWithOffsetAndLimit.get(cacheKey)
    if (cachedData) {
      return JSON.parse(
        typeof cachedData === 'string' ? cachedData : JSON.stringify(cachedData)
      )
    }
    PokemonService.PokemonCacheWithOffsetAndLimit.set(
      cacheKey,
      JSON.stringify({ count: 0, next: null, previous: null, results: [] })
    )
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`)

    if (!response.ok) {
      console.error(`Failed to fetch Pokemons: ${response.statusText}`)
      throw new Error('Failed to fetch Pokemon data')
    }
    const data: PokemonResponse = await response.json()
    PokemonService.PokemonCacheWithOffsetAndLimit.set(
      cacheKey,
      JSON.stringify(data)
    )

    return data
  }

  static async getPokemonByName(name: string) {
    const cacheKey = `pokemon_name:${name}`
    const cachedData = PokemonService.PokemonCacheWithName.get(cacheKey)
    if (cachedData) {
      return JSON.parse(
        typeof cachedData === 'string' ? cachedData : JSON.stringify(cachedData)
      )
    }
    PokemonService.PokemonCacheWithName.set(
      cacheKey,
      JSON.stringify({ name: '', url: '' }) // Placeholder for empty response
    )
    const response = await fetch(`${BASE_URL}/${name}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon with name: ${name}`)
    }

    return response.json()
  }

  static async getSearchMatch(searchStr: string) {
    const allPokemonResults = getAllPokemonResults(
      PokemonService.PokemonCacheWithOffsetAndLimit
    )
    const allPokemonNames = getPokemonNames(allPokemonResults)
    const filteredPokemonNames = searchPokemonByName(searchStr, allPokemonNames)

    return { filteredPokemonNames }
  }
}

export { PokemonService }
