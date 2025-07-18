import { Pokemon, PokemonResponse } from '@/types'
import { getPokemonResponse } from '@/utils/api'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useRef, useState, useEffect } from 'react'

const PAGE_SIZE = 20

const getNextOffset = (nextUrl: string | null): number => {
  if (!nextUrl) return 0
  const fullUrl = new URL(nextUrl)
  const urlParams = new URLSearchParams(fullUrl.search)
  const offset = urlParams.get('offset')
  return offset ? Number(offset) : 0
}

const useVirtualizeList = (
  pokemonResponse: PokemonResponse,
  itemHeight: number,
  onListChange?: (items: Pokemon[]) => void
) => {
  const [items, setItems] = useState<Pokemon[]>(pokemonResponse.results || [])
  const [offset, setOffset] = useState(() =>
    getNextOffset(pokemonResponse.next)
  )
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: items?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  })

  // Detect when the last row is visible to load more
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems()
    if (!virtualItems.length) return
    const lastItem = virtualItems[virtualItems.length - 1]
    if (lastItem.index >= items.length - 1 && hasMore && !loading) {
      loadMore()
      if (onListChange) {
        onListChange(items)
      }
    }
  }, [rowVirtualizer.getVirtualItems(), hasMore, loading])

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    const pokemonResponse: PokemonResponse = await getPokemonResponse(
      PAGE_SIZE,
      offset
    )
    setOffset(getNextOffset(pokemonResponse.next))
    setItems((prev) => [...prev, ...pokemonResponse.results])
    if (pokemonResponse.results.length < PAGE_SIZE) setHasMore(false)
    setLoading(false)
  }, [offset, hasMore, loading])

  return { items, hasMore, parentRef, rowVirtualizer }
}
export default useVirtualizeList
