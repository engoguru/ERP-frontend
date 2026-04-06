import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../utils/BaseUrl";

// Create Register slice


export const registerCamp = createAsyncThunk(
    "camp/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${base_URL}treat/create`,
                formData,
                { withCredentials: true }
            );

            return response.data; // { success: true, data: ... }
        } catch (error) {
            console.error("Axios error:", error);

            // Return server error payload if available
            return rejectWithValue(
                error.response?.data || { success: false, message: "Something went wrong" }
            );
        }
    }
);


export const getAllCamp = createAsyncThunk(
    "camp/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_URL}treat/getAll`, {
                withCredentials: true
            })

            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data || { success: false, message: "Something went wrong" }
            );
        }
    }
)


export const getCampOne = createAsyncThunk(
    "camp/getOne",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_URL}treat/get/${id}`);
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data || { success: false, message: "Something went wrong" }
            )
        }
    }
)

export const updateCamp = createAsyncThunk(
  "camp/update",
  async ({ id, finalData }, { rejectWithValue }) => {
    try {
     
      // Send the actual object instead of wrapping in { finalData }
      const response = await axios.put(`${base_URL}treat/update/${id}`, finalData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { success: false, message: "Something went wrong" }
      );
    }
  }
);


const initialState = {
    loading: false,
    camp: null,
    AllCamp: [],
    oneCamp: null,
    campUpdate: null,
    error: null
}

const campSlice = createSlice({
    name: "camp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerCamp.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerCamp.fulfilled, (state, action) => {
                state.loading = false;
                state.camp = action.payload;
            })
            .addCase(registerCamp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




            .addCase(getAllCamp.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCamp.fulfilled, (state, action) => {
                state.loading = false;
                state.AllCamp = action.payload
            })
            .addCase(getAllCamp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


            .addCase(getCampOne.pending, (state) => {
                state.loading = true
            })
            .addCase(getCampOne.fulfilled, (state, action) => {
                state.loading = false;
                state.oneCamp = action.payload

            })
            .addCase(getCampOne.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })



            .addCase(updateCamp.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCamp.fulfilled, (state, action) => {
                state.loading = true,
                    state.campUpdate = action.payload
            })
            .addCase(updateCamp.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})

export default campSlice.reducer;