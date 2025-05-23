import { auth } from "./api/auth/[...nextauth]/auth";
import Main from "@/Components/Main";

const Home = async () => {

    const session = await auth();

    return (
        <Main session={session} />
    )
};
export default Home;