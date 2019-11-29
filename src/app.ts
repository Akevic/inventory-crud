import express from 'express'
import bodyParser from 'body-parser'
import knex from 'knex'
import { ProductService, ProductController } from './products'
import { OrderService, OrderController } from './orders'
import { database } from './config'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

const Client = knex(database)

const productService = new ProductService(Client)
const productController = new ProductController(productService)

const orderService = new OrderService(Client)
const orderController = new OrderController(orderService)

app.get('/products', productController.listProducts.bind(productController))
app.get('/products/:id', productController.listProductsById.bind(productController))
app.post('/products', productController.addProduct.bind(productController))
app.delete('/products/:id', productController.deleteProductById.bind(productController))

app.get('/orders', orderController.listOrders.bind(orderController))
app.post('/orders', orderController.createOrder.bind(orderController))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
