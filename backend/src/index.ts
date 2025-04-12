// src/index.ts
import express from 'express';
import apiRoutes from './routes/index';
import { authenticate } from './utils/auth';

const app = express();
const PORT = 10101;

app.use(express.json());
app.use('/api', (req, res, next) => {
  const publicRoutes = [
    '/auth/login',
    '/users'
  ];

  console.log(req);
  const isPublic = publicRoutes.some(path => req.path.startsWith(path));

  if (isPublic) {
    return next();
  }

  return authenticate(req, res, next);
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
