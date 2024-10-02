const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para iniciar sesión
router.post('../Login/Login.html', authController.login);

module.exports = router;
