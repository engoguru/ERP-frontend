import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

// ========================
// Async Thunks
// ========================

// Create a new leave
export const createLeave = createAsyncThunk(
    "leave/createLeave",
    async (leaveData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_URL}leaves/create`, leaveData, {
                withCredentials: true,
            });
            return response.data; // returned data will be in payload
        } catch (error) {
            // return error message
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Fetch all leaves for an employee
export const viewLeave = createAsyncThunk(
    "leave/viewLeave",
    async (employeeId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_URL}leaves/view`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);


// fetch one by id 
export const viewOneLeave = createAsyncThunk(
    "leave/viewOneLeave",
    async (employeeId, { rejectWithValue }) => {
        try {
            console.log(employeeId)
            const response = await axios.get(`${base_URL}leaves/view/${employeeId}`, {
                withCredentials: true
            });
            console.log(response,"v")
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
)

export const updateLeave = createAsyncThunk(
  "leaves/updateLeave",
  async ({ id, status }, { rejectWithValue }) => {
    console.log(status,"oioi")
    try {
      const response = await axios.put(
        `${base_URL}leaves/update/${id}`,
        { status },
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

// ========================
// Slice
// ========================

const initialState = {
    leaves: [],
    leavesOne: null,
    loading: false,
    error: null,
    success: false,
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        resetLeaveState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // ----- Create Leave -----
        builder.addCase(createLeave.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createLeave.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.leaves.push(action.payload); // add new leave to list
        });
        builder.addCase(createLeave.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // ----- View Leaves -----
        builder.addCase(viewLeave.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(viewLeave.fulfilled, (state, action) => {
            state.loading = false;
            state.leaves = action.payload; // replace with fetched leaves
        });
        builder.addCase(viewLeave.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });






        builder.addCase(viewOneLeave.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(viewOneLeave.fulfilled, (state, action) => {
            state.loading = false;
            state.leavesOne = action.payload; // replace with fetched leaves
        });
        builder.addCase(viewOneLeave.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { resetLeaveState } = leaveSlice.actions;
export default leaveSlice.reducer;
