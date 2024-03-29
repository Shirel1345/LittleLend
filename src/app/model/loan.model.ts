export interface Loan {
  id?: string;
  userId: string;
  phone: string;
  productName: string;
  startDate: Date;
  endDate: Date;
  paymentMethod: PaymentMethod;
  isApproved: LoanStatus;
  rate: number;
}

export interface CreateLoanDto {
  productId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  paymentMethod: PaymentMethod;
}

export enum PaymentMethod {
  Bit,
  Cash,
  Credit,
}

export enum LoanStatus {
  Pending = 0,
  Approved = 1,
  Reject = 2,
}
