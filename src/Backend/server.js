/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import registerRoutes from './route.js';

const app = express();
const dbURI = 'mongodb://localhost:27017';
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(dbURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));


registerRoutes(app);
