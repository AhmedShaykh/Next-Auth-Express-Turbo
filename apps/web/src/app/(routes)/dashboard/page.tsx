import { auth } from "@/app/api/auth/[...nextauth]/auth";
import ClashCard from "@/Components/ClashCard";
import { fetchClashs } from "@/lib/clashFetch";
import AddClash from "@/Components/AddClash";
import { ClashType } from "@/lib/types";

const Dashboard = async () => {

    const session = await auth();

    const clashs: Array<ClashType> | [] = await fetchClashs(

        session?.user?.token!

    );

    return (
        <div className="px-16">
            <div className="text-end mt-4">
                <AddClash user={session?.user!} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clashs.length > 0 &&
                    clashs.map((item, index) => (
                        <ClashCard
                            clash={item}
                            key={index}
                            token={session?.user?.token!}
                        />
                    ))}
            </div>
        </div>
    )
};

export default Dashboard;