import { RequestHandler } from "express";
import { client } from "../../app";

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { rows } = await client.query(`DELETE FROM products WHERE ${req.query.propname} = '${req.query.propvalue}'`)
  res.send('success')
}
