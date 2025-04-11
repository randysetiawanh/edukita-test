// src/index.ts
import express from 'express';
import apiRoutes from './routes/index';

const app = express();
const PORT = 10101;

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
