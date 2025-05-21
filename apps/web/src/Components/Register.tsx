"use client";
import React, { useEffect } from "react";
import { registerAction } from "@/app/actions/authActions";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const Register = () => {

    const initialState = {
        message: "",
        status: 0,
        errors: {}
    };

    const [state, formAction] = useFormState(registerAction, initialState);

    useEffect(() => {

        if (state.status === 404) {

            toast.error(state.message);

        } else if (state.status === 200) {

            toast.success(state.message);

        }

    }, [state]);

    return (
        <form action={formAction}>
            <div className="mt-4">
                <Label className="mb-3" htmlFor="name">
                    Name
                </Label>

                <Input
                    placeholder="Enter your name"
                    name="name"
                    type="text"
                />

                <span className="text-red-400">
                    {state.errors?.name}
                </span>
            </div>

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
                <Label className="mb-3" htmlFor="cpassword">
                    Confirm Password
                </Label>

                <Input
                    placeholder="Enter your confirm password"
                    name="confirm_password"
                    type="password"
                />

                <span className="text-red-400">
                    {state.errors?.confirm_password}
                </span>
            </div>

            <div className="mt-4">
                <SubmitButton />
            </div>
        </form>
    )
};

export default Register;