import { api } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  api.getIngredients
);