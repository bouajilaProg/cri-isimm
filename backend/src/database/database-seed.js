// seed-database.js
require('dotenv').config(); // Load environment variables from .env file

const { MongoClient } = require('mongodb');

async function seedDatabase() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error('MongoDB URI is not defined in the .env file');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME); // Database name from .env

    // Clear existing collections (optional)
    await db.collection('items').deleteMany({});
    await db.collection('orders').deleteMany({});
    await db.collection('users').deleteMany({});

    // Insert sample items
    const items = [
      {
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        category: 'Electronics',
        stock: 10,
        image: 'laptop.jpg',
      },
      {
        name: 'Office Chair',
        description: 'Ergonomic office chair for comfortable seating',
        category: 'Furniture',
        stock: 50,
        image: 'chair.jpg',
      },
      {
        name: 'Wireless Mouse',
        description: 'Comfortable and precise wireless mouse',
        category: 'Electronics',
        stock: 100,
        image: 'mouse.jpg',
      },
    ];
    await db.collection('items').insertMany(items);
    const insertedItems = await db.collection('items').find().toArray();
    const laptop = insertedItems.find(item => item.name === 'Laptop');
    const chair = insertedItems.find(item => item.name === 'Office Chair');
    const mouse = insertedItems.find(item => item.name === 'Wireless Mouse');

    // Insert sample users
    const users = [
      {
        userCode: 'USER001',
        tel: '123-456-7890',
        email: 'user1@example.com',
        password: 'password123', // In a real app, you might hash the password, but it's not needed here
        name: 'John Doe',
        role: 'customer',
        orders: [],
      },
      {
        userCode: 'ADMIN001',
        tel: '987-654-3210',
        email: 'admin@example.com',
        password: 'adminpass', // Same as above
        name: 'Jane Smith',
        role: 'admin',
        orders: [],
      },
    ];
    await db.collection('users').insertMany(users);
    const insertedUsers = await db.collection('users').find().toArray();
    const user1 = insertedUsers.find(user => user.userCode === 'USER001');
    const user2 = insertedUsers.find(user => user.userCode === 'ADMIN001');

    // Insert sample orders
    const orders = [
      {
        userId: user1._id.toString(),
        items: [
          { productId: laptop._id, quantity: 2, product: laptop },
          { productId: chair._id, quantity: 1, product: chair },
        ],
        status: 'pending',
        receiveDate: new Date('2025-04-10').toISOString(),
        returnDate: new Date('2025-04-17').toISOString(),
        createdAt: new Date().toISOString(),
        reason: 'Need for upcoming project',
      },
      {
        userId: user2._id.toString(),
        items: [{ productId: mouse._id, quantity: 5, product: mouse }],
        status: 'approved',
        receiveDate: new Date('2025-04-15').toISOString(),
        returnDate: new Date('2025-04-22').toISOString(),
        createdAt: new Date().toISOString(),
        reason: 'Restocking inventory',
      },
    ];
    const insertedOrders = await db.collection('orders').insertMany(orders);
    const order1 = insertedOrders.insertedIds[0];
    const order2 = insertedOrders.insertedIds[1];

    // Update user orders (if you want to maintain the array in the user document)
    await db.collection('users').updateOne({ _id: user1._id }, { $push: { orders: { $each: [await db.collection('orders').findOne({ _id: order1 })] } } });
    await db.collection('users').updateOne({ _id: user2._id }, { $push: { orders: { $each: [await db.collection('orders').findOne({ _id: order2 })] } } });

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
