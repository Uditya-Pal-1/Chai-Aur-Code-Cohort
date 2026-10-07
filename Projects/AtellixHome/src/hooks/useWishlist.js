import { useCallback, useSyncExternalStore } from 'react'
import { PRODUCTS } from '../data/catalog'

const STORAGE_KEY = 'af-wishlist'
const EMPTY_WISHLIST = []
const PRODUCT_IDS = new Set(PRODUCTS.map(({ id }) => id))
const listeners = new Set()
let wishlistSnapshot = EMPTY_WISHLIST
let hasLoadedWishlist = false

function loadWishlist() {
  if (hasLoadedWishlist || typeof window === 'undefined') return wishlistSnapshot

  hasLoadedWishlist = true
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    wishlistSnapshot = Array.isArray(saved)
      ? saved.filter((id) => PRODUCT_IDS.has(id))
      : EMPTY_WISHLIST
  } catch (error) {
    console.error('Unable to load saved pieces from local storage.', error)
    wishlistSnapshot = EMPTY_WISHLIST
  }

  return wishlistSnapshot
}

function subscribe(listener) {
  listeners.add(listener)
  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return
    hasLoadedWishlist = false
    loadWishlist()
    listeners.forEach((notify) => notify())
  }
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export default function useWishlist() {
  const wish = useSyncExternalStore(subscribe, loadWishlist, () => EMPTY_WISHLIST)
  const setWish = useCallback((update) => {
    const current = loadWishlist()
    const next = typeof update === 'function' ? update(current) : update
    wishlistSnapshot = Array.isArray(next)
      ? next.filter((id) => PRODUCT_IDS.has(id))
      : EMPTY_WISHLIST
    hasLoadedWishlist = true

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistSnapshot))
    } catch (error) {
      console.error('Unable to save pieces to local storage.', error)
    }

    listeners.forEach((listener) => listener())
  }, [])

  return [wish, setWish]
}
