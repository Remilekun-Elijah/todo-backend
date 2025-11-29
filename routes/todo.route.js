import { Router } from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteSingleTodo,
  getAllTodos,
  getSingleTodo,
  updateTodoUsingPatch,
  updateTodoUsingPut,
} from "../controllers/todo.controller.js";

const router = new Router();

// create a new todo
router.post("/", createTodo);

// get all todos
router.get("/", getAllTodos);

// update a todo
router.put("/:id", updateTodoUsingPut);

// update a todo
router.patch("/:id", updateTodoUsingPatch);

// find a single todo
router.get("/:id", getSingleTodo);

// delete a todo
router.delete("/:id", deleteSingleTodo);

// delete all todos
router.delete("/", deleteAllTodos);

export default router;
