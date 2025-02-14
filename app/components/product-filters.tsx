"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface ProductFiltersProps {
  onFiltersSubmit: (filters: { sizes: string[]; priceRange: number }) => void
}

const SIZES = ["S", "M", "L", "XL", "XXL"]
const MIN_PRICE = 1000
const MAX_PRICE = 10000

export function ProductFilters({ onFiltersSubmit }: ProductFiltersProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number>(5000)

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleSubmit = () => {
    onFiltersSubmit({
      sizes: selectedSizes,
      priceRange: priceRange,
    })
  }

  const isValid = selectedSizes.length > 0

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Size</h3>
        <div className="flex gap-4 justify-center">
          {SIZES.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              className={`w-12 h-12 ${selectedSizes.includes(size) ? "bg-primary text-white" : "text-gray-500"}`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Price Range</h3>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <Slider
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100}
              value={[priceRange]}
              onValueChange={([value]) => setPriceRange(value)}
              className="w-full"
            />
          </div>
          <div className="w-24 text-right font-medium">₹{priceRange.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={!isValid} className="w-full" size="lg">
        Show Recommendations
      </Button>
    </div>
  )
}

