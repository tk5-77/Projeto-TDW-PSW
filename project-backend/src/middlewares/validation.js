const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: 'Dados inválidos.', details: error.details });
        }

        next();
    };
};

module.exports = { validateRequest };