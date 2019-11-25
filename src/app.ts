import express from 'express'
import bodyParser from 'body-parser'
import { Client } from 'pg'
import { ProductController } from './controller/ProductController'
import { ProductService } from './service/ProductService'
import { database } from './config'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

export const client = new Client(database)

client.connect().catch((err) => {
  console.error('error connecting to database: %s', err.message)
  process.exit(1)
})

const productService = new ProductService(client)
const productController = new ProductController(productService)

app.get('/products', productController.listProducts.bind(productController))
app.get('/products/search', productController.searchProduct.bind(productController))
app.get('/products/:id', productController.listProductsById.bind(productController))
app.post('/products', productController.addProduct.bind(productController))
app.delete('/products/:id', productController.deleteProductById.bind(productController))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
