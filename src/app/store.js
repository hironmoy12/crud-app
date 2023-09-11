import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk Action to Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

// Async Thunk Action to Update a User
export const updateUsers = createAsyncThunk("users/updateUsers", async (updatedUser) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
  return response.data;
});

// Async Thunk Action to Delete a User
export const deleteUsers = createAsyncThunk("users/deleteUsers", async (userId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return userId;
});

// Async Thunk Action to Add a User
export const addUsers = createAsyncThunk("users/addUsers", async (newUser) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
  return response.data;
});

// Redux Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
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
      .addCase(updateUsers.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const existingUser = state.users.find((user) => user.id === updatedUser.id);
        if (existingUser) {
          Object.assign(existingUser, updatedUser);
        }
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.filter((user) => user.id !== userId);
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
