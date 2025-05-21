import { auth } from "./app/api/auth/[...nextauth]/auth";
import { NextResponse } from "next/server";

let BASE_PATH = process.env.NEXTAUTH_URL;

export default auth((req) => {

    const reqUrl = new URL(req.url);

    if (!req.auth && reqUrl?.pathname !== "/") {

        return NextResponse.redirect(
            new URL(`${BASE_PATH}/login?callbackUrl=${encodeURIComponent(reqUrl?.pathname)}`,
                req.url
            )
        );

    }
});

export const config = {
    matcher: [
        "/dashboard",
        "/clash/items/:path*"
    ]
};