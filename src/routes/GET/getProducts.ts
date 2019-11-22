import { RequestHandler } from "express";
import { client } from "../../app";

export const getProducts: RequestHandler = async (req, res, next) => {
  const { rows } = await client.query(`SELECT * FROM products`)
  res.send(rows)
}
