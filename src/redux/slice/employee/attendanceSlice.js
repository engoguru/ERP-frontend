import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

/* ================= CREATE ATTENDANCE ================= */
export const createAttendance = createAsyncThunk(
  "attendance/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${base_URL}attendance/create`,
        payload,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Attendance creation failed"
      );
    }
  }
);

/* ================= VIEW ATTENDANCE (MONTH / YEAR WISE) ================= */
export const viewAttendance = createAsyncThunk(
  "attendance/view",
  async ({ employeeId, year }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${base_URL}attendance/view/${employeeId}`,
        {
          params: { year }, // year optional
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Attendance fetch failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    loading: false,
    error: null,
    success: false,
    attendanceSummary: [], // month-wise response
  },
  reducers: {
    resetAttendanceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* VIEW */
      .addCase(viewAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceSummary = action.payload.data;
      })
      .addCase(viewAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAttendanceState } = attendanceSlice.actions;
export default attendanceSlice.reducer;
