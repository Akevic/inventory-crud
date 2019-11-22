import { RequestHandler } from "express";
import { client } from "../../app";

export const getProductByName: RequestHandler = async (req, res, next) => {
  const { rows } = await client.query(`SELECT * FROM products WHERE name = ${req.params.name}`)
  res.send(rows)
}
