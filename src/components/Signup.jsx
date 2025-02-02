import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlicer";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const siginup = async (data) => {
        try {
            setError("");
            setIsLoading(true);
            console.log(data);
            const session = await authService.createAccout(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
            setIsLoading(false);

        } catch (error) {
            setError(error.message);
            setIsLoading(false);


        }
    };
    return <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center"> {error}</p>}
            <form onSubmit={handleSubmit(siginup)}>
                <Input
                    label="Full Name: "
                    placeholder="Enter your name"

                    {...register("name", {
                        required: true,

                    })}
                />
                <Input
                    label="Email: "
                    placeholder="Enter your email"

                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                        }
                    })}
                />
                <Input
                    label="Password: "
                    type="Password"
                    placeholder="Enter your password"

                    {...register("password", {
                        required: true,

                    })}

                />
                <Button
                    isLoading={isLoading}
                    type="submit" className="w-full mt-4 hover:">
                    Create Account
                </Button>
            </form>
        </div>
    </div>
}

export default Signup;
