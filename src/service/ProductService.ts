import { Request } from "express-serve-static-core"
import { Product } from "../model/ProductModel"
import { Client } from "../app"
export class ProductService {

  constructor (private readonly client: any) {}

  async list (params?: ListProductsParams): Promise<Product[]> {
    let query = this.client
      .from('products')
      .select('id', 'name', 'price', 'color', 'year', 'instock')

    if (params?.filter) {
        query = query.where('name', 'ilike', `%${params.filter}%`)
    }

    if (params?.limit) {
        query = query.limit(params.limit)
    }

    if (params?.page) {
      query = query.offset(params.page)
    }

    return query

  }

  async listById (req: Request): Promise<Product[]> {
    const query = Client
      .from('products')
      .select('id', 'name', 'price', 'color', 'year', 'instock')
      .where('id', req.params.id)

    return query
  }

  async deleteById (req: Request): Promise<number> {
    const query = Client
    .from('products')
    .where('id', req.params.id)
    .del()

    return query
  }

  async createProduct (req: Request): Promise<number[]> {
    const query = Client
    .from('products')
    .insert({
      name: req.body.name,
      price: req.body.price,
      year: req.body.year,
      color: req.body.color,
      instock: req.body.instock
    })

    return query
  }
}

export type ListProductsParams = {
  filter?: string
  limit?: number
  page?: number
}
