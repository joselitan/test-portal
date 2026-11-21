require('dotenv').config();

const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Test Portal API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes)