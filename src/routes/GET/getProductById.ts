import { RequestHandler } from "express";
import { client } from "../../app";

export const getProductById: RequestHandler = async (req, res, next) => {
  const { rows } = await client.query(`SELECT * FROM products WHERE id = ${req.params.id}`)
  res.send(rows)
}
