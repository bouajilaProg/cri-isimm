import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OrderTable from "@/components/order-table"

export default function OrderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Your Order</h1>
          <OrderTable />
        </div>
      </main>
      <Footer />
    </div>
  )
}

