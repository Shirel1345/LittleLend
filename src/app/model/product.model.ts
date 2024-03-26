export interface Product {
  id?: string;
  name: string;
  description: string;
  picture: string;
  category: string;
  categoryName: number;
  isReturnable: boolean;
  quantity: number;
  securityDepositRate: number;
  rates?: number[];
}
