import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  status?: number;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  error: null,
};

// async thunk for login API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Login failed");
      }

      return true; // we only care about success for now
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
