import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { base_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const companyRegister = createAsyncThunk(
  'company/register',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}companyRegister/create`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const companyConfigures = createAsyncThunk(
  'company/Configure',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}companyConfigure/create`, companyData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const companyConfiguresUpdate = createAsyncThunk(
  'company/ConfigureUpdate',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_URL}companyConfigure/update`,
        companyData,
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const companyConfiguresView = createAsyncThunk(
  'company/ConfigureView',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}companyConfigure/view`,
        { withCredentials: true }
      );

      // console.log("RESPONSE:", response);
      return response.data;
    } catch (error) {
      console.error("VIEW ERROR:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);



export const companyConfiguresAdmin = createAsyncThunk(
  'company/ConfigureAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_URL}license/get`,
        { withCredentials: true }
      );

      // console.log("RESPONSE:", response);
      return response.data;
    } catch (error) {
      console.error("VIEW ERROR:", error);
      return rejectWithValue(error.response?.data);
    }
  }
)





export const companyDetailData=createAsyncThunk(
  "get/CompanyDetail",
  async(_,{isRejectedWithValue})=>{
    try {
        const response = await axios.get(
        `${base_URL}companyRegister/viewOne`,
        { withCredentials: true }
      );

      // console.log("RESPONSE:", response);
      return response.data;
    } catch (error) {
        console.error("VIEW ERROR:", error);
      return isRejectedWithValue(error.response?.data);
    }
  }
)











const companySlice = createSlice({
  name: 'company',
  initialState: {
    company: null,
    companyConfigure: null,
    companyConfigureUpdateData: null,
    companyConfigureViewData: null,
    companyConfigureAdmin:null,

    companyDetailSpecific:null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(companyRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(companyRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




      .addCase(companyConfigures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyConfigures.fulfilled, (state, action) => {
        state.loading = false;
        state.companyConfigure = action.payload.data;
      })
      .addCase(companyConfigures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(companyConfiguresView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyConfiguresView.fulfilled, (state, action) => {
        state.loading = false;
        state.companyConfigureViewData = action.payload;
      })
      .addCase(companyConfiguresView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




      
      .addCase(companyConfiguresAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyConfiguresAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.companyConfigureAdmin = action.payload;
      })
      .addCase(companyConfiguresAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(companyConfiguresUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyConfiguresUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.companyConfigureUpdateData = action.payload;
      })
      .addCase(companyConfiguresUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })





      
      .addCase(companyDetailData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyDetailData.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetailSpecific = action.payload;
      })
      .addCase(companyDetailData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default companySlice.reducer;
