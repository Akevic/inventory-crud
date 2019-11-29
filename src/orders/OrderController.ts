import { OrderService, CreateOrderParams, ListOrdersParams } from './OrderService'
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
    const order = await this.orderService.listById(+req.params.id)

    if (!order) {
      return
    }

    res.send(order)
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
    const order = await this.orderService.create(params)
    res.send({ order })
  }
}
