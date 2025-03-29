export interface Product {
  id: string
  name: string
  description: string
  category: string
  stock: number
  image: string
}

export interface OrderItem {
  productId: string
  product: Product
  receiveDate: string
  returnDate: string
  reason: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: "pending" | "approved" | "rejected" | "completed"
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  orders: Order[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Arduino Uno",
    description: "Standard microcontroller board based on the ATmega328P. Perfect for beginners and simple projects.",
    category: "Microcontrollers",
    stock: 15,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Raspberry Pi 4",
    description:
      "Single-board computer with 4GB RAM, capable of running a full operating system and complex applications.",
    category: "Single-board Computers",
    stock: 8,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Servo Motor Kit",
    description: "Set of various servo motors for precise control of movement in robotics projects.",
    category: "Motors",
    stock: 12,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Soldering Station",
    description: "Professional soldering station with temperature control for electronics work.",
    category: "Tools",
    stock: 5,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Sensor Pack",
    description: "Collection of various sensors including ultrasonic, infrared, temperature, and humidity sensors.",
    category: "Sensors",
    stock: 10,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Robot Chassis Kit",
    description: "Complete chassis kit with wheels, motors, and mounting hardware for building mobile robots.",
    category: "Mechanical Parts",
    stock: 7,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    name: "Battery Pack",
    description: "Rechargeable lithium-ion battery pack for powering portable robotics projects.",
    category: "Power Supplies",
    stock: 20,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    name: "Breadboard Set",
    description: "Set of breadboards in various sizes for prototyping electronic circuits without soldering.",
    category: "Tools",
    stock: 25,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export const categories = [
  "All",
  "Microcontrollers",
  "Single-board Computers",
  "Motors",
  "Sensors",
  "Tools",
  "Mechanical Parts",
  "Power Supplies",
]

export const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      {
        productId: "1",
        product: products[0],
        receiveDate: "2023-06-10",
        returnDate: "2023-06-24",
        reason: "Building a weather station for the science fair",
      },
      {
        productId: "5",
        product: products[4],
        receiveDate: "2023-06-10",
        returnDate: "2023-06-24",
        reason: "Building a weather station for the science fair",
      },
    ],
    status: "completed",
    createdAt: "2023-06-05",
  },
  {
    id: "order2",
    userId: "user1",
    items: [
      {
        productId: "2",
        product: products[1],
        receiveDate: "2023-07-15",
        returnDate: "2023-07-29",
        reason: "Creating a smart mirror project",
      },
    ],
    status: "approved",
    createdAt: "2023-07-10",
  },
]

export const mockUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  orders: mockOrders,
}

