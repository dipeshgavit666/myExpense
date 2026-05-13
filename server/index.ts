import express, {
  type Request,
  type Response,
  type Application,
} from "express";

import expenseRoutes from "./src/routes/expense.routes";
import authRoutes from "./src/routes/auth.routes";

const app: Application = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

app.use("/api/v1/expenses", expenseRoutes);

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
