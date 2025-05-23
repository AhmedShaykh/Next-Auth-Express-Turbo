import { DefaultSession } from "next-auth";

export type CustomUser = {
    id: string;
    email: string;
    emailVerified: Date | null;
    name?: string | null;
    image?: string | null;
    token?: string | null;
};

declare module "next-auth" {

    interface Session {
        user: CustomUser;
    };

    interface User extends CustomUser { };

};

declare module "next-auth/jwt" {

    interface JWT {
        user: CustomUser;
    };

};