const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const loginController = require('../controllers/loginController');
const adminController = require('../controllers/adminController');
const isAdmin = require('../utils/isAdmin');

router.get('/', mainController.get);
router.post('/', mainController.post);

router.get('/login', loginController.get);
router.post('/login', loginController.post);

router.get('/admin', isAdmin, adminController.get);
router.post('/admin/upload', isAdmin, adminController.upload);
router.post('/admin/skills', isAdmin, adminController.skills);

module.exports = router;
