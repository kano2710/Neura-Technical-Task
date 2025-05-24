import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import launchesRouter from './routes/launches';

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (_req, res) => {
  res.send({ status: 'API is running' });
});

app.use('/launches', launchesRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});