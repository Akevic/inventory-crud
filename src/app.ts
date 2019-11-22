import express from 'express'
import bodyParser from 'body-parser'
import { Client } from 'pg'
import { getProducts } from './routes/GET/getProducts'
import { getProductById } from './routes/GET/getProductById'
import { deleteProductById } from './routes/DELETE/deleteProductById'
import { getProductByName } from './routes/GET/getProductByName'
import { addProduct } from './routes/POST/addProduct'

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
app.get('/products/:id', getProductById)
app.get('/product/:name', getProductByName) // TODO: FIX IT
app.post('/product', addProduct) // * ne radi
app.delete('/products/:id', deleteProductById)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
