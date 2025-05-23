import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { CustomUser } from "@/next-auth";
import NextAuth from "next-auth";
import axios from "axios";

const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) {

                token.user = user as CustomUser;
            }

            return token;

        },
        async session({ session, token }) {

            session.user = token.user as CustomUser;

            return session;

        }
    },
    providers: [
        CredentialsProvider({
            name: "Ahmed Shaykh",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter Your Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Your Password"
                }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) return null;

                try {

                    const { data } = await axios.post(LOGIN_URL, credentials);

                    const user = data?.data;

                    if (user && user.id) {

                        return {
                            ...user, email: user.email ?? ""
                        } as CustomUser;

                    }

                } catch (error) {

                    console.error("Authentication Error:", error);

                }

                return null;
            }
        })
    ]
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);