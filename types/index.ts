export interface Pokemon {
  name: string
  url: string
}

export interface PokemonResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export interface PokemonDetailResponse {
  id: number
  name: string
  height: number
  weight: number
  cries: { latest: string; legacy: string }
  abilities: unknown[]
  game_indices: unknown[]
  base_experience: number
  stats: unknown[]
  moves: unknown[]
  types: unknown[]
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  cries: { latest: string; legacy: string }
  abilities: { name: string; is_hidden: boolean }[]
  gameIndices: string[]
  baseExperience: number
  stats: string[]
  moves: string[]
  types: string[]
}
