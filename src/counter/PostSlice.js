// src/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (userId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return userId;
  }
);

export const addUsers = createAsyncThunk("users/addUsers", async (userData) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    userData
  );
  return response.data;
});

export const updateUsers = createAsyncThunk(
  "users/updateUsers",
  async (updatedUser) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
      updatedUser
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        const deletedUserId = action.payload;
        state.users = state.users.filter((user) => user.id !== deletedUserId);
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
