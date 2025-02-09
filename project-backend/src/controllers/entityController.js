const { Entity } = require('../models/entity');
const { Service } = require('../models/service');
const User = require('../models/user');
module.exports = {
  async create(req, res) {
    try {
      const entity = new Entity({
        ...req.body,
        admins: [req.user._id]
      });
      await entity.save();
      await User.findByIdAndUpdate(req.user._id, { entity: entity._id });
      res.status(201).json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

   async getAll(_req, res) {
     try {
       const entities = await Entity.find()
       res.json(entities);
     } catch (error) {
     res.status(400).json({ error: error.message });
    }
   },

  // async getAll(req, res) {
  //   try {
  //     let query = {};
  //     // Se o usuário for um admin_entity, retorna apenas as entidades que ele criou
  //     if (req.user && req.user.role === 'admin_entity') {
  //       query = { admins: req.user._id };
  //     }
  //     const entities = await Entity.find(query);
  //     res.json(entities);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  async getOne(req, res) {
    try {
      const user = await User.findById(req.user._id)
      const entityId = user.entity._id;
      const entity = await Entity.findById(entityId);

      if (!entity) {
        return res.status(404).json({ error: 'Entity not found' });
      }
      res.json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  
     async getServices(req, res) {
     try {
       // Busca o usuário logado
      const userLogged = await User.findById(req.user._id);
      if (!userLogged) {
         return res.status(404).json({ error: 'Usuário não encontrado' });
       }

       // Verifica se o usuário possui uma entidade associada
       const entityId = userLogged.entity;
       if (!entityId) {
         return res.status(400).json({ error: 'Usuário não está associado a nenhuma entidade' });
       }

       // Busca os serviços que possuem o id da entidade associada
       const services = await Service.find({ entity: entityId });
       return res.json(services);
     } catch (error) {
       console.error('Erro ao buscar serviços:', error);
       return res.status(500).json({ error: 'Erro interno ao buscar serviços' });
     }
   }
// controllers/entityController.js
//   async getServices(req, res) {
//     try {
//       const entityId = req.params.id; // Agora recebemos o id da entidade pela URL
//       if (!entityId) {
//         return res.status(400).json({ error: 'ID da entidade não fornecido.' });
//       }
      
//       // Busca os serviços associados à entidade informada
//       const services = await Service.find({ entity: entityId });
      
//       if (!services || services.length === 0) {
//         return res.status(404).json({ error: 'Nenhum serviço encontrado para esta entidade.' });
//       }
      
//       res.json(services);
//     } catch (error) {
//       console.error('Erro ao buscar serviços:', error);
//       res.status(500).json({ error: 'Erro interno ao buscar serviços' });
//     }
//   }
 };