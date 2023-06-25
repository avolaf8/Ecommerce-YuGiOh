const express = require('express')
const app = require('../app')
const Controller = require('../controllers/controller')
const router = express.Router()
const authentication = require("../middlewares/authentication")

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get('/products', Controller.fetchProduct)
router.use(authentication)
router.post('/products/:productId', Controller.handlerAddCart)
router.get('/cart', Controller.fetchPushCart)
router.delete('/cart/:id', Controller.deletedCart)
router.patch('/checkout', Controller.handlerPayment)
router.get('/shipping', Controller.dropPoint)
router.post('/coast', Controller.shippingCoast)
router.post('/payment', Controller.paymentGetWay)


module.exports = router