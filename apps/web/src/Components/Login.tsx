"use client";
import React, { useEffect } from "react";
import { loginAction } from "@/app/actions/authActions";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const Login = () => {

    const initialState = {
        message: "",
        status: 0,
        errors: {},
        data: {}
    };

    const [state, formAction] = useFormState(loginAction, initialState);

    useEffect(() => {

        if (state.status === 500) {

            toast.error(state.message);

        } else if (state.status === 200) {

            toast.success(state.message);

            signIn("credentials", {
                email: state.data?.email,
                password: state.data?.password,
                redirect: true,
                callbackUrl: "/dashboard"
            });

        }

    }, [state]);

    return (
        <form action={formAction}>
            <div className="mt-4">
                <Label className="mb-3" htmlFor="email">
                    Email
                </Label>

                <Input
                    placeholder="Enter your email"
                    name="email"
                    type="email"
                />

                <span className="text-red-400">
                    {state.errors?.email}
                </span>
            </div>

            <div className="mt-4">
                <Label className="mb-3" htmlFor="password">
                    Password
                </Label>

                <Input
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                />

                <span className="text-red-400">
                    {state.errors?.password}
                </span>
            </div>

            <div className="mt-4">
                <SubmitButton />
            </div>
        </form>
    )
};

export default Login;