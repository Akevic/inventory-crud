import { Product } from "./ProductModel"
import Knex from 'knex'

export type ListProductsParams = {
  filter?: string
  limit?: number
  page?: number
}

export type CreateProductParams = {
  product: string
  price: number
  year: number
  color: number
  instock: boolean
}

export class ProductService {

  constructor (private readonly client: Knex) {}

  async list (params?: ListProductsParams): Promise<Product[]> {
    let query = this.client
      .from('products')
      .select('id', 'product', 'price', 'color', 'year', 'instock')

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

  async listById (id: number): Promise<Product | undefined> {
    const [product] = await this.client
      .from('products')
      .select('id', 'product', 'price', 'color', 'year', 'instock')
      .where('id', id)

    return product
  }

  async deleteById (id: number): Promise<void> {
    await this.client
      .from('products')
      .where('id',id)
      .del()
  }

  async createProduct (params: CreateProductParams): Promise<Product> {
    const [product] = await this.client
      .into('products')
      .insert(params)
      .returning('*')

    return product
  }
}
