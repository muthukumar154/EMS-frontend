import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, provider } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, updateProfile } from "firebase/auth";

export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, name, password }, { rejectWithValue }) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
            await updateProfile(res.user, { displayName: name });
        }
        return {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
        };
    } catch (err) {
        return rejectWithValue(err.message);
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
        };

    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (_, { rejectWithValue }) => {
    try {
        const res = await signInWithPopup(auth, provider);
        console.log(res.user);

        return {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        };
    } catch (err) {
        return rejectWithValue(err.message);
    }
})
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
        return null;
    } catch (err) {
        return rejectWithValue(err.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            console.log("action",action.payload);
            
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.status = "idle";
        });
    }
})


export const { setUser } = authSlice.actions;
export default authSlice.reducer;