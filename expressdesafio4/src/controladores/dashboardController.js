const getDashboard = (req, res) => {
    res.json({ 
      success: true,
      message: 'bienvenido al Dashboard :v',
      user: req.user,
      data: {
        stats: {
          visits: 1500,
          users: 45,
          sales: 1200
        }
      }
    });
  };
  
  module.exports = { getDashboard };