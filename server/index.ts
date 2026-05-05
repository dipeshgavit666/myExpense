import express, {
  type Request,
  type Response,
  type Application,
} from "express";
import { type IExpense } from "./src/types/index";
import { ExpenseCategory } from "./src/types/index";

const app: Application = express();
const PORT = 5000;

app.use(express.json());

export const fakeExpense: IExpense[] = [
  {
    id: "1",
    userId: "user_001",
    amount: 250,
    category: ExpenseCategory.FOOD,
    description: "Lunch at local restaurant",
    date: new Date("2026-04-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "user_001",
    amount: 1200,
    category: ExpenseCategory.SHOPPING,
    description: "Bought new headphones",
    date: new Date("2026-04-02"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    userId: "user_001",
    amount: 500,
    category: ExpenseCategory.TRANSPORT,
    description: "Fuel refill",
    date: new Date("2026-04-03"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    userId: "user_001",
    amount: 800,
    category: ExpenseCategory.ENTERTAINMENT,
    description: "Movie night",
    date: new Date("2026-04-04"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    userId: "user_001",
    amount: 1500,
    category: ExpenseCategory.GROCERIES,
    description: "Weekly grocery shopping",
    date: new Date("2026-04-05"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    userId: "user_001",
    amount: 300,
    category: ExpenseCategory.FOOD,
    description: "Dinner with friends",
    date: new Date("2026-04-06"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    userId: "user_001",
    amount: 2000,
    category: ExpenseCategory.BILLS,
    description: "Electricity bill",
    date: new Date("2026-04-07"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    userId: "user_001",
    amount: 750,
    category: ExpenseCategory.HEALTHCARE,
    description: "Pharmacy purchase",
    date: new Date("2026-04-08"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    userId: "user_001",
    amount: 1800,
    category: ExpenseCategory.SHOPPING,
    description: "New shoes",
    date: new Date("2026-04-09"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    userId: "user_001",
    amount: 400,
    category: ExpenseCategory.TRANSPORT,
    description: "Taxi rides",
    date: new Date("2026-04-10"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

app.get("/api/v1/expenses", (req: Request, res: Response) => {
  const response = {
    success: true,
    data: fakeExpense,
    message: "Expenses retives successfully",
  };

  res.status(200).json(response);
});

app.get("/api/v1/expenses/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const expense = fakeExpense.find((exp) => exp.id === id);

  if (!expense) {
    const response = {
      success: false,
      error: "Expense not found",
    };

    return res.status(404).json(response);
  }

  const response = {
    success: true,
    data: expense,
  };

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
