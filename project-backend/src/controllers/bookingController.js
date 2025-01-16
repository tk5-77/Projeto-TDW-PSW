const create = async (req, res) => {
  try {
      const { serviceId, userId, date } = req.body;

      if (!serviceId || !userId || !date) {
          return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      // Exemplo de criação de reserva (substituir por lógica real)
      const booking = { id: 1, serviceId, userId, date };
      res.status(201).json({ message: 'Reserva criada com sucesso!', booking });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao criar a reserva.', error });
  }
};

const getBookings = async (req, res) => {
  try {
      // Exemplo de lista de reservas (substituir por lógica real)
      const bookings = [{ id: 1, serviceId: '123', userId: '456', date: '2025-01-16' }];
      res.status(200).json(bookings);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao obter as reservas.', error });
  }
};

module.exports = { create, getBookings }; // Certifique-se de exportar ambas as funções
