import { RequestHandler } from "express";
import { client } from "../../app";

export const addProduct: RequestHandler = async (req, res, next) => {
  await client.query(`INSERT INTO products (name, price, year, color, instock) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.year}', '${req.body.color}', '${req.body.instock}')`)
  res.send('success')
}
