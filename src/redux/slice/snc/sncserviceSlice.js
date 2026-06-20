import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

// CREATE SERVICE
export const sncServiceCreate = createAsyncThunk(
  "sncService/create",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(data, "opo"); // should now show FormData

    try {
      const response = await axios.post(
        `${base_URL}sncService/create/${id}`,
        data, // ✅ send directly, NOT { data }
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
// VIEW ONE SERVICE
export const sncServiceViewAllByUser = createAsyncThunk(
  "sncService/ViewAllByUser",
  async (id, { rejectWithValue }) => {

    try {
      const response = await axios.get(
        `${base_URL}sncService/snc/userService/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// USER DETAIL
export const sncUserDetail = createAsyncThunk(
  "sncService/userDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}sncService/sncUser/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const sncServiceViewOne = createAsyncThunk(
  "sncService/viewOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}sncService/viewOne/${id}`, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
)

export const sncServiceUpdateOne = createAsyncThunk(
  "sncService/updateOne",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${base_URL}sncService/updateService/${id}`, data, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }

  }
)

export const sncServiceViewAssigned = createAsyncThunk(
  "sncService/viewAssigned",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}sncService/services/assigned/${id}`, {
        withCredentials: true
      })
      return response.data
    }
    catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
)


const initialState = {
  loading: false,
  error: null,
  sncServiceCreateData: null,
  sncUserData: null,
  sncServiceOne: null,
  sncServiceOneDetail: null,
  sncServiceUpdateOneData: null,
  sncServiceAssignedData: null
};

const sncServiceSlice = createSlice({
  name: "sncService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(sncServiceCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sncServiceCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.sncServiceCreateData = action.payload;
      })
      .addCase(sncServiceCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VIEW ONE
      .addCase(sncServiceViewAllByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sncServiceViewAllByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.sncServiceOne = action.payload;
      })
      .addCase(sncServiceViewAllByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // USER DETAIL
      .addCase(sncUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sncUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.sncUserData = action.payload;
      })
      .addCase(sncUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(sncServiceViewOne.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sncServiceViewOne.fulfilled, (state, action) => {
        state.loading = false;
        state.sncServiceOneDetail = action.payload
      })
      .addCase(sncServiceViewOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })



      .addCase(sncServiceUpdateOne.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(sncServiceUpdateOne.fulfilled, (state, action) => {
        state.loading = false;
        state.sncServiceUpdateOneData = action.payload
      })
      .addCase(sncServiceUpdateOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      // assigned
      .addCase(sncServiceViewAssigned.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(sncServiceViewAssigned.fulfilled, (state, action) => {
        state.loading = false;
        state.sncServiceAssignedData = action.payload
      })
      .addCase(sncServiceViewAssigned.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      ;
  },
});

export default sncServiceSlice.reducer;