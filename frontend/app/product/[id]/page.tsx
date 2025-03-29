import { notFound } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AddToOrderButton from "@/components/add-to-order-button"
import { products } from "@/lib/data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <p className="mb-2 text-sm text-muted-foreground">Category: {product.category}</p>

              <div className="mb-6 mt-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="mb-2 text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="mb-2 text-xl font-semibold">Borrowing Guidelines</h2>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Maximum borrowing period is 2 weeks</li>
                  <li>You are responsible for any damage or loss</li>
                  <li>Return items in the same condition you received them</li>
                  <li>Late returns may affect future borrowing privileges</li>
                </ul>
              </div>

              <div className="mt-auto">
                <AddToOrderButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

