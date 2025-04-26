const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false 
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('conexion a MySQL establecida');
    return sequelize;
  } catch (error) {
    console.error('error al conectar a MySQL:', error);
    throw error;
  }
};

module.exports = { connectDB, sequelize };