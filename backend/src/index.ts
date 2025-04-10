import express from 'express';

const app = express();
const PORT = 10101;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Edukita Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
