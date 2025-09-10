import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, loginWithGoogle } from "../redux/authSlice";
import { toast } from "react-toastify";

const Login = () => {

    const dispatch = useDispatch();
    const { user, status, error } = useSelector((state) => state.auth)

    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            try {
                await dispatch(registerUser({ name, email, password })).unwrap();
                toast.success("Registration successful!");
                navigate('/dashboard');
            } catch (err) {
                console.error(err);
                toast.error("Eamil already used. Please login..!"); 
            }
        } else {
            try {
                await dispatch(loginUser({ email, password })).unwrap()
                toast.success("Login successful!");
                navigate('/dashboard')
            } catch (err) {
                console.log(err)
                toast.error("Email or Password invalid"); 
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginWithGoogle()).unwrap();
            navigate('/dashboard');
        } catch (err) {
            console.log("Google login failed:", err);
        }
    }


    return (
        <div className='w-full min-h-lvh'>
            <div className=' w-full max-w-xl mt-25 mx-auto shadow-md bg-[#FFFF]'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col p-5'>
                        <h1 className="text-center font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-black mb-6">
                            {isLogin ? "Radical Start" : "Become a Part Of Radical Start"}
                        </h1>
                        {!isLogin && (
                            <input
                                className='border border-solid border-black p-1.5 rounded-sm mb-3'
                                type="text"
                                placeholder='Full Name'
                                value={name}
                                onChange={(e) => setName(e.target.value.trimStart())} />
                        )}
                        <input
                            className='border border-solid border-black p-1.5 rounded-sm mb-3'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <div className="relative mb-3">
                            <input
                                className="border border-solid border-black p-1.5 rounded-sm w-full pr-10"
                                type={hidePassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    const password = e.target.value.trimStart();
                                    setPassword(password)
                                    if (password.length < 6) {
                                        setErrMessage("Password must be at least 6 character")
                                    } else {
                                        setErrMessage("")
                                    }
                                }}
                            />
                            <div className='absolute right-4 top-[19px] transform -translate-y-1/2' onClick={(e) => setHidePassword(!hidePassword)}>
                                {hidePassword ? <FaEyeSlash className="text-gray-500 cursor-pointer" /> : <FaEye className="text-gray-500 cursor-pointer" />}
                            </div>
                            <p className='text-md text-red-600'>{errMessage}</p>
                        </div>
                        <p className='text-md'>{message}</p>
                        <button type="submit" className="bg-black text-white w-full py-2.5 mb-3 rounded cursor-pointer">{isLogin ? "Login" : "Register"}</button>
                        <button
                            type='button'
                            className='w-full bg-blue-500 text-white py-2 rounded mb-2 flex gap-2 items-center justify-center cursor-pointer'
                            onClick={handleLogin}>
                            <FcGoogle size={25} />
                            <p>Continue with Google</p>
                        </button>
                        <div className='flex justify-center gap-1'>
                            <h1 className='text-md'>{isLogin ? "New here?" : "Already have an account?"}</h1>
                            <button
                                type='button'
                                className='text-blue-500 underline cursor-pointer'
                                onClick={(e) => {
                                    setIsLogin(!isLogin);
                                    setEmail("");
                                    setPassword("")
                                }}>
                                {isLogin ? "Create account" : "Login"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login