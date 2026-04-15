const express = require('express');
const router = express.Router();
const user=require('../controllers/user.js');   

router.post('/send',user.register);
router.post('/login',user.login);
router.get('/logout',user.logout);

module.exports=router; 