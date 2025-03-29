"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/lib/data"

interface OrderItem {
  productId: string
  product: Product
  quantity: number
}

interface OrderContextType {
  items: OrderItem[]
  receiveDate: string
  returnDate: string
  reason: string
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateItemQuantity: (productId: string, quantity: number) => void
  updateOrderDetails: (details: { receiveDate?: string; returnDate?: string; reason?: string }) => void
  clearOrder: () => void
  getTotalItems: () => number
  getItemQuantity: (productId: string) => number
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [receiveDate, setReceiveDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [reason, setReason] = useState("")

  const addItem = (product: Product, quantity = 1) => {
    // Check if product is already in order
    const existingItemIndex = items.findIndex((item) => item.productId === product.id)

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += quantity
      setItems(updatedItems)
    } else {
      // Add new item
      setItems((prev) => [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
        },
      ])
    }
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  const updateOrderDetails = (details: { receiveDate?: string; returnDate?: string; reason?: string }) => {
    if (details.receiveDate !== undefined) setReceiveDate(details.receiveDate)
    if (details.returnDate !== undefined) setReturnDate(details.returnDate)
    if (details.reason !== undefined) setReason(details.reason)
  }

  const clearOrder = () => {
    setItems([])
    setReceiveDate("")
    setReturnDate("")
    setReason("")
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getItemQuantity = (productId: string) => {
    const item = items.find((item) => item.productId === productId)
    return item ? item.quantity : 0
  }

  return (
    <OrderContext.Provider
      value={{
        items,
        receiveDate,
        returnDate,
        reason,
        addItem,
        removeItem,
        updateItemQuantity,
        updateOrderDetails,
        clearOrder,
        getTotalItems,
        getItemQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}

