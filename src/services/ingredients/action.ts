import { getIngredients } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// addTask.pending   addTask.pending.type === "tasks/addTask/pending"
// addTask.fulfilled addTask.fulfilled.type === "tasks/addTask/fulfilled" payload = task
// addTask.rejected  addTask.rejected.type === "tasks/addTask/rejected" error?.message / payload =  "sfdsfsdf"

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  async () => {
      return getIngredients();
  }
);