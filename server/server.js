const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const depositRoutes = require('./routes/depositRoutes');
const logger = require('./utils/logger');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', depositRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
