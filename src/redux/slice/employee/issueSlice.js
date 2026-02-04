import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

/* ================= CREATE ISSUE ================= */
export const createIssue = createAsyncThunk(
  "issue/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_URL}issue/create`,
        payload,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= VIEW ALL ISSUES ================= */
export const viewIssue = createAsyncThunk(
  "issue/view",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}issue/view`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= UPDATE ISSUE ================= */
export const updateIssue = createAsyncThunk(
  "issue/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_URL}issue/update/${id}`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= SLICE ================= */
const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issues: [],
    issueOne: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearIssueState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.unshift(action.payload.data);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* VIEW ALL */
      .addCase(viewIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload.data;
      })
      .addCase(viewIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;

        state.issues = state.issues.map((issue) =>
          issue._id === updated._id ? updated : issue
        );

        if (state.issueOne?._id === updated._id) {
          state.issueOne = updated;
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearIssueState } = issueSlice.actions;
export default issueSlice.reducer;
