"use client";
import React, { FC, useState } from "react";
import LogoutModal from "./LogoutModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Link from "next/link";

const Navbar: FC<any> = ({ user }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <LogoutModal open={open} setOpen={setOpen} />

            <nav className="flex justify-between items-center px-16 py-8 w-full bg-zinc-900/40">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Clash App
                </h1>

                <div className="space-x-8">
                    <Link className="text-lg font-semibold" href="/dashboard">
                        Dashboard
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="px-6 py-3 border rounded-md">
                            <h1 className="text-lg font-semibold">
                                {user}
                            </h1>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="bottom">
                            <DropdownMenuLabel>
                                My Account
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={() => setOpen(true)}>
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </>
    )
};

export default Navbar;