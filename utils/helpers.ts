import { PokemonDetail, PokemonDetailResponse } from '@/types'
import NodeCache from 'node-cache'

const getAllPokemonResults = (PokemonCacheWithOffsetAndLimit: NodeCache) => {
  const allKeys = PokemonCacheWithOffsetAndLimit.keys()
  const allNamesWithUrls: { name: string; url: string }[] = []
  allKeys.forEach((key) => {
    const cachedData = PokemonCacheWithOffsetAndLimit.get(key)
    if (cachedData && typeof cachedData === 'string') {
      try {
        const parsedData = JSON.parse(cachedData)
        if (Array.isArray(parsedData.results)) {
          parsedData.results.forEach(
            (pokemon: { name: string; url: string }) => {
              allNamesWithUrls.push({ name: pokemon.name, url: pokemon.url })
            }
          )
        }
      } catch (error) {
        console.error(`Error parsing cached data for key ${key}:`, error)
      }
    }
  })
  return allNamesWithUrls
}

const getPokemonNames = (pokemonResults: { name: string; url: string }[]) =>
  pokemonResults.map((pokemon) => pokemon.name)

const searchPokemonByName = (searchStr: string, pokemonNames: string[]) =>
  pokemonNames.filter((name) =>
    name.toLowerCase().includes(searchStr.toLowerCase())
  )

const getShapedPokemonDetail = (
  pokemonDetailObject: PokemonDetailResponse
): PokemonDetail => {
  const id = pokemonDetailObject.id
  const baseExperience = pokemonDetailObject.base_experience
  const name = pokemonDetailObject.name
  const height = pokemonDetailObject.height
  const weight = pokemonDetailObject.weight
  const cries = {
    latest: pokemonDetailObject.cries.latest,
    legacy: pokemonDetailObject.cries.legacy,
  }
  const moves = pokemonDetailObject.moves.map(
    (move) => (move as { move: { name: string } }).move.name
  )
  const abilities = pokemonDetailObject.abilities.map((ability) => {
    const typedAbility = ability as {
      ability: { name: string }
      is_hidden: boolean
    }

    return {
      name: typedAbility.ability.name,
      is_hidden: typedAbility.is_hidden,
    }
  })
  const gameIndices = pokemonDetailObject.game_indices.map(
    (index) => (index as { version: { name: string } }).version.name
  )

  const stats = pokemonDetailObject.stats.map((stat) => {
    const typedStat = stat as { base_stat: number; stat: { name: string } }
    return `${typedStat.stat.name}: ${typedStat.base_stat}`
  })

  const types = pokemonDetailObject.types.map(
    (type) => (type as { type: { name: string } }).type.name
  )

  return {
    id,
    name,
    height,
    weight,
    cries,
    abilities,
    gameIndices,
    baseExperience,
    stats,
    moves,
    types,
  }
}

const getParamValue = (
  urlString: string | null,
  param: string
): number | null => {
  if (!urlString) return null
  const fullUrl = new URL(urlString)
  const urlParams = new URLSearchParams(fullUrl.search)
  const value = urlParams.get(param)
  return value ? Number(value) : null
}

export {
  getAllPokemonResults,
  getPokemonNames,
  searchPokemonByName,
  getShapedPokemonDetail,
  getParamValue,
}
