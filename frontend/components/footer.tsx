import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} CRI Robotics Club. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/rt" className="text-sm text-muted-foreground hover:text-foreground">
            Equipment
          </Link>
          <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
            Profile
          </Link>
        </nav>
      </div>
    </footer>
  )
}

