import NextAuth, { NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/auth";

export const handler: NextAuthOptions = NextAuth(authOptions);
export { handler as GET, handler as POST };
