require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// ✅ Enable CORS (allow frontend to access backend)
app.use(cors({
  origin: "*", // allow all origins (for production, replace "*" with your frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB error:', err));

// ✅ Routes
app.use('/api/tasks', taskRoutes);

// ✅ Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
