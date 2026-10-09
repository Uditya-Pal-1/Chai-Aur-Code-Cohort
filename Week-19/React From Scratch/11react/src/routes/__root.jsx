import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from "react"
import { Link } from "@tanstack/react-router"
import { useNotification } from "../context/NotificationContext"
import { useCartStore } from "../store/cartStore"

function RootComponent()  {
  const {count} = useNotification()
  const cartCount = useCartStore((state) => state.cart.length)
  const addToCart = useCartStore((state) => state.addToCart)
  return (
    <React.Fragment>
  <div>Hello,Doston!!</div>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <hr />
      <Link to='/making-chai' className='[&.active]:font-bold'>Making-Chai</Link>
      <hr />
      <Link to='/Product.$pid' className='[&.active]:font-bold'>Product</Link>
      <hr />
      <Link to='/Product.lazy' className="[&.active]:font-bold">ProductLazy</Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
    </React.Fragment>
  )
}

export const Route = createRootRoute({ component: RootLayout })