import { OrderService, CreateOrderParams } from './OrderService'
import { Request, Response, NextFunction } from "express-serve-static-core"

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async createOrder (req: Request, res: Response, next: NextFunction) {
    const params: CreateOrderParams = {
      payment: req.body.payment,
      products: req.body.products || []
    }
    const order = await this.orderService.create(params)
    res.send({ order })
  }
}
