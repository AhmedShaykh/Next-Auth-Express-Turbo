"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { clearCache } from "@/app/actions/commonActions";
import { CLASH_URL } from "@/lib/apiEndPoints";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/Components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";

const DeleteClash = ({
    open,
    setOpen,
    token,
    id
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    token: string;
    id: number;
}) => {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        setLoading(true);

        axios.delete(`${CLASH_URL}/${id}`, {
            headers: { Authorization: token }
        }).then(() => {

            toast.success("Clash Deleted Successfully!");

            setLoading(false);

            clearCache("dashboard");

        }).catch((err) => {

            console.log(err);

            setLoading(false);

            toast.error("Something Went Wrong...");

        });

    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will delete the clash from our db permanantly.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={handleDelete} disabled={loading}>
                        {loading ? "Processing.." : "Yes Delete it!"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};

export default DeleteClash;