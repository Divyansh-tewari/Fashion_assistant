"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/cart-context"
import { useEffect, useState } from "react"
import { FunkyIcon } from "./FunkyIcon"

export function Header() {
  const { itemCount } = useCart()
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (itemCount > 0) {
      setShowCelebration(true)
      const timer = setTimeout(() => setShowCelebration(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FunkyIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-primary">Fashion Assistant</h1>
        </div>
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-primary" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
          {showCelebration && <div className="absolute -top-8 -left-8 animate-bounce">🎉</div>}
        </div>
      </div>
    </header>
  )
}

