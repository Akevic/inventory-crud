export interface Order {
  id: number
  orderdate: Date | null
  payment: string | null
  orderProducts: OrderProduct[]
}

export interface OrderProduct {
  id: number
  orderid: number
  productid: number
}
