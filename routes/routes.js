const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const Auth = require('../middleware/Auth');
const AuthValidator = require('../validators/AuthValidator');
const UserValidator = require('../validators/UserValidator');

router.get('/', HomeController.index);

router.get('/user/:id', UserValidator.findById, UserController.findById);
router.get('/user', Auth, UserController.index);
router.post('/user', UserValidator.addUser, UserController.create);
router.put('/user/:id', UserValidator.updateUser, UserController.update);
router.delete('/user/:id', UserValidator.findById, UserController.delete);
router.post('/login', AuthValidator.login, UserController.login);

module.exports = router;