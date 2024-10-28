const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const { typeDefs} = require('../../schemas/employeeSchema'); // Ensure this import is correct
const resolvers = require('./resolvers/employeeResolvers');
const path = require('path');
require('dotenv').config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employeeDB';

  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });

  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
};

startServer();
