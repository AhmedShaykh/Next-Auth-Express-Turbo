import { FC } from "react";
import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Main: FC<any> = ({ session }) => {
    return (
        <div className="w-full h-screen flex justify-center flex-col">
            <div className="flex justify-center items-center ">
                <Image
                    src="/banner_img.svg"
                    width={550}
                    height={550}
                    alt="img"
                />
            </div>

            {session ? (
                <div className="flex justify-center items-center flex-col">
                    <h1 className="text-4xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                        Clash App
                    </h1>

                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-3">
                        Welcome {session?.user.name}
                    </p>

                    <Link href="/dashboard">
                        <Button className="mt-4 text-md">
                            Dashboard
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col">
                    <h1 className="text-4xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                        Clash App
                    </h1>

                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-3">
                        Discover the better choice, together.
                    </p>

                    <Link href="/login">
                        <Button className="mt-4 text-md">
                            Login
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
};

export default Main;