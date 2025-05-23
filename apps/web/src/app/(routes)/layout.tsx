import { auth } from "../api/auth/[...nextauth]/auth";
import Navbar from "@/Components/Navbar";

const RoutesLayout = async ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const session = await auth();

    return (
        <div className="container">
            <Navbar user={session?.user.name} />
            {children}
        </div>
    )
};

export default RoutesLayout;