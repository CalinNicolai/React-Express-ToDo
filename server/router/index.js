const Router = require('express').Router
const userController = require('../controllers/user-controller')
const taskController = require('../controllers/task-controller')
const router = new Router();
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middlewares')
const UserModel = require("../models/user-model");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/userTasks/:userId', authMiddleware, taskController.getTasks )
router.post('/createTask', authMiddleware, taskController.createTask )
router.post('/changeTask', authMiddleware, taskController.changeTask )
router.delete('/deleteTask/:taskId', authMiddleware, taskController.deleteTask)
module.exports = router