import { auth } from "../api/auth/[...nextauth]/auth";

const Dashboard = async () => {

    const session = await auth();

    return (
        <div className="container">
            {JSON.stringify(session)}
        </div>
    )
};

export default Dashboard;