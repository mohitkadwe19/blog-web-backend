const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const swaggerDocs = require('./utils/swagger');
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
app.disable('x-powered-by'); // Disable X-Powered-By header
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);

// Connect to MongoDB
connectDB();

// Define GraphQL Schema
const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

// Create and start Apollo Server
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  swaggerDocs(app, PORT);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
