"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Trash2, AlertCircle, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useOrder } from "@/context/order-context"
import { useToast } from "@/hooks/use-toast"

export default function OrderTable() {
  const { items, receiveDate, returnDate, reason, removeItem, updateItemQuantity, updateOrderDetails, clearOrder } =
    useOrder()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmitOrder = () => {
    // Validate all fields are filled
    if (!receiveDate || !returnDate || !reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields for your order.",
        variant: "destructive",
      })
      return
    }

    // Validate dates
    const receiveDateObj = new Date(receiveDate)
    const returnDateObj = new Date(returnDate)
    const today = new Date()

    // Set hours to 0 for date comparison
    today.setHours(0, 0, 0, 0)

    if (receiveDateObj < today) {
      toast({
        title: "Invalid receive date",
        description: "Receive date must be today or later.",
        variant: "destructive",
      })
      return
    }

    if (returnDateObj <= receiveDateObj) {
      toast({
        title: "Invalid return date",
        description: "Return date must be after receive date.",
        variant: "destructive",
      })
      return
    }

    const borrowingDays = (returnDateObj.getTime() - receiveDateObj.getTime()) / (1000 * 60 * 60 * 24)
    if (borrowingDays > 14) {
      toast({
        title: "Borrowing period too long",
        description: "Borrowing period cannot exceed 14 days.",
        variant: "destructive",
      })
      return
    }

    // Submit order (simulated)
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessDialog(true)
    }, 1500)
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    clearOrder()
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Your order is empty</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          Browse our equipment catalog and add items to your order to get started.
        </p>
        <Button href="/rt" asChild>
          <a href="/rt">Browse Equipment</a>
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Order Details Section */}
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Order Details</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="receiveDate">Receive Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="receiveDate"
                type="date"
                value={receiveDate}
                onChange={(e) => updateOrderDetails({ receiveDate: e.target.value })}
                className="pl-10"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnDate">Return Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => updateOrderDetails({ returnDate: e.target.value })}
                className="pl-10"
                min={receiveDate || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="reason">Reason for Borrowing</Label>
          <Textarea
            id="reason"
            placeholder="Please explain why you need these items..."
            value={reason}
            onChange={(e) => updateOrderDetails({ reason: e.target.value })}
            className="min-h-[100px] resize-none"
            required
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6 rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Item</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Available</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.productId} className="border-b">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-md">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateItemQuantity(item.productId, item.quantity - 1)
                          } else {
                            removeItem(item.productId)
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex h-8 min-w-[2rem] items-center justify-center border-y bg-background px-2 text-center text-sm">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => {
                          if (item.quantity < item.product.stock) {
                            updateItemQuantity(item.productId, item.quantity + 1)
                          } else {
                            toast({
                              title: "Maximum stock reached",
                              description: `Only ${item.product.stock} units available.`,
                              variant: "destructive",
                            })
                          }
                        }}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {item.product.stock} available
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="px-8">
          {isSubmitting ? "Processing..." : "Send Order"}
        </Button>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Your order has been submitted and is pending approval. You will receive a notification when your order
              status changes.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCloseSuccessDialog}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

