"use client";
import { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import Image from "next/image";

function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {

        console.error(error);

    }, [error]);

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <Image
                src="/server_error.svg"
                width={500}
                height={500}
                alt="error"
            />

            <Button className="mt-7" onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
};

export default Error;