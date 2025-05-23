const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const complaintRoutes = require('./Routes/complaintRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', complaintRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
