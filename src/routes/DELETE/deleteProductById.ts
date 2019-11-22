import { RequestHandler } from "express";
import { client } from "../../app";

export const deleteProductById: RequestHandler = async (req, res, next) => {
  const { rows } = await client.query(`DELETE FROM products WHERE id = ${req.params.id}`)
  res.send('success')
}
