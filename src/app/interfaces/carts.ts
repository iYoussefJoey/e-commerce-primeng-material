export interface Carts {
    numOfCartItems: number;
    data: Data;
  }
  
  export interface Data {
    totalCartPrice: number;
    _id:string;
    products: Product[];
  }
  
  export interface Product {
    price: number;
    count: number;
    product: SingleProduct;
  }
  
  export interface SingleProduct {
    imageCover: string;
    ratingsAverage: number;
    title: string;
    inventoryStatus?: string;
    category: Category;
    id: string;
  }
  
  export interface Category {
    name: string;
  }
  