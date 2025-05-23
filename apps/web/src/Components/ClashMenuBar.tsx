"use client";
import React, { Suspense, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { ClashType } from "@/lib/types";
import DeleteClash from "./DeleteClash";
import Env from "@/lib/env";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Link from "next/link";

const EditClash = dynamic(() => import("./EditClash"));

const ClashMenuBar = ({
    clash,
    token
}: {
    clash: ClashType;
    token: string;
}) => {

    const [open, setOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);

    const handleCopy = () => {

        navigator.clipboard?.writeText(`${Env.APP_URL}/clash/${clash.id}`);

        toast.success("Link copied successfully!");

    };

    return (
        <>
            <DeleteClash
                open={open}
                setOpen={setOpen}
                token={token}
                id={clash.id}
            />

            <Suspense fallback={<p>Loading....</p>}>
                {editOpen && (
                    <EditClash
                        token={token}
                        open={editOpen}
                        setOpen={setEditOpen}
                        clash={clash}
                    />
                )}
            </Suspense>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleCopy}>
                        Copy Link
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleCopy}>
                        <Link
                            href={`/clash/${clash.id}`}
                            target="_blank"
                        >
                            Open Page
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
};

export default ClashMenuBar;