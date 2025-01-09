export type Product = {
  id: string;
  quantity: number;
};

export type ProductResponse = {
  id: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  brand: {
    id: string;
    name: string;
  };
};
