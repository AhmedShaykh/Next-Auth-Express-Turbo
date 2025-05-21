"use client";
import { Button } from "@/Components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {

    const { pending } = useFormStatus();

    return (
        <Button className="w-full" disabled={pending}>
            {pending ? "Processing..." : "Submit"}
        </Button>
    )
};

export default SubmitButton;