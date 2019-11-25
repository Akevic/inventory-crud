import { Request } from "express-serve-static-core"
import { Client } from "pg"
import { Product } from "../model/ProductModel"
import { knex } from "../app"


export class ProductService {

  constructor (private readonly client: Client) {}

  async list (params?: ListProductsParams): Promise<Product[]> {
    let query = knex
      .from('products')
      .select('id', 'name', 'price', 'color', 'year', 'instock')

    if (params?.filter) {
        query = query.where('name', 'ilike', `%${params.filter}%`)
    }

    if (params?.limit) {
        query = query.limit(`${+params.limit}%`)
    }

    if (params?.page) {
      query = query.offset(`${+params.page}%`)
    }

    return query

  }

  async listById (req: Request): Promise<Product[]> {
    return knex
      .from('products')
      .select('id', 'name', 'price', 'color', 'year', 'instock')
      .where('id', req.params.id)
  }

  async deleteById (req: Request): Promise<Product[]> {
    return knex
      .from('products')
      .where('id', req.params.id)
      .del()
  }

  async createProduct (req: Request): Promise<Product[]> {
    return knex
      .from('products')
      .insert({
        name: req.body.name,
        price: req.body.price,
        year: req.body.year,
        color: req.body.color,
        instock: req.body.instock
      })
  }
}

export type ListProductsParams = {
  filter?: string
  limit?: number
  page?: number
}
