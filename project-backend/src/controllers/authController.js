const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Certifique-se de que este modelo existe

// Login de utilizador
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o utilizador existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem-sucedido.', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.', error });
    }
};

module.exports = { login };
