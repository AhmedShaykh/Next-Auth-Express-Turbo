import { auth } from "./api/auth/[...nextauth]/auth";
import Main from "@/Components/Main";
import { redirect } from "next/navigation";

const Home = async () => {

    const session = await auth();

    if (session !== null) {

        redirect("/dashboard");

    }

    return <Main />
};

export default Home;