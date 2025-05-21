import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Login from "@/Components/Login";
import { redirect } from "next/navigation";
import Link from "next/link";

const LoginPage = async () => {

    const session = await auth();

    if (session !== null) {

        redirect("/dashboard");

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full px-10 md:w-[550px] shadow-md rounded-xl py-5 bg-zinc-900/40">
                <div>
                    <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                        Clash
                    </h1>

                    <h1 className="text-3xl text-center font-bold my-2">
                        Login
                    </h1>
                </div>

                <Login />

                <p className="text-center mt-2">
                    Don't have an account ?{" "}

                    <strong>
                        <Link href="/register">
                            Register
                        </Link>
                    </strong>
                </p>
            </div>
        </div>
    )
};

export default LoginPage;