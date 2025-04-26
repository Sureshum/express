const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJwt');
const { getDashboard } = require('../controladores/dashboardController');

router.get('/', verifyToken, getDashboard);

module.exports = router;