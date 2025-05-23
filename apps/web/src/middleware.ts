import { auth } from "./app/api/auth/[...nextauth]/auth";
import { authRoutes, publicRoutes } from "./lib/routes";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;

    const session = await auth();

    const isPublicRoute = publicRoutes.includes(pathname);

    const isAuthRoute = authRoutes.includes(pathname);

    if (isPublicRoute) {

        if (session) {

            return Response.redirect(new URL(`/dashboard`, req.url));

        }

        return null;
    }

    if (!session && isAuthRoute) {

        return NextResponse.redirect(new URL("/login", req.url));

    }

};

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard",
        "/clash/:path*",
        "/clash/items/:path*"
    ]
};