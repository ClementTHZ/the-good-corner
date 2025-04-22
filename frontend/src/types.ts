export type Category = {
  id: number;
  title: string;
};

export type Tag = {
  id: number;
  title: string;
};

export type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  city: string;
  category: number;
  tags: string[];
};

export type AdDetails = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  city: string;
  createdAt: Date;
  category: Category;
  tags: Tag[];
};
