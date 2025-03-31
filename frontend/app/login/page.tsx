"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import apiClient from "@/lib/apiClient"
import { User, useUser } from "@/context/user-context"

export default function Login() {
  const [userCode, setUserCode] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { userData, setUserData } = useUser()


  useEffect(() => {


    if (userData.userCode !== "") {
      router.push("/profile")
      return
    }

    const userToken = localStorage.getItem("user-token")
    if (userToken) {

      apiClient.checkToken(userToken).then((data) => {
        if (data) {
          setUserData(data)
          router.push("/profile")
        }
      })
    }

  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userCode || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const token = await apiClient.login(userCode, password)
    alert(token)
    localStorage.setItem("user-token", token)
    router.push("/profile")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="container flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Robotics Club Logo"
                width={80}
                height={80}
                className="rounded-full bg-primary/10 p-2"
              />
            </Link>
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your CRI platform</p>
          </div>

          <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Login Code</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="00000090"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>

        </div>
      </div>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CRI Robotics Club. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

