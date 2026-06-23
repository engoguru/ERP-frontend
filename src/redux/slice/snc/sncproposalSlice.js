import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../utils/BaseUrl";


// ================= CREATE PROPOSAL =================

export const createProposal = createAsyncThunk(
    "sncproposal/createProposal",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${base_URL}sncProposal/create`,
                data,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                "Failed to create proposal"
            );
        }
    }
);


// ================= USER PROPOSALS =================

export const viewAllPerUserProposal = createAsyncThunk(
    "sncproposal/viewAllPerUserProposal",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${base_URL}sncProposal/perUser/${id}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                "Failed to fetch proposals"
            );
        }
    }
);


// ================= SINGLE PROPOSAL =================

export const viewOneProposal = createAsyncThunk(
    "sncproposal/viewOneProposal",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${base_URL}sncProposal/${id}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                "Failed to fetch proposal"
            );
        }
    }
);


// ================= DELETE PROPOSAL =================

export const deleteProposal = createAsyncThunk(
    "sncproposal/deleteProposal",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${base_URL}sncProposal/${id}`,
                {
                    withCredentials: true,
                }
            );

            return {
                ...response.data,
                deletedId: id,
            };
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                "Failed to delete proposal"
            );
        }
    }
);


// ================= UPDATE PROPOSAL =================

export const updateProposal = createAsyncThunk(
    "sncproposal/updateProposal",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${base_URL}sncProposal/${id}`,
                data,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                "Failed to update proposal"
            );
        }
    }
);


// ================= INITIAL STATE =================

const initialState = {
    loading: false,
    proposal: null,
    userProposal: [],
    error: null,
    success: false,
};


// ================= SLICE =================

const sncproposalSlice = createSlice({
    name: "sncproposal",
    initialState,

    reducers: {
        clearProposalState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },

        clearSelectedProposal: (state) => {
            state.proposal = null;
        },
    },

    extraReducers: (builder) => {

        builder

            // CREATE
            .addCase(createProposal.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createProposal.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.proposal = action.payload;
            })
            .addCase(createProposal.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // GET ALL USER PROPOSALS
            .addCase(viewAllPerUserProposal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewAllPerUserProposal.fulfilled, (state, action) => {
                state.loading = false;
                state.userProposal = action.payload?.data || [];
            })
            .addCase(viewAllPerUserProposal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET ONE
            .addCase(viewOneProposal.pending, (state) => {
                state.loading = true;
            })
            .addCase(viewOneProposal.fulfilled, (state, action) => {
                state.loading = false;
                state.proposal = action.payload?.data;
            })
            .addCase(viewOneProposal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE
            .addCase(updateProposal.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProposal.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.proposal = action.payload?.data;
            })
            .addCase(updateProposal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE
            .addCase(deleteProposal.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProposal.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.userProposal = state.userProposal.filter(
                    (item) => item._id !== action.payload.deletedId
                );
            })
            .addCase(deleteProposal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearProposalState,
    clearSelectedProposal,
} = sncproposalSlice.actions;

export default sncproposalSlice.reducer;