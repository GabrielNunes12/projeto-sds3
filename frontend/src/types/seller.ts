export type Seller = {
  id: number;
  name: string;
}

export type Sales = {
  id: number;
  visited: number;
  deals: number;
  amount: number;
  date: string;
  seller: Seller;
}

export type SalePage = {
  content?: Sales[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size?: number;
  number: number;
  first: boolean;
  numberOfElements?: number;
  empty?: boolean;
}