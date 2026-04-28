import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

export const sncRegister = createAsyncThunk(
  "snc/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}sncregister/register`, formData, {
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const allSncEligible = createAsyncThunk(
  "snc/eligible",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}sncregister/allEligible`, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      )
    }
  }
)

export const allSncId = createAsyncThunk(
  "snc/allId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}sncregister/sncId`)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      )
    }
  }
)

export const sncViewOne = createAsyncThunk(
  "snc/viewOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}sncregister/viewOne/${id}`,{
        withCredentials:true
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      )
    }
  }
)

export const sncUpdate=createAsyncThunk(
  "snc/update",
  async({ id, data },{rejectWithValue})=>{
    try {
      const response=await axios.put(`${base_URL}sncregister/update/${id}`,
        data,{
        withCredentials:true
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||"Something wrong"
      )
    }
  }
)

const initialState = {
  loading: false,
  error: null,
  sncData: null,
  sncEligibleData: [],
  sncIdData: [],
  sncViewOneDetail: null,
  sncUpdateData:null
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



      .addCase(allSncEligible.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(allSncEligible.fulfilled, (state, action) => {
        state.loading = false;
        state.sncEligibleData = action.payload
      })
      .addCase(allSncEligible.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


      .addCase(allSncId.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(allSncId.fulfilled, (state, action) => {
        state.loading = false;
        state.sncIdData = action.payload
      })
      .addCase(allSncId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


      .addCase(sncViewOne.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(sncViewOne.fulfilled, (state, action) => {
        state.loading = false;
        state.sncViewOneDetail = action.payload
      })
      .addCase(sncViewOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


.addCase(sncUpdate.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(sncUpdate.fulfilled, (state, action) => {
  state.loading = false;
  state.sncUpdateData = action.payload;
})
.addCase(sncUpdate.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  }
});

export default sncRegisterSlice.reducer;