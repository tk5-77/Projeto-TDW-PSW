const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234@projetotdw-psw.du9en.mongodb.net/')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

module.exports = mongoose;