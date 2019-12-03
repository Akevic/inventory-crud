import { OrderService, CreateOrderParams, ListOrdersParams, NoProductError, NoOrderError } from './OrderService'
import { Request, Response, NextFunction } from "express-serve-static-core"

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async listOrders (req: Request, res: Response, next: NextFunction) {
    const params: ListOrdersParams = {
      filter: req.query.filter,
      limit: req.query.limit,
      page: req.query.page
    }

    const orders = await this.orderService.list(params)
    res.json({ orders })
  }

  async listOrderById (req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.orderService.listById(+req.params.id)

      if (!order) {
        res.status(400).json({
          status: 'Error',
          statusCode: 400,
          message: 'There is no order with that ID in database'
        })
      }
      res.send(order)

    } catch (err) {
      if (err instanceof NoOrderError) {
        res.status(400).json({
          status: 'Error',
          statusCode: 400,
          message: 'ID can contain only numbers'
        })
      } else {
        throw err
      }
    }
  }

  async deleteOrderById (req: Request, res: Response, next: NextFunction) {
    await this.orderService.deleteById(+req.params.id)
    res.sendStatus(200)
  }

  async createOrder (req: Request, res: Response, next: NextFunction) {
    const params: CreateOrderParams = {
      payment: req.body.payment,
      products: req.body.products || []
    }

    try {
      const order = await this.orderService.create(params)
      res.send({ order })
    } catch (err) {
      if (err instanceof NoProductError) {
        res.status(400).json({
          status: 'Error',
          statusCode: 400,
          message: 'There is no product with that ID in database'
        })
      } else {
        throw err
      }
    }
  }
}
