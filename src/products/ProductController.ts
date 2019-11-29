import { ProductService, ListProductsParams, CreateProductParams } from "../service/ProductService"
import { Request, Response, NextFunction } from "express-serve-static-core"

interface ListProductsRequest extends Request {
  query: {
    filter?: string
    limit?: number
    page?: number
  }
}

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async listProducts (req: ListProductsRequest, res: Response, next: NextFunction) {
    const params: ListProductsParams = {
      filter: req.query.filter,
      limit: req.query.limit,
      page: req.query.page
    }

    const products = await this.productService.list(params)
    res.json({ products })
  }

  async listProductsById (req: Request, res: Response, next: NextFunction) {
    const product = await this.productService.listById(+req.params.id)
    if (!product) {
      return  res.status(404).json({
        status: 'Not found'
      })
    }
    res.send({ product })
  }

  async deleteProductById (req: Request, res: Response, next: NextFunction) {
    await this.productService.deleteById(+req.params.id)
    res.sendStatus(200)
  }

  async addProduct (req: Request, res: Response, next: NextFunction) {
    const params: CreateProductParams = {
      product: req.body.name,
      price: req.body.price,
      color: req.body.color,
      year: req.body.year,
      instock: req.body.instock
    }
    const product = await this.productService.createProduct(params)
    res.send({ product })
  }
}
