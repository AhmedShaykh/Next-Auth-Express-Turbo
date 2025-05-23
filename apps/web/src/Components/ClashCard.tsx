import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import ClashMenuBar from "./ClashMenuBar";
import { getImageUrl } from "@/lib/utils";
import { ClashType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const ClashCard = ({
    clash,
    token
}: {
    clash: ClashType;
    token: string;
}) => {
    return (
        <Card>
            <CardHeader className="flex justify-between items-center flex-row">
                <CardTitle>
                    {clash.title}
                </CardTitle>

                <ClashMenuBar clash={clash} token={token} />
            </CardHeader>

            <CardContent>
                {clash?.image && (
                    <Image
                        src={getImageUrl(clash.image)}
                        width={500}
                        height={500}
                        alt={clash.title}
                        className="rounded-md w-full h-[220px] object-contain my-3"
                    />
                )}

                <p className="py-3">
                    {clash?.description}
                </p>

                <p>
                    <strong>Expire At :-</strong>{" "}
                    {new Date(clash?.expire_at!).toDateString()}
                </p>
            </CardContent>

            <CardFooter className="space-x-4">
                <Link href={`/clash/items/${clash.id}`}>
                    <Button>Items</Button>
                </Link>
            </CardFooter>
        </Card>
    )
};

export default ClashCard;