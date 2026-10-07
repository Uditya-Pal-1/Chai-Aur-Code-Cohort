import { useMemo, useState } from 'react'
import { PRODUCTS } from '../data/catalog'

const INITIAL_CATEGORY = 'all'
const INITIAL_SORT = 'feat'

export default function useCollection(savedProductIds) {
  const [category, setCategory] = useState(INITIAL_CATEGORY)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(INITIAL_SORT)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [wishlistOnly, setWishlistOnly] = useState(false)

  const updateCategory = (nextCategory) => {
    setCategory(nextCategory)
    setShowAllProducts(false)
  }

  const updateQuery = (nextQuery) => {
    setQuery(nextQuery)
    setShowAllProducts(false)
  }

  const updateSort = (nextSort) => {
    setSort(nextSort)
    setShowAllProducts(false)
  }

  const updateWishlistOnly = (nextValue) => {
    setWishlistOnly(nextValue)
    setShowAllProducts(false)
  }

  const clearFilters = () => {
    updateCategory(INITIAL_CATEGORY)
    updateQuery('')
    updateWishlistOnly(false)
  }

  const products = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    const filteredProducts = PRODUCTS.filter(
      (product) =>
        (category === INITIAL_CATEGORY || product.k === category) &&
        (product.n + product.cat + product.m).toLowerCase().includes(searchTerm) &&
        (!wishlistOnly || savedProductIds.includes(product.id)),
    )

    if (sort === 'asc') return filteredProducts.sort((a, b) => a.p - b.p)
    if (sort === 'desc') return filteredProducts.sort((a, b) => b.p - a.p)
    return filteredProducts
  }, [category, query, savedProductIds, sort, wishlistOnly])

  return {
    category,
    query,
    sort,
    showAllProducts,
    showAllCategories,
    mobileFiltersOpen,
    wishlistOnly,
    products,
    visibleProducts: showAllProducts ? products : products.slice(0, 4),
    updateCategory,
    updateQuery,
    updateSort,
    updateWishlistOnly,
    clearFilters,
    setShowAllProducts,
    setShowAllCategories,
    setMobileFiltersOpen,
  }
}
