import express from 'express'
import bodyParser from 'body-parser'
import { Client } from 'pg'
import { getProducts } from './routes/GET/getProducts'
import { getProductById } from './routes/GET/getProductById'
import { getProduct } from './routes/GET/getProduct'
import { addProduct } from './routes/POST/addProduct'
import { deleteProduct } from './routes/DELETE/deleteProductById'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

export const client = new Client({
  user: 'simun',
  host: 'localhost',
  database: 'inventory-app',
  password: 'developer',
  port: 5432
})

client.connect().catch((err) => {
  console.error('error connecting to database: %s', err.message)
  process.exit(1)
})


app.get('/products', getProducts)
app.get('/product', getProduct)
app.get('/products/:id', getProductById)
app.post('/product', addProduct)
app.delete('/product', deleteProduct)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
