const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'Utilizador registado com sucesso!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registar o utilizador.', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido.', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao iniciar sessão.', error });
    }
};

module.exports = { register, login };