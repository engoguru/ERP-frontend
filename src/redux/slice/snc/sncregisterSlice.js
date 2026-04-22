import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

export const sncRegister = createAsyncThunk(
  "snc/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}sncregister/register`, formData,{
        withCredentials:true
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const allSncEligible=createAsyncThunk(
  "snc/eligible",
  async(_,{rejectWithValue})=>{
    try {
      const response=await axios.get(`${base_URL}sncregister/allEligible`,{
        withCredentials:true
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message||"Something went wrong"
      )
    }
  }
)

const initialState = {
  loading: false,
  error: null,
  sncData: null,
  sncEligibleData:[]
};

const sncRegisterSlice = createSlice({
  name: "sncRegister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(sncRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Fulfilled
      .addCase(sncRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.sncData = action.payload;
      })

      // Rejected
      .addCase(sncRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(allSncEligible.pending,(state)=>{
        state.loading=true;
        state.null=false
      })
      .addCase(allSncEligible.fulfilled,(state,action)=>{
        state.loading=false;
        state.sncEligibleData=action.payload
      })
      .addCase(allSncEligible.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
      })
  }
});

export default sncRegisterSlice.reducer;