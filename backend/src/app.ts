import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import errorHandler from './middleware/errorHandler.js';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 8080;

// try {
//   const prisma = new PrismaClient();
//   await prisma.$connect();
//   console.log('Connected to the database successfully!');
// } catch (err) {
//   console.error('Database connection error:', err);
// }

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Express app listening on port ${PORT}!`),
);
