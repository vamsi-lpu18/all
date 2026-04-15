const productController=require('../controller/product')
const express=require('express');
const router=express.Router()

router
.post('/products',productController.createProducts)
.get('/products', productController.getproducts)

.get('/products/:id', productController.getproduct)

.delete('/products/:id',productController. deleteproduct)
exports.router=router 