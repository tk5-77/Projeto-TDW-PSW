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

// Função de registo de utilizadores
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Verificar se o utilizador já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email já registado.' });
        }

        // Encriptar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar o utilizador
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'Utilizador registado com sucesso!', user: newUser });
    } catch (error) {
        console.error("Erro ao registar utilizador:", error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

module.exports = { login};
module.exports = { register};
