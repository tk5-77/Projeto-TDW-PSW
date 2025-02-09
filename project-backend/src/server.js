const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

dotenv.config();
const app = express();

//Rotas
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const entitiesRoutes = require('./routes/entities');
const serviceRoutes = require('./routes/services');
const bookingRoutes = require('./routes/bookings');
const bodyParser = require('body-parser');

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado ao MongoDB!");
}).catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
});

//Rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/entities', entitiesRoutes);
app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});