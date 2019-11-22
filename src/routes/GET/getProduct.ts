import { RequestHandler } from "express";
import { client } from "../../app";

export const getProduct: RequestHandler = async (req, res, next) => {
  const { rows } = await client.query(`SELECT * FROM products WHERE ${req.query.propname} = '${req.query.propvalue}'`)
  res.send(rows)
}
