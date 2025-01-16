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
const bodyParser = require('body-parser');

require('dotenv').config();
dotenv.config();
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('Erro ao conectar à DB:', error));

    
//Rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/entities', entitiesRoutes);
app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});