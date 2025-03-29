import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductListing from "@/components/product-listing"

export default function RTPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ProductListing />
      </main>
      <Footer />
    </div>
  )
}

