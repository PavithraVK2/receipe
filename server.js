const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB, Dish, Reservation, Order, SEED_DISHES, getConnectionStatus } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
connectDB();

// ============================================================================
// REST API ENDPOINTS
// ============================================================================

// 1. Health & Database Status
app.get('/api/health', async (req, res) => {
  const isConnected = getConnectionStatus();
  try {
    const dishesCount = isConnected ? await Dish.countDocuments() : SEED_DISHES.length;
    const reservationsCount = isConnected ? await Reservation.countDocuments() : 0;
    const ordersCount = isConnected ? await Order.countDocuments() : 0;

    res.json({
      status: 'ok',
      database: isConnected ? 'MongoDB (connected)' : 'Memory Cache (fallback)',
      databaseType: 'MongoDB',
      databaseName: 'flavoria_db',
      host: '127.0.0.1:27017',
      stats: {
        totalDishes: dishesCount,
        totalReservations: reservationsCount,
        totalOrders: ordersCount
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. Get All Dishes (with optional category or search filter)
app.get('/api/dishes', async (req, res) => {
  try {
    const { category, search } = req.query;
    const isConnected = getConnectionStatus();

    if (isConnected) {
      const query = {};
      if (category && category.toLowerCase() !== 'all') {
        query.category = new RegExp(`^${category}$`, 'i');
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { subtitle: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ];
      }

      const dishes = await Dish.find(query);
      return res.json(dishes);
    } else {
      // Fallback to in-memory seed dishes
      let results = [...SEED_DISHES];
      if (category && category.toLowerCase() !== 'all') {
        results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(d => 
          d.title.toLowerCase().includes(q) || 
          d.subtitle.toLowerCase().includes(q) ||
          d.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return res.json(results);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dishes', details: err.message });
  }
});

// 3. Get Dish by ID
app.get('/api/dishes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isConnected = getConnectionStatus();

    if (isConnected) {
      const dish = await Dish.findOne({ id });
      if (!dish) return res.status(404).json({ error: 'Dish not found' });
      return res.json(dish);
    } else {
      const dish = SEED_DISHES.find(d => d.id === id);
      if (!dish) return res.status(404).json({ error: 'Dish not found' });
      return res.json(dish);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching dish', details: err.message });
  }
});

// 4. Book a Table Reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const { name, phone, email, guests, date, time, specialRequests } = req.body;

    if (!name || !phone || !email || !guests || !date || !time) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Generate luxurious reservation code (e.g. FLV-8294)
    const randomCode = `FLV-${Math.floor(1000 + Math.random() * 9000)}`;

    const reservationData = {
      code: randomCode,
      name,
      phone,
      email,
      guests: Number(guests),
      date,
      time,
      specialRequests: specialRequests || '',
      status: 'Confirmed'
    };

    if (getConnectionStatus()) {
      const newReservation = await Reservation.create(reservationData);
      return res.status(201).json({
        success: true,
        message: 'Table reservation confirmed successfully!',
        reservation: newReservation
      });
    } else {
      return res.status(201).json({
        success: true,
        message: 'Table reservation confirmed (Cached)!',
        reservation: reservationData
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reservation', details: err.message });
  }
});

// 5. Get All Reservations
app.get('/api/reservations', async (req, res) => {
  try {
    if (getConnectionStatus()) {
      const reservations = await Reservation.find().sort({ createdAt: -1 });
      res.json(reservations);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reservations', details: err.message });
  }
});

// 6. Create / Checkout Order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, subtotal, discount, tax, total, voucherCode, customerInfo } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const orderCode = `ORD-${Date.now().toString().slice(-6)}`;

    const orderData = {
      orderCode,
      items,
      subtotal: Number(subtotal),
      discount: Number(discount || 0),
      tax: Number(tax || 0),
      total: Number(total),
      voucherCode: voucherCode || '',
      customerInfo: customerInfo || { name: 'Guest Diner' },
      status: 'Preparing'
    };

    if (getConnectionStatus()) {
      const newOrder = await Order.create(orderData);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully!',
        order: newOrder
      });
    } else {
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully (Cached)!',
        order: orderData
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
});

// 7. Get All Orders
app.get('/api/orders', async (req, res) => {
  try {
    if (getConnectionStatus()) {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`  FLAVORIA Fine Dining - Full Stack Server Running`);
  console.log(`  Local URL:   http://localhost:${PORT}`);
  console.log(`  Database:    mongodb://127.0.0.1:27017/flavoria_db`);
  console.log(`========================================================`);
});
