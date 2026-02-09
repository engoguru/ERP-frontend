import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";

// ----------------- Async Thunks -----------------

// 1️⃣ Create Employee
export const employeeCreate = createAsyncThunk(
    "employee/create",
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_URL}employee/create`, employeeData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

//  View Employees (with optional pagination: page & limit)
export const viewEmployees = createAsyncThunk(
    "employee/view",
    async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_URL}employee/view`, {
                params: { page, limit },
                withCredentials: true
            });


            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


//view employee Profile
export const viewEmployeesProfile = createAsyncThunk(
    "employee/profile",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_URL}employee/view/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
)




// 3️⃣ Get Employees by Reporting Manager (only _id and name)
export const employeesByManager = createAsyncThunk(
    "employee/reportingManager",
    async (name, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_URL}employee/reportingManager`, {
                params: { name },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



// Update Employees
export const employeesUPdate = createAsyncThunk(
  "employee/Update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_URL}employee/update/${id}`,
        data, //  FormData direct body
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);



// ----------------- Slice -----------------

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee: null,           // last created employee
        employeeList: [],         // list from /view
        managerEmployees: [],
        employeeProfile: null, 
        employeeUpdateData:null,   // list from /reportingManager
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetEmployee: (state) => {
            state.employee = null;
            state.employeeList = [];
            state.managerEmployees = [];
            state.employeeProfile = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // --- Create Employee ---
        builder
            .addCase(employeeCreate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(employeeCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.employee = action.payload.data || null;
                state.error = null;
            })
            .addCase(employeeCreate.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload?.message || "Something went wrong";
            });

        // --- View Employees ---
        builder
            .addCase(viewEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeList = action.payload.data || [];
                state.error = null;
            })


            .addCase(viewEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Error fetching employees";
            });


        // --- View Employees Profile---
        builder
            .addCase(viewEmployeesProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewEmployeesProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeProfile = action.payload.data || [];
                state.error = null;
            })


            .addCase(viewEmployeesProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Error fetching employees";
            });


        // --- Employees by Reporting Manager ---
        builder
            .addCase(employeesByManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeesByManager.fulfilled, (state, action) => {
                state.loading = false;
                state.managerEmployees = action.payload.data || [];
                state.error = null;
            })
            .addCase(employeesByManager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Error fetching employees by manager";
            });



               // --- Employees by Reporting Manager ---
        builder
            .addCase(employeesUPdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeesUPdate.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeUpdateData = action.payload.data || [];
                state.error = null;
            })
            .addCase(employeesUPdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Error fetching employees by manager";
            });
    },
});

export const { resetEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
