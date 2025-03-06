const express = require('express')
const router= express.Router();
const handleControllers = require('../controllers/controllers')
const middlerWares = require('../middlewares/middlewares')
router.get('/',handleControllers.handleHome);
router.get('/form',handleControllers.handleFormScreen);
router.post('/create',handleControllers.handleCreate);
router.get('/users',handleControllers.handleUsers);
router.get('/delete/:id',handleControllers.deleteUser);
router.get('/edit/:id',handleControllers.editUser);
router.post('/edit/:id',handleControllers.updateUser);
router.get('/projects/:id',handleControllers.handleProjects);
router.post('/createproject/:id',handleControllers.createProject);
router.get('/viewprojects/:id',handleControllers.getProjects);




module.exports =router;