import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../utils/BaseUrl";

// ==================== THUNKS ====================

// Create Lead
export const createLead = createAsyncThunk(
  "lead/create",
  async (leadData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}lead/createInside`, leadData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Lead creation failed";
      return rejectWithValue(message);
    }
  }
);

// Fetch All Leads
// export const fetchLeads = createAsyncThunk(
//   "lead/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${base_URL}lead/view`, {
//         withCredentials: true,
//       });
//     //   console.log(response,"ll")
//       return response.data;
//     } catch (error) {
//       const message =
//         error.response?.data?.message || error.message || "Failed to fetch leads";
//       return rejectWithValue(message);
//     }
//   }
// );

export const fetchLeads = createAsyncThunk(
  "lead/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}lead/view`, {
        params,
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch leads";
      return rejectWithValue(message);
    }
  }
);


// Fetch Single Lead by ID
export const fetchOneLead = createAsyncThunk(
  "lead/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_URL}lead/view/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch lead";
      return rejectWithValue(message);
    }
  }
);

// Update Lead
export const updateLead = createAsyncThunk(
  "lead/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_URL}lead/update/${id}`, // your backend route
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Lead update failed";
      return rejectWithValue(message);
    }
  }
);

// Delete Lead
export const deleteLead = createAsyncThunk(
  "lead/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_URL}lead/delete/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Lead deletion failed";
      return rejectWithValue(message);
    }
  }
);

// bulk Assign

export const bulkAssign = createAsyncThunk(
  "lead/bulkAssign",
  async ({ leadIds, assignedTo }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}lead/assign`, { leadIds, assignedTo }, {
        withCredentials: true,
      });
      console.log(response, "gghrthgehgf")
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Lead deletion failed";
      return rejectWithValue(message);
    }
  })


const initialState = {
  leadCreated: null,
  leadAll: [],
  leadDetail: null,
  bulklead: null,
  loading: false,
  error: null,
  success: false,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    resetLeadState: (state) => {
      state.leadCreated = null;
      state.leadDetail = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE LEAD
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadCreated = action.payload.data;
        state.success = true;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // FETCH ALL LEADS
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leadAll = action.payload.data || [];
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ONE LEAD
      .addCase(fetchOneLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadDetail = action.payload.data;
      })
      .addCase(fetchOneLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE LEAD
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadDetail = action.payload.data;
        state.success = true;
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE LEAD
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = state.leads.filter(
          (lead) => lead._id !== action.meta.arg
        );
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // DELETE LEAD
      .addCase(bulkAssign.pending, (state) => {
        state.loading = true;
      })
      .addCase(bulkAssign.fulfilled, (state, action) => {
        state.loading = false;
        state.bulklead = action.payload.data;
      })
      .addCase(bulkAssign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const { resetLeadState } = leadSlice.actions;
export default leadSlice.reducer;
