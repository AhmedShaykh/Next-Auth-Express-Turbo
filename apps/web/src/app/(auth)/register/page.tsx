import Register from "@/Components/Register";;
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full px-10 md:w-[550px] shadow-md rounded-xl py-5 bg-zinc-900/40">
                <div>
                    <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                        Clash
                    </h1>

                    <h1 className="text-3xl text-center font-bold my-2">
                        Register
                    </h1>
                </div>

                <Register />

                <p className="text-center mt-2">
                    Already have an account ?{" "}

                    <strong>
                        <Link href="/login">
                            Login
                        </Link>
                    </strong>
                </p>
            </div>
        </div>
    )
};

export default RegisterPage;