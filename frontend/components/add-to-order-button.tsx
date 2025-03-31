"use client"

import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useOrder } from "@/context/order-context"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/data"
import { useState } from "react"

interface AddToOrderButtonProps {
  product: Product
}

export default function AddToOrderButton({ product }: AddToOrderButtonProps) {
  const { addItem, updateItemQuantity, getItemQuantity } = useOrder()
  const { toast } = useToast()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const currentQuantity = getItemQuantity(product.id)
  const isInOrder = currentQuantity > 0

  const handleAddToOrder = () => {
    if (product.stock <= 0) {
      toast({
        title: "Item unavailable",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    if (isInOrder) {
      router.push("/order")
      return
    }

    addItem(product, quantity)
    toast({
      title: "Added to order",
      description: `${quantity} ${product.name} ${quantity === 1 ? "has" : "have"} been added to your order.`,
    })

    // Optionally navigate to order page after adding
    if (window.confirm("Item added to your order. View your order now?")) {
      router.push("/order")
    }
  }

  const increaseQuantity = () => {
    if (isInOrder) {
      if (currentQuantity >= product.stock) {
        toast({
          title: "Maximum stock reached",
          description: `Only ${product.stock} units available.`,
          variant: "destructive",
        })
        return
      }
      updateItemQuantity(product.id, currentQuantity + 1)
    } else {
      setQuantity((prev) => Math.min(prev + 1, product.stock))
    }
  }

  const decreaseQuantity = () => {


    if (isInOrder) {
      if (currentQuantity > 1) {
        updateItemQuantity(product.id, currentQuantity - 1)
      } else {
        updateItemQuantity(product.id, 0)
        toast({
          title: "Removed from order",
          description: `${product.name} has been removed from your order.`,
        })
      }
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isInOrder ? (
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-r-none" onClick={decreaseQuantity}>
              <Minus className="h-5 w-5" />
            </Button>
            <div className="flex h-10 min-w-[3rem] items-center justify-center border-y bg-background px-3 text-center">
              {currentQuantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-none"
              onClick={increaseQuantity}
              disabled={currentQuantity >= product.stock}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <Button onClick={() => router.push("/order")} size="lg">
            View Order
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-none"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <div className="flex h-10 min-w-[3rem] items-center justify-center border-y bg-background px-3 text-center">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-none"
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <Button onClick={handleAddToOrder} disabled={product.stock <= 0} size="lg" className="w-full">
            Add to Order
          </Button>
        </div>
      )}

      {product.stock <= 0 && (
        <p className="text-center text-sm text-muted-foreground">This item is currently unavailable for borrowing.</p>
      )}
    </div>
  )
}

