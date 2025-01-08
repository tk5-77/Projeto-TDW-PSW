const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./utils/errorHandler');

//Rotas
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const entityRoutes = require('./routes/entities');
const serviceRoutes = require('./routes/services');
const bookingRoutes = require('./routes/bookings');

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(urlenconded({ extended: true }));

//DB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB connection error: ', err));

//Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

//Eroor Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
