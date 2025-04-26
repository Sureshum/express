const app = require('./app');
const { connectDB } = require('./configuraciones/database');
  const { sequelize } = require('./configuraciones/database');

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log('Tablas creadas exitosamente');
}).catch(err => {
  console.error('Error al crear tablas:', err);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);
  });

