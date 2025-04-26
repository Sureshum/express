const getDetail = (req, res) => {
    const { id } = req.params;
    
    res.json({ 
      success: true,
      message: `detalle del item ${id}`,
      user: req.user,
      data: {
        id,
        name: `item ${id}`,
        description: `esta es la descripcion detallada del item ${id}`,
        price: 99.99,
        stock: 10
      }
    });
  };
  
  module.exports = { getDetail };