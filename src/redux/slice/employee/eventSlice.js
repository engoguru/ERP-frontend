import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

/* ================= CREATE EVENT ================= */

export const createEvent = createAsyncThunk(
  "event/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${base_URL}event/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Event creation failed"
      );
    }
  }
);

/* ================= VIEW EVENTS ================= */

export const viewEvent = createAsyncThunk(
  "event/view",
 async ({ page = 1, limit = 100 } = {}, { rejectWithValue }) => {
    
    try {
   
      const res = await axios.get(`${base_URL}event/view`, {
        params: { page, limit },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching events failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: null,
    success: false,

    event: null,      // single created event
    eventAll: [],       // event list
    total: 0,
  },

  reducers: {
    resetEventState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.event = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== CREATE EVENT ===== */
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.event = action.payload.data;
      })

      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      /* ===== VIEW EVENTS ===== */
      .addCase(viewEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(viewEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.eventAll = action.payload.data;
        state.total = action.payload.total || 0;
      })

      .addCase(viewEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
