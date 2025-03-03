const express = require('express')
const router= express.Router();
const handleControllers = require('../controllers/controllers')
const middlerWares = require('../middlewares/middlewares')
router.get('/',handleControllers.handleHome);
router.get('/form',handleControllers.handleFormScreen);
router.post('/create',handleControllers.handleCreate);
router.get('/users',handleControllers.handleUsers);

module.exports =router;