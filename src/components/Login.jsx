import React, { useState } from 'react';
import {  useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { Button, Input, Logo } from './index';
import { login as authLogin } from '../store/authSlice';// action-1



function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    console.log(register);
    const [error, setError] = useState("");

    // const login = async()=>{}  ---> isko handle submit m enter krenge

    const login = async (data) => {

        console.log(data);
        setError("");            // always remember to use this at first 
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log(userData);
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }        // last m user ko directly navigate kr denge home route pr 

        } catch (error) {
            setError(error.message);
        }

    }

    return (
        /* 1st : ADD LOGO */
        <div className='flex items-center justify-center w-full'>

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* important to use from in react hook form   */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            lable="Email:"
                            placeholder='Enter your email'
                            type="email"
                            {...register("email", {
                                required: true,       // **important for valid conditions 
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                        .test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            lable='Password:'
                            placeholder='Enter Password'
                            type="password"
                            {...register("password", { required: true })}
                        />
                        <Button type='submit' className='w-full' >
                            Sign In
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
};

export default Login;

