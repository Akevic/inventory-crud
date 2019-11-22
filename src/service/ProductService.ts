import { RequestHandler, Request } from "express-serve-static-core"
import { Client } from "pg"
import { Product } from "../model/ProductModel"


export class ProductService {
  // ! TU IDU METODE (FUNKCIJE VEZANE ZA PRODUCT)

  constructor (private readonly client: Client) {}

  async list (): Promise<Product[]> {
    const { rows } = await this.client.query('SELECT * FROM products')

    return rows
  }

  async listById (req: Request): Promise<Product[]> {
    const { rows } = await this.client.query('SELECT * FROM products WHERE id = $1', [req.params.id])

    return rows
  }

  async deleteById (req: Request): Promise<Product[]> {
    const { rows } = await this.client.query('DELETE FROM products WHERE id = $1', [req.params.id])

    return rows
  }

  async createProduct (req: Request): Promise<Product[]> {
    const { rows } = await this.client.query('INSERT INTO products (name, price, year, color, instock) VALUES ($1, $2, $3, $4, $5)', [req.body.name, req.body.price, req.body.year, req.body.color, req.body.instock])

    return rows
  }
}
