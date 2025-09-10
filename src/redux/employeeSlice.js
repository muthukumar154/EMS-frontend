import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const res = await axios.get('http://localhost:9000/api/employee');
    return res.data;
});

export const getEmployee = createAsyncThunk('employee/getEmployee', async (id) => {
    const res = await axios.get(`http://localhost:9000/api/employee/${id}`);
    console.log(res.data);

    return res.data;
})

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id) => {
    const res = await axios.delete(`http://localhost:9000/api/employee/${id}`);
    return id;
})

export const addEmployee = createAsyncThunk("employee/addEmployee", async (formData, { rejectWithValue }) => {
    try {
        const res = await axios.post("http://localhost:9000/api/employee", formData, {
            headers:
            {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);

        return res.data;
    } catch (err) {
        console.log(err);

        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message);
        }
        return rejectWithValue(err.message);
    }
})

export const updateEmployee = createAsyncThunk("employee/updateEmployee", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const res = await axios.put(`http://localhost:9000/api/employee/${id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        return res.data;
    } catch (err) {
        console.log(err);

        if (err.response && err.response.data.message) {    
            return rejectWithValue(err.response.data.message);
        }
        return rejectWithValue(err.message);
    }
})

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        selectedEmployee: null,
        status: "idle"
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
            state.status = "success"
        })
        builder.addCase(getEmployee.fulfilled, (state, action) => {
            state.selectedEmployee = action.payload;
        })
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.employees = state.employees.filter(employee => employee.id !== action.payload);
        })
        builder.addCase(addEmployee.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.employees.unshift(action.payload);
            state.status = "success"
        })
        builder.addCase(addEmployee.rejected, (state) => {
            state.status = "failed"
        })

        builder.addCase(updateEmployee.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
            state.selectedEmployee = action.payload;
            state.status = "success"
        })
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;  
        })
    }
});

export default employeeSlice.reducer;