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

    // Insert real items with descriptions and details
    const items = [
      { name: 'Lipo 4s', stock: 2, description: '4S lithium polymer battery pack. Suitable for high-power applications.' },
      { name: 'Lipo 3s', stock: 2, description: '3S lithium polymer battery pack. Ideal for mid-range power systems.' },
      { name: 'Afficheur lcd16*2', stock: 4, description: '16x2 character LCD display for simple readouts and UI.' },
      { name: 'Afficheur Numérique', stock: 1, description: 'Digital display module for clear numerical readouts.' },
      { name: 'Micro servo (Servomoteur SG90)', stock: 7, description: 'Small and versatile servo motor, ideal for small robotics.' },
      { name: 'servo Moter', stock: 1, description: 'General-purpose servo motor for motion control.' },
      { name: 'Arduino Nano', stock: 2, description: 'Compact and versatile microcontroller board with Arduino compatibility.' },
      { name: 'Arduino Uno', stock: 6, description: 'Classic microcontroller board, widely used for educational projects.' },
      { name: 'Esp32', stock: 2, description: 'Powerful microcontroller with integrated Wi-Fi and Bluetooth.' },
      { name: 'STM32', stock: 1, description: '32-bit microcontroller with powerful processing capabilities for embedded systems.' },
      { name: 'Rasberry', stock: 1, description: 'Raspberry Pi, a single-board computer for various applications.' },
      { name: 'Ultrason sensor', stock: 9, description: 'Ultrasonic sensor for distance measurement in robotics and automation.' },
      { name: 'Gaz sensor (Mq)', stock: 3, description: 'Gas sensor (MQ series) for detecting gases like methane, carbon monoxide, etc.' },
      { name: 'EspCAM', stock: 2, description: 'ESP32-based camera module with Wi-Fi capabilities.' },
      { name: 'Trompe', stock: 1, description: 'Horn or siren module, typically used for sound signaling in projects.' },
      { name: 'Water jet pump', stock: 1, description: 'Pump designed to spray water, useful for water-based projects.' },
      { name: 'Sensor flame', stock: 1, description: 'Flame sensor for detecting fire or flame presence.' },
      { name: 'DHT11 sensor', stock: 1, description: 'Basic temperature and humidity sensor for environmental monitoring.' },
      { name: 'PIR sensor', stock: 1, description: 'Passive infrared sensor for motion detection.' },
      { name: 'Water sensor', stock: 2, description: 'Water detection sensor, often used for leak detection systems.' },
      { name: 'Relay', stock: 3, description: 'Electromagnetic switch used to control high-power devices.' },
      { name: 'breadboard', stock: 9, description: 'Breadboard for building prototypes without soldering.' },
      { name: 'Module bluetooth', stock: 1, description: 'Bluetooth module for wireless communication in embedded projects.' },
      { name: 'Power Supply', stock: 2, description: 'Power supply unit for providing stable power to electronic components.' },
      { name: 'SIM800L', stock: 2, description: 'GSM/GPRS module for communication via SMS, calls, and internet.' },
      { name: 'SIM900A', stock: 1, description: 'GSM module for communication via SMS, calls, and internet.' },
      { name: 'Shield L298n', stock: 5, description: 'Motor driver shield for controlling DC motors and stepper motors.' },
      { name: 'Driber 16 chanels (servomoteor)', stock: 1, description: 'Servo motor driver with 16 channels for controlling multiple servos.' },
      { name: 'Step motor 5V', stock: 4, description: '5V stepper motor for precise movement control.' },
      { name: 'Step 12 v', stock: 3, description: '12V stepper motor for higher power applications.' },
      { name: 'Potentiometre 10Kohm', stock: 3, description: '10k ohm potentiometer for adjusting voltage levels in circuits.' },
      { name: 'Châssis suiveur', stock: 1, description: 'Follower chassis for robotic applications, with motor mounts.' },
      { name: 'Moteurs DC (suiveur)', stock: 10, description: 'DC motors for use in robotics or other motor-driven systems.' },
      { name: 'Capteurs infrarouges TCRT5000', stock: 23, description: 'Infrared sensors for line following or object detection.' },
      { name: 'QTR-8A', stock: 1, description: 'Eight-channel infrared sensor array for line-following robots.' },
      { name: 'Support pour piles', stock: 4, description: 'Battery holder for organizing and powering electronic projects.' },
      { name: 'roues motrices', stock: 20, description: 'Drive wheels for robots or motorized vehicles.' },
      { name: 'BTS7960B Motor Driver (H-Bridge)', stock: 1, description: 'High-current motor driver with H-Bridge for controlling DC motors.' },
      { name: 'Roues tout terrain', stock: 4, description: 'All-terrain wheels for robots or vehicles designed to handle rough surfaces.' }
    ];

    await db.collection('items').insertMany(items);
    const insertedItems = await db.collection('items').find().toArray();

    // Insert sample users with role "member" instead of "customer"
    const users = [
      {
        userCode: 'zwawin012',
        tel: '555-000-1234',
        email: 'yassine@example.com',
        password: 'password',
        name: 'Yassine',
        role: 'member', // Updated to "member"
        orders: [],
      },
    ];
    await db.collection('users').insertMany(users);
    const insertedUsers = await db.collection('users').find().toArray();
    const yassine = insertedUsers.find(user => user.userCode === 'zwawin012');

    // Insert sample orders
    const orders = [
      {
        userId: yassine._id.toString(),
        items: [
          { productId: insertedItems[0]._id, quantity: 1, product: insertedItems[0] }, // Lipo 4s
          { productId: insertedItems[1]._id, quantity: 2, product: insertedItems[1] }, // Lipo 3s
        ],
        status: 'pending',
        receiveDate: new Date('2025-04-12').toISOString(),
        returnDate: new Date('2025-04-19').toISOString(),
        createdAt: new Date().toISOString(),
        reason: 'Setting up a project',
      },
    ];

    const insertedOrders = await db.collection('orders').insertMany(orders);
    const order1 = insertedOrders.insertedIds[0];

    // Update user orders
    await db.collection('users').updateOne({ _id: yassine._id }, { $push: { orders: { $each: [await db.collection('orders').findOne({ _id: order1 })] } } });

    // Reduce stock based on orders
    await db.collection('items').updateOne({ _id: insertedItems[0]._id }, { $inc: { stock: -1 } }); // Lipo 4s
    await db.collection('items').updateOne({ _id: insertedItems[1]._id }, { $inc: { stock: -2 } }); // Lipo 3s

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
