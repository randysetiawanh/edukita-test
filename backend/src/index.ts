// src/index.ts
import express from 'express';
import routes from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
