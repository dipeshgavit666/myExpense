import { Router, type Request, type Response } from "express";
import { type IExpense } from "../types/index";
import {
  createNewExpense,
  deleteSingleExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
} from "../controllers/expense.controller";

const router = Router();

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", createNewExpense);
router.put("/:id", updateExpenseById);
router.delete("/:id", deleteSingleExpense);

export default router;
