CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name varchar,
  price int,
  year int,
  color int,
  inStock Boolean
)

CREATE TABLE IF NOT EXISTS productorder (
  id serial PRIMARY KEY,
  product varchar,
  orderDate TIMESTAMP,
  payment VARCHAR
)
