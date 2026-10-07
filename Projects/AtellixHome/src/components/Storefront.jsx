'use client'

import React, { useState, useEffect, useRef } from 'react'
import htm from 'htm'
import { motion } from 'framer-motion'
import HeaderComponent from './Header'
import FooterComponent from './Footer'
import ProductComponent from './Product'
import ContactComponent from './Contact'
import ThoughtfulByDesignComponent from './ThoughtfulByDesign'
import HomeComponent from './Home'
import TestimonialComponent from './Testimonials'
import RevealBase from './Reveal'
import StatBase from './Stat'
import QuickViewBase from './QuickView'
import CartDrawer from './CartDrawer'
import FurnitureIllustrationBase from './FurnitureIllustration'
import IconBase from './Icon'
import InfoDialog from './InfoDialog'
import RoomCollection from './RoomCollection'
import StatusToast from './StatusToast'
import WordsBase from './Words'
import { CATS, HERO_SOFA_IMAGES, PAL, ROOM_IMAGES, fmt } from '../data/catalog'
import LEGAL_CONTENT from '../data/legalContent'
import useCart from '../hooks/useCart'
import useCollection from '../hooks/useCollection'
import useHeaderScroll from '../hooks/useHeaderScroll'
import useScrollReveal from '../hooks/useScrollReveal'
import useToast from '../hooks/useToast'
import useWishlist from '../hooks/useWishlist'

const html = htm.bind(React.createElement)
const Words = (props) => WordsBase({ ...props, html })
const Ic = (props) => IconBase({ ...props, html })
const Reveal = (props) => RevealBase({ ...props, html, FM: { motion: { div: motion.div } } })
const Stat = (props) => StatBase({ ...props, html })
const QuickView = (props) => QuickViewBase({ ...props, html, Ic, ROOM_IMAGES, fmt, PAL })
const FurnitureIllustration = (props) => FurnitureIllustrationBase({ ...props, html })

export default function Storefront() {
  const [open, setOpen] = useState(false),
    [wish, setWish] = useWishlist(),
    [qv, setQv] = useState(null),
    [theme, setTheme] = useState('light'),
    [info, setInfo] = useState(null),
    [orderInfoOpen, setOrderInfoOpen] = useState(false)
  const sc = useHeaderScroll()
  const { message: toast, show: say } = useToast()
  const { items: cart, count, totalLabel, add, removeOne, clear: clearCart } = useCart(say)
  const collection = useCollection(wish)
  const cartPanelRef = useRef(null)
  useScrollReveal()
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
  }, [theme])
  useEffect(() => {
    if (cartPanelRef.current) cartPanelRef.current.inert = !open
  }, [open])
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  const pick = (k) => {
    collection.updateCategory(k)
    go('shop')
  }
  const toggleWish = (p) => {
    const saved = wish.includes(p.id)
    setWish((current) => (saved ? current.filter((id) => id !== p.id) : [...current, p.id]))
    say(saved ? p.n + ' removed from saved pieces' : p.n + ' saved for later')
  }
  return html`<div>
    <${HeaderComponent}
      html=${html}
      Ic=${Ic}
      sc=${sc}
      pick=${pick}
      go=${go}
      theme=${theme}
      setTheme=${setTheme}
      count=${count}
      setOpen=${setOpen}
    />

    <main>
      <${HomeComponent}
        html=${html}
        Words=${Words}
        Ic=${Ic}
        HERO_SOFA_IMAGES=${HERO_SOFA_IMAGES}
        go=${go}
        orderInfoOpen=${orderInfoOpen}
        setOrderInfoOpen=${setOrderInfoOpen}
      />

      <${RoomCollection}
        html=${html}
        categories=${CATS}
        images=${ROOM_IMAGES}
        Reveal=${Reveal}
        Icon=${Ic}
        onPick=${pick}
      />

      <${ProductComponent}
        html=${html}
        Reveal=${Reveal}
        CATS=${CATS}
        mobileFiltersOpen=${collection.mobileFiltersOpen}
        setMobileFiltersOpen=${collection.setMobileFiltersOpen}
        showAllCategories=${collection.showAllCategories}
        setShowAllCategories=${collection.setShowAllCategories}
        cat=${collection.category}
        setCat=${collection.updateCategory}
        q=${collection.query}
        setQ=${collection.updateQuery}
        sort=${collection.sort}
        setSort=${collection.updateSort}
        visibleProducts=${collection.visibleProducts}
        list=${collection.products}
        showAllProducts=${collection.showAllProducts}
        setShowAllProducts=${collection.setShowAllProducts}
        setQv=${setQv}
        wish=${wish}
        toggleWish=${toggleWish}
        wishlistOnly=${collection.wishlistOnly}
        setWishlistOnly=${collection.updateWishlistOnly}
        wishlistCount=${wish.length}
        Ic=${Ic}
        ROOM_IMAGES=${ROOM_IMAGES}
        PAL=${PAL}
        fmt=${fmt}
        add=${add}
      />

      <${ThoughtfulByDesignComponent} html=${html} Reveal=${Reveal} Stat=${Stat} />

      <${TestimonialComponent} html=${html} Ic=${Ic} />

      <${ContactComponent} html=${html} Reveal=${Reveal} say=${say} />
    </main>

    <${FooterComponent}
      html=${html}
      CATS=${CATS}
      pick=${pick}
      go=${go}
      setInfo=${setInfo}
      FOOTER_INFO=${LEGAL_CONTENT}
      wish=${wish}
      say=${say}
    />

    ${info && html`<${InfoDialog} html=${html} info=${info} onClose=${() => setInfo(null)} Icon=${Ic} />`}
    ${qv && html`<${QuickView} p=${qv} onClose=${() => setQv(null)} onAdd=${add} />`}
    <${CartDrawer}
      html=${html}
      panelRef=${cartPanelRef}
      open=${open}
      setOpen=${setOpen}
      items=${cart}
      removeOne=${removeOne}
      onOrderComplete=${(orderId) => {
        clearCart()
        say('Unpaid order request ' + orderId + ' recorded')
      }}
      totalLabel=${totalLabel}
      fmt=${fmt}
      add=${add}
      PAL=${PAL}
      Icon=${Ic}
      FurnitureIllustration=${FurnitureIllustration}
    />
    <${StatusToast} html=${html} message=${toast} />
  </div>`
}
