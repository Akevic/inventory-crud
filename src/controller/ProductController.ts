import { ProductService } from "../service/ProductService"
import { Request, Response, NextFunction } from "express-serve-static-core"

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async listProducts (req: Request, res: Response, next: NextFunction) {
    const products = await this.productService.list()
    res.json({ products })
  }

  async listProductsById (req: Request, res: Response, next: NextFunction) {
    const products = await this.productService.listById(req)
    res.send({ products })
  }

  async deleteProductById (req: Request, res: Response, next: NextFunction) {
    await this.productService.deleteById(req)
    res.send('success')
  }

  async addProduct (req: Request, res: Response, next: NextFunction) {
    const product = await this.productService.createProduct(req)
    res.send('success')
  }
}
