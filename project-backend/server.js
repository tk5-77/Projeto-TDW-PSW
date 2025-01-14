const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./src/utils/errorHandler');

//Rotas
const userRoutes = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');
const entitiesRoutes = require('./src/routes/entities');
const serviceRoutes = require('./src/routes/services');
const bookingRoutes = require('./src/routes/bookings');

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//DB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB connection error: ', err));

//Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/entities', entitiesRoutes);
app.use('/api/services', serviceRoutes);
//app.use('/api/bookings', bookingRoutes);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});