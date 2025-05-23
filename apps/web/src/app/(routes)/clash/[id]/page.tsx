import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { fetchClash } from "@/lib/clashFetch";
import { checkDateExpiry } from "@/lib/utils";
import Clashing from "@/Components/Clashing";
import { ClashType } from "@/lib/types";
import { notFound } from "next/navigation";

const Clash = async ({
    params
}: {
    params: { id: number };
}) => {

    const session = await auth();

    const clash: ClashType | null = await fetchClash(params?.id, session?.user?.token!);

    if (!clash) return notFound();

    if (checkDateExpiry(clash.expire_at)) {

        return notFound();

    }

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

            <Clashing
                clash={clash!}
            />
        </div>
    )
};

export default Clash;