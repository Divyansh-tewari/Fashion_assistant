"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Bundle } from "../types/product"
import { useCart } from "../context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { ShoppingBag, ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"

interface BundleDisplayProps {
  bundles: Bundle[]
}

export function BundleDisplay({ bundles }: BundleDisplayProps) {
  const { addBundle } = useCart()
  const { toast } = useToast()
  const [bundleRatings, setBundleRatings] = useState<Record<string, boolean | null>>({})

  const handleAddBundle = (bundle: Bundle) => {
    addBundle(bundle)
    toast({
      title: "Bundle added to cart! 🎉",
      description: `${bundle.name} has been added to your cart.`,
    })
  }

  const handleRate = (bundleId: string, isLiked: boolean) => {
    setBundleRatings((prev) => ({
      ...prev,
      [bundleId]: isLiked,
    }))
    toast({
      title: isLiked ? "Thanks for liking! 👍" : "Thanks for the feedback! 👎",
      description: "We'll use this to improve our recommendations.",
    })
  }

  return (
    <div className="grid gap-8">
      {bundles.map((bundle, index) => (
        <motion.div
          key={bundle.id}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{bundle.name}</h3>
              <span className="text-lg font-bold text-primary">
                ₹{(bundle.totalPrice * 83).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bundle.products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                >
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium truncate">{product.name}</p>
                    <p className="text-white/80 text-xs">₹{(product.price * 83).toLocaleString("en-IN")}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRate(bundle.id, true)}
                  className={bundleRatings[bundle.id] === true ? "bg-green-100" : ""}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${bundleRatings[bundle.id] === true ? "text-green-600" : "text-gray-500"}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRate(bundle.id, false)}
                  className={bundleRatings[bundle.id] === false ? "bg-red-100" : ""}
                >
                  <ThumbsDown
                    className={`w-5 h-5 ${bundleRatings[bundle.id] === false ? "text-red-600" : "text-gray-500"}`}
                  />
                </Button>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={() => handleAddBundle(bundle)}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add Bundle to Cart
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

