"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Occasion } from "../types/product"
import { motion } from "framer-motion"
import { PartyPopper, Utensils, Briefcase, Sparkles } from "lucide-react"

interface OccasionSelectorProps {
  onSelect: (occasion: Occasion) => void
}

export function OccasionSelector({ onSelect }: OccasionSelectorProps) {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null)

  const handleSelect = (occasion: Occasion) => {
    setSelectedOccasion(occasion)
    onSelect(occasion)
  }

  const occasions = [
    { id: "house-party", label: "House party", icon: PartyPopper },
    { id: "dinner-date", label: "Dinner date", icon: Utensils },
    { id: "office", label: "Office", icon: Briefcase },
    { id: "others", label: "Others", icon: Sparkles },
  ]

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-900"
        >
          What's the occasion? 🎉
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500"
        >
          Let's find the perfect bundle for your event
        </motion.p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {occasions.map((occasion, index) => (
          <motion.div
            key={occasion.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Button
              variant={selectedOccasion === occasion.id ? "default" : "outline"}
              className={`w-full h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                selectedOccasion === occasion.id
                  ? "bg-primary text-white scale-105 shadow-lg"
                  : "text-gray-500 hover:bg-gray-50 hover:scale-105"
              }`}
              onClick={() => handleSelect(occasion.id as Occasion)}
            >
              <occasion.icon
                className={`w-6 h-6 ${selectedOccasion === occasion.id ? "text-white" : "text-gray-400"}`}
              />
              {occasion.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

