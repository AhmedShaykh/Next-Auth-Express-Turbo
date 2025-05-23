import { auth } from "@/app/api/auth/[...nextauth]/auth";
import AddClashItems from "@/Components/AddClashItems";
import ViewClashItems from "@/Components/ViewClashItems";
import { fetchClash } from "@/lib/clashFetch";
import { ClashType } from "@/lib/types";

const ClashItems = async ({
    params
}: {
    params: { id: number };
}) => {

    const session = await auth();

    const clash: ClashType | null = await fetchClash(params?.id, session?.user?.token!);

    return (
        <div className="px-16">
            <div className="mt-4">
                <h1 className="text-2xl lg:text-4xl font-extrabold">
                    {clash?.title}
                </h1>

                <p className="text-lg py-3">
                    {clash?.description}
                </p>
            </div>

            {clash?.ClashItem && clash.ClashItem.length > 0 ? (
                <ViewClashItems clash={clash} />
            ) : (
                <AddClashItems
                    token={session?.user?.token!}
                    clashId={params?.id.toString()}
                />
            )
            }
        </div>
    )
};

export default ClashItems;