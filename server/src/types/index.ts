export enum ExpenseCategory {
  FOOD = "Food",
  TRANSPORT = "Transport",
  UTILITES = "Utilities",
  HEALTHCARE = "HealthCare",
  SHOPPING = "Shopping",
  EDUCATION = "Education",
  RENT = "Rent",
  ENTERTAINMENT = "Entertainment",
  OTHER = "Other",
  GROCERIES = "GROCERIES",
  BILLS = "BILLS",
}

export interface IExpense {
  id: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
