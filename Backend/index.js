const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/transaction');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4040;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send("Hello sir Si Singh");
});

app.post('/api/transaction', async (req, res) => {
  const { name, description, datetime, price } = req.body;

  if (!name || !description || !datetime) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const transaction = await Transaction.create({ name, description, datetime, price });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
