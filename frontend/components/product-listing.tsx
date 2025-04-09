"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product-card"
import apiClient from "@/lib/apiClient"
import { Product } from "@/lib/data"

export default function ProductListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [products, setProducts] = useState([] as Product[])
  const [categories, setCategories] = useState([] as string[])

  useEffect(() => {

    async function fetchProducts() {
      const products: Product[] = await apiClient.getProducts();
      const categories: string[] = await apiClient.getCategories();

      setProducts(products);
      setCategories(categories);

    }


    fetchProducts()
  }
  )


  if (products.length === 0 || products === undefined) {
    return (

      <div className="container px-4 py-8">
        <div className="text-center text-3xl">No products found</div>
      </div>)
  }

  const filteredProducts = products.filter((product: Product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

    // Availability filter
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && product.stock > 0) ||
      (availabilityFilter === "unavailable" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesAvailability
  })

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Equipment Catalog</h1>

      {/* Search Bar */}
      <div className="mb-6 flex items-center rounded-md border bg-background">
        <div className="px-3">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="mb-2 block text-sm font-medium">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="mb-2 block text-sm font-medium">Availability</label>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="available">In Stock</SelectItem>
              <SelectItem value="unavailable">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">No equipment found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              setAvailabilityFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

