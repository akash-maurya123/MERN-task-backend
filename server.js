require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// ✅ Replace this with your frontend URL
const allowedOrigins = [
  'http://localhost:3000',   // local React
  'https://mern-task-frontend-jccb.onrender.com' // live frontend
];

// ✅ CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ DB error:', err));

// ✅ Routes
app.use('/api/tasks', taskRoutes);

// ✅ Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const taskRoutes = require('./routes/taskRoutes');

// const app = express();
// // app.use(cors());
// app.use(cors({ origin: '*' }));

// app.use(express.json());

// // connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ DB error:', err));

// app.use('/api/tasks', taskRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
