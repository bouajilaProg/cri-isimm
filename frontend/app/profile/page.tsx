import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProfileInfo from "@/components/profile-info"
import OrderHistory from "@/components/order-history"
import ChangePassword from "@/components/change-password"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Your Profile</h1>
          <OrderHistory />
        </div>
      </main>
      <Footer />
    </div>
  )
}

