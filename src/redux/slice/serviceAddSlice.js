import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { base_URL } from "../../utils/BaseUrl";
import axios from "axios";

//==================== THUNKS ====================

export const createService=createAsyncThunk(
    "service/create",
    async({id,data},{rejectWithValue})=>{
        try {
            const response=await axios.post(`${base_URL}service/create/${id}`,
                data,
                {withCredentials:true}
            )
            return response.data
        } catch (error) {
           console.log(error)
            return rejectWithValue(
                error.response?.data || {success:false,message:"Something went wrong"}
            )
        }
    }
)


export const viewOneService=createAsyncThunk(
    "service/viewOne",
    async(id,{rejectWithValue})=>{
        try {
            const response=await axios.get(`${base_URL}service/getOne/${id}`,{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                 error.response?.data || { success: false, message: "Something went wrong" }
            ) 
        }
    }
)


export const getAllService=createAsyncThunk(
    "service/getAll",
    async(id,{rejectWithValue})=>{
        try {
            const  response=await axios.get(`${base_URL}service/getAll/${id}`,{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data || {success:false,message:"Something went wrong"}
            )
        }
    }
)


export const updateServices=createAsyncThunk(
    "service/update",
    async({id,data},{rejectWithValue})=>{
    try {
        const response=await axios.put(`${base_URL}service/update/${id}`,   data,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(
            error.response?.data||{success:false,message:"Something went wrong"}
        )
    }
    }
)

const initialState={
    service:null,
    oneservice:null,
    AllService:[],
    updateService:null,
    loading:false,
    error:null

}

const serviceAddSlice=createSlice({
    name:"serviceAdd",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createService.pending,(state)=>{
            state.loading=true
        })
        .addCase(createService.fulfilled,(state,action)=>{
            state.loading=false
            state.service=action.payload
        })
        .addCase(createService.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(viewOneService.pending,(state)=>{
            state.loading=true
        })
        .addCase(viewOneService.fulfilled,(state,action)=>{
            state.loading=false,
            state.oneservice=action.payload
        })
        .addCase(viewOneService.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })


        .addCase(getAllService.pending,(state)=>{
            state.loading=true
        })
        .addCase(getAllService.fulfilled,(state,action)=>{
            state.loading=false,
            state.AllService=action.payload
        })
        .addCase(getAllService.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })



        .addCase(updateServices.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateServices.fulfilled,(state,action)=>{
            state.loading=true,
            state.updateService=action.payload
        })
        .addCase(updateServices.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })

    }
})
export default serviceAddSlice.reducer
