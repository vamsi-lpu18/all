const express = require('express');
const router = express.Router();

const todo = require('../controllers/todo.js');
const { authenticate } = require('../middlewares/authenticate.js');
// const login = require('../controllers/user.js'); 

router.post('/create', todo.create);

router.get('/get', authenticate, todo.getAll); 
router.delete('/delete/:id', authenticate, todo.deleteTodo); 

module.exports = router;
