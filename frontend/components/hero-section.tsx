import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <Image
        src="/placeholder.svg?height=800&width=1600"
        alt="Robotics Club"
        width={1600}
        height={800}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          CRI Platform
        </h1>
        <p className="mb-8 max-w-2xl text-lg sm:text-xl">
          Your one-stop platform for all things CRI. Login now!
        </p>
        <Link
          href="/login"
          className="rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Access Platform
        </Link>
      </div>
    </section>
  )
}

