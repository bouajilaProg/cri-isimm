"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useOrder } from "@/context/order-context"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateItemQuantity, getItemQuantity } = useOrder()
  const { toast } = useToast()

  const quantity = getItemQuantity(product.id)

  const handleAddToOrder = () => {
    if (product.stock <= 0) {
      toast({
        title: "Item unavailable",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    addItem(product, 1)
    toast({
      title: "Added to order",
      description: `${product.name} has been added to your order.`,
    })
  }

  const increaseQuantity = () => {
    if (quantity >= product.stock) {
      toast({
        title: "Maximum stock reached",
        description: `Only ${product.stock} units available.`,
        variant: "destructive",
      })
      return
    }
    updateItemQuantity(product.id, quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateItemQuantity(product.id, quantity - 1)
    } else {
      updateItemQuantity(product.id, 0)
      toast({
        title: "Removed from order",
        description: `${product.name} has been removed from your order.`,
      })
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        </Link>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span
            className={`text-sm font-medium ${product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </span>

          {quantity === 0 ? (
            <Button onClick={handleAddToOrder} disabled={product.stock <= 0} size="sm">
              Add to Order
            </Button>
          ) : (
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex h-8 min-w-[2rem] items-center justify-center border-y bg-background px-2 text-center text-sm">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

