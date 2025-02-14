"use client"

import { useState, useEffect } from "react"
import { Upload, Camera } from "lucide-react"
import { Header } from "./components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart } from "./context/cart-context"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FunkyIcon } from "./components/FunkyIcon"
import { OccasionSelector } from "./components/occasion-selector"
import { BundleDisplay } from "./components/bundle-display"
import type { Occasion } from "./types/product"
import { motion } from "framer-motion"
import { ProductFilters } from "./components/product-filters"

// Update the mockProducts price to INR
const mockProducts = [
  {
    id: "1",
    name: "Gray Formal Shirt",
    price: 4999,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-%20img1-ImdhbxB9xFpAYJfNKVjSlo1XUsTt9a.png",
  },
  {
    id: "2",
    name: "Black Formal Shirt",
    price: 5999,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-%20img2-aSek79UwCwz81N4Y47SOu6J1hftBnu.png",
  },
  {
    id: "3",
    name: "Light Blue Formal Shirt",
    price: 4499,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-img3-ePS4vMqQ6fymMvBJqdeJnsHh2PfaXv.png",
  },
  {
    id: "4",
    name: "Bright Blue Formal Shirt",
    price: 4799,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-img4-pu3M6io9OJdgjtl8ovJrdKPn3MyzmS.png",
  },
]

// Update the mockBundles price to INR
const mockBundles = [
  {
    id: "bundle-1",
    name: "Casual Cool Bundle",
    products: [
      {
        id: "shirt-1",
        name: "Gray Formal Shirt",
        price: 4999,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-%20img1-ImdhbxB9xFpAYJfNKVjSlo1XUsTt9a.png",
      },
      {
        id: "bottom-1",
        name: "Blue Jeans with Sneakers",
        price: 6999,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-reco_1-9u3wU7FokQ0wZ21dHzX7ogKgdQrZbL.png",
      },
    ],
    totalPrice: 11998,
  },
  {
    id: "bundle-2",
    name: "Business Casual Bundle",
    products: [
      {
        id: "shirt-2",
        name: "Gray Formal Shirt",
        price: 4999,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-%20img1-ImdhbxB9xFpAYJfNKVjSlo1XUsTt9a.png",
      },
      {
        id: "bottom-2",
        name: "Navy Pants with Boat Shoes",
        price: 7999,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-reco_2-k7e7w0a0a0a0a0a0a0a0a0a0a0a.png",
      },
    ],
    totalPrice: 12998,
  },
  {
    id: "bundle-3",
    name: "Smart Casual Bundle",
    products: [
      {
        id: "shirt-3",
        name: "Gray Formal Shirt",
        price: 4999,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-%20img1-ImdhbxB9xFpAYJfNKVjSlo1XUsTt9a.png",
      },
      {
        id: "bottom-3",
        name: "Gray Pants with Loafers",
        price: 6999,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BSC-reco_3-ePS4vMqQ6fymMvBJqdeJnsHh2PfaXv.png",
      },
    ],
    totalPrice: 11998,
  },
]

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [showBundles, setShowBundles] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null)
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isBundlesLoading, setIsBundlesLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please choose an image under 5MB.",
        variant: "destructive",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please choose an image file.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleConfirm = () => {
    setIsProcessing(true)
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsProcessing(false)
        setShowResults(true)
      }
    }, 100)
  }

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    setShowResults(false)
    setShowBundles(false)
    setSelectedOccasion(null)
  }

  const handleOccasionSelect = (occasion: Occasion) => {
    setSelectedOccasion(occasion)
  }

  const handleSubmitOccasion = () => {
    if (selectedOccasion) {
      setIsBundlesLoading(true)
      setTimeout(() => {
        setIsBundlesLoading(false)
        setShowBundles(true)
      }, 5000)
    }
  }

  const handleFiltersSubmit = (filters: { sizes: string[]; priceRange: number }) => {
    setIsProcessing(true)
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsProcessing(false)
        setShowResults(true)
      }
    }, 100)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-8">
        {!selectedFile && !showResults ? (
          <div className="max-w-2xl mx-auto text-center mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <FunkyIcon className="w-32 h-32 mx-auto" />
              <h2 className="text-3xl font-bold text-gray-900">Hey there, fashion explorer! 🌟</h2>
              <p className="text-lg text-gray-600">
                Upload a picture of your favorite apparel and let me find you some amazing matches!
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto" size="lg">
                    <label className="cursor-pointer flex items-center justify-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Image
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                        onClick={(e) => {
                          ;(e.target as HTMLInputElement).value = ""
                        }}
                      />
                    </label>
                  </Button>
                  <Button
                    asChild
                    className="bg-secondary hover:bg-secondary/90 text-primary w-full sm:w-auto"
                    size="lg"
                  >
                    <label className="cursor-pointer flex items-center justify-center gap-2">
                      <Camera className="w-5 h-5" />
                      Take Photo
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileSelect}
                        onClick={(e) => {
                          ;(e.target as HTMLInputElement).value = ""
                        }}
                      />
                    </label>
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Supported formats: JPG, PNG, WEBP (max 5MB)</p>
              </div>
            </div>
          </div>
        ) : !showResults ? (
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Help us find the perfect match</h3>
              <ProductFilters onFiltersSubmit={handleFiltersSubmit} />
            </div>
          </div>
        ) : !showBundles ? (
          <div className="max-w-6xl mx-auto mt-10">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <FunkyIcon className="w-12 h-12" />
                  <h3 className="text-2xl font-semibold">We found these matches! 🎉</h3>
                </div>
                <Button onClick={handleReset} variant="outline">
                  Upload Another
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="relative aspect-square w-full mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="font-semibold mb-2 text-sm">{product.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">₹{product.price}</span>
                      <Button onClick={() => addItem(product)} size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 max-w-xl mx-auto">
                <OccasionSelector onSelect={handleOccasionSelect} />
                <Button
                  onClick={handleSubmitOccasion}
                  className="w-full mt-6"
                  disabled={!selectedOccasion}
                  variant={selectedOccasion ? "default" : "outline"}
                >
                  Submit your choice
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <FunkyIcon className="w-12 h-12" />
                  <h3 className="text-2xl font-semibold">Perfect Bundles for You! 🎉</h3>
                </div>
                <Button onClick={handleReset} variant="outline">
                  Start Over
                </Button>
              </div>
              <BundleDisplay bundles={mockBundles} />
            </div>
          </div>
        )}
      </div>
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full">
            <FunkyIcon className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-center">
              Analysing image and finding the best matches for you
            </h3>
            <Progress value={progress} className="w-full" />
            <p className="text-center mt-2">{progress}%</p>
          </div>
        </div>
      )}
      {isBundlesLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-4"
            >
              <FunkyIcon className="w-full h-full text-primary" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold mb-4 text-center"
            >
              Creating your perfect bundles...
            </motion.h3>
            <Progress value={progress} className="w-full" />
            <p className="text-center mt-2 text-gray-500">This will just take a moment</p>
          </div>
        </div>
      )}
      <Toaster />
    </main>
  )
}

