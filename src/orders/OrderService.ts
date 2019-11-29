import { Order } from './OrderModel'
import Knex from 'knex'

export type CreateOrderParams = {
  payment: string
  products: {
    id: number
    quantity: number
  }[]
}

export type ListOrdersParams = {
  filter?: string
  limit?: number
  page?: number
}

export class OrderService {
  constructor (private readonly client: Knex) {}

  async list (params?: ListOrdersParams) {
    let query = this.client
      .from('orders')
      .select('*')

      if (params?.filter) {
        query = query.where('payment', 'ilike', `%${params.filter}%`)
      }

      if (params?.limit) {
        query = query.limit(params.limit)
      }

      if (params?.page) {
        query = query.offset(params.page)
      }

      return query
  }

  async create (params: CreateOrderParams): Promise<Order> {
    const [order] = (await this.client
      .into('orders')
      .insert({
        payment: params.payment
      })
      .returning('*')) as {
        id: number
        payment: string | null
        orderdate: Date | null
      }[]

    const orderItems = params.products.map(({ id: productId }) => ({
      orderid: order.id,
      productid: productId
    }))

    const orderProducts = (await this.client
      // .debug(true)
      .into('orderproduct')
      .insert(orderItems)
      .returning(['id', 'orderid', 'productid'])) as {
        id: number
        orderid: number
        productid: number
      }[]

    return {
      ...order,
      // orderProducts: orderProducts.rows
      orderProducts: orderProducts
    }
  }
}
