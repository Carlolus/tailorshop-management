const express = require('express');
const router = express.Router();
const { upload, uploadImage } = require('../controllers/upload.controller');
const validateToken = require("../middlewares/validateToken"); 

// Ruta protegida para subir imágenes
router.post('/garments', validateToken, upload.single('image'), uploadImage);

module.exports = router;
