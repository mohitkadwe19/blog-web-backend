const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./utils/swagger/swagger');
const userRoute = require('./routes/user.route');
const blogRoute = require('./routes/blog.route');
const connectDB = require('./db/conn');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);

// Connect to MongoDB
connectDB();

// Create and start Server
async function startServer() {

  const PORT = process.env.PORT || 4000;

  swaggerDocs(app, PORT);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
