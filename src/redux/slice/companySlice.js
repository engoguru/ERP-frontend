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






export const companyDetailUpdate = createAsyncThunk(
  "company/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_URL}companyRegister/update/${id}`,
        payload,
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



export const createDepartment=createAsyncThunk(
  "company/createDepartment",
  async (departmentData,{isRejectedWithValue})=>{
      try {
        // console.log(departmentData,"p")
        const response = await axios.post(
        `${base_URL}department/create`,
        departmentData,
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

export const getDepartment=createAsyncThunk(
  "company/getDepartment",
  async (_,{isRejectedWithValue})=>{
      try {
        // console.log(departmentData,"p")
        const response = await axios.get(
        `${base_URL}department/viewAll`,
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


export const createRole=createAsyncThunk(
  "company/createRole",
  async (data,{isRejectedWithValue})=>{
      try {
        // console.log(departmentData,"p")
        const response = await axios.post(
        `${base_URL}role/create`,
        data,
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

export const getRole = createAsyncThunk(
  "company/getRole",
  async (departmentName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}role/viewViaDepartment`, {
        params: { departmentName }, // <-- send query param
        withCredentials: true,
      });
// console.log(response,"po")
      return response.data;
    } catch (error) {
      console.error("VIEW ERROR:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



const companySlice = createSlice({
  name: 'company',
  initialState: {
    company: null,
    companyConfigure: null,
    companyConfigureUpdateData: null,
    companyConfigureViewData: null,
    companyConfigureAdmin:null,

    companyDetailSpecific:null,

    updateCompanyData:null,
    newDepartment:null,
    viewAllDepartment:null,

    newRole:null,
    viewAllRole:null,
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






       .addCase(companyDetailUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyDetailUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.updateCompanyData = action.payload;
      })
      .addCase(companyDetailUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //  create department
     .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.newDepartment = action.payload;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


          //  viewAll department
     .addCase(getDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.viewAllDepartment = action.payload;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

          // create role
     .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.newRole = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

          //  viewAll role
     .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.viewAllRole = action.payload;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default companySlice.reducer;
