import { RequestHandler } from "express";
import { client } from "../../app";

// TODO: Ne radi, popravi!!!!

export const addProduct: RequestHandler = async (req, res, next) => {
  const row = await client.query(`INSERT INTO products (name, price, year, color, instock) VALUES (${req.body.name}, ${req.body.price}, ${req.body.year}, ${req.body.color}, ${req.body.instock})`)
  res.send('success')
  // res.send(`${req.query.name}, ${req.query.price}, ${req.query.year}, ${req.query.color}, ${req.query.instock}`)
  // res.send(req.body.instock)
}
