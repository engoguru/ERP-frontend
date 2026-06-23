import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";


// ===================== CREATE PAYMENT =====================
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_URL}payment/create`,
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create payment"
      );
    }
  }
);


// ===================== GET ALL PAYMENTS =====================
export const fetchAllPayments = createAsyncThunk(
  "payment/fetchAllPayments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}payment/viewAllPayment/${id}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);


// ===================== INITIAL STATE =====================
const initialState = {
  loading: false,
  error: null,
  payment: null,
  paymentAll: [],
};


// ===================== SLICE =====================
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.payment = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------- CREATE PAYMENT ----------
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- FETCH ALL PAYMENTS ----------
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentAll = action.payload;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;