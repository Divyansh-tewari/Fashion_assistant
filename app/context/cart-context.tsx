"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Product, Bundle } from "../types/product"

type CartItem = Product | Bundle

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  addBundle: (bundle: Bundle) => void
  removeItem: (id: string) => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item])
  }

  const addBundle = (bundle: Bundle) => {
    setItems((prev) => [...prev, ...bundle.products])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addBundle,
        removeItem,
        itemCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}

