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

  async listById (id: number): Promise<Order> {
    try {
      const [order] = await this.client
        .from('orders')
        .select('*')
        .where('id', id)

        return order
    } catch (err) {
      if (err.code === '22P02') {
        throw new NoOrderError('There is no order with that ID in database')
      }
      throw err
    }
  }

  async deleteById (id: number): Promise<void> {
    await this.client
      .from('orders')
      .where('id', id)
      .del()
  }

  async create (params: CreateOrderParams) {
    try {
      const order = await this.client.transaction(async (trx): Promise<Order> => {
        const [order] = await this.client
          .into('orders')
          .transacting(trx)
          .insert({
            payment: params.payment
          })
          .returning('*')

        const orderItems = params.products.map(({ id: productId }) => ({
          orderid: order.id,
          productid: productId
        }))

        const orderProducts = await this.client
          .into('orderproduct')
          .transacting(trx)
          .insert(orderItems)
          .returning('*')

        return {
          ...order,
          orderProducts: orderProducts
        }
      })

      return order
    } catch (err) {
      if (+err.code === 23503) {
        throw new NoProductError('There is no product with that ID in database')
      }
        throw err
    }
  }
}

export class NoProductError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class NoOrderError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
