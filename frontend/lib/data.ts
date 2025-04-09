export interface Product {
  id: string
  name: string
  description: string
  category: string
  stock: number
  image: string
}

export interface OrderItem {
  productId: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: "pending" | "approved" | "rejected" | "completed"
  receiveDate: string
  returnDate: string
  createdAt: string
  reason: string
}

export interface User {
  id: string
  name: string
  email: string
  orders: Order[]
}

