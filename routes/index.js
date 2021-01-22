const Router = require('koa-router');
const koaBody = require('koa-body');
const mainController = require('../controllers/mainController');
const loginController = require('../controllers/loginController');
const adminController = require('../controllers/adminController');
const isAdmin = require('../utils/isAdmin');
const router = new Router();

router.get('/', mainController.get);
router.post('/', koaBody(), mainController.post);

router.get('/login', loginController.get);
router.post('/login', koaBody(), loginController.post);

router.get('/admin', isAdmin, adminController.get);
router.post(
  '/admin/upload',
  isAdmin,
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + '/public/upload',
    },
  }),
  adminController.upload
);
router.post('/admin/skills', isAdmin, koaBody(), adminController.skills);

module.exports = router;
