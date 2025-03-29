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

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <ProfileInfo />
              <div className="mt-8">
                <ChangePassword />
              </div>
            </div>
            <div className="md:col-span-2">
              <OrderHistory />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

