const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/events', productRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Connection failed', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
