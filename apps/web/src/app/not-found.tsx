import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <Image
                src="/404.svg"
                width={500}
                height={500}
                alt="404_img"
            />

            <Link className="mt-7" href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    )
};

export default NotFound;