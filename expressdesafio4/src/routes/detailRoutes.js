const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJwt');
const { getDetail } = require('../controladores/detailController');

router.get('/:id', verifyToken, getDetail);

module.exports = router;