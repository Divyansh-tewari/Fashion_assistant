export interface Product {
  id: string
  name: string
  price: number
  image: string
}

export interface Bundle {
  id: string
  name: string
  products: Product[]
  totalPrice: number
}

export type Occasion = "house-party" | "dinner-date" | "office" | "others"

