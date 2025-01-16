const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter utilizadores.', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }

        res.status(200).json({ message: 'Utilizador eliminado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao eliminar o utilizador.', error });
    }
};

module.exports = { getUsers, deleteUser };