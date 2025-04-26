const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authController = {

  async register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'todos los campos son requeridos'
      });
    }

    try {
      const existingUser = await User.findOne({
        where: { 
          [Op.or]: [{ username }, { email }]
        }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'el usuario o email ya estan registrados'
        });
      }

      const newUser = await User.create({
        username,
        email,
        password 
      });

      const token = jwt.sign(
        { 
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1m' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60000,
        path: '/'
      });

      return res.status(201).json({
        success: true,
        message: 'usuario registrado exitosamente',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        },
        token
      });

    } catch (error) {
      console.error('error en registro:', error);
      return res.status(500).json({
        success: false,
        message: 'error en el servidor al registrar usuario'
      });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
      if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'username y password son requeridos'
      });
    }
    try {
      const user = await User.findOne({ 
        where: { username },
        attributes: ['id', 'username', 'password', 'email'] 
      });

      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'credenciales invalidas' 
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ 
          success: false,
          message: 'credenciales invalidas' 
        });
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username,
          email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1m' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60000,
        path: '/'
      });

      return res.json({ 
        success: true,
        message: 'autenticacion exitosa',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });

    } catch (error) {
      console.error('error en login:', error);
      return res.status(500).json({ 
        success: false,
        message: 'error en el servidor' 
      });
    }
  },

  logout(req, res) {
    try {
      res.clearCookie('token', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });
      
      return res.json({ 
        success: true,
        message: 'sesion cerrada exitosamente, adiosssssssssss' 
      });
    } catch (error) {
      console.error('Error en logout:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al cerrar sesion'
      });
    }
  }
};

module.exports = authController;