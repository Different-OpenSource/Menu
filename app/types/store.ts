export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  shortDescription: string;
  categoryId: string;
  itemOptions: ItemOption[];
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
  menuId: string;
}

export interface Menu {
  id: string;
  categories: Category[];
}

export interface Store {
  id: string;
  image: string;
  name: string;
  description: string;
  activeMenu: Menu | null;
}

export interface ItemOption {
  id: string;
  name: string;
  description: string | null;
  price: number;
}