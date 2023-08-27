import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from '@/helpers/server-helpers';
import prisma from './../../../../prisma/index';
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'creds',
            credentials: {
                email: { label: "Email", placeholder: "Enter Email" },
                password: { label: "Password", placeholder: "Enter Password" },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) return null;

                try {
                    await connectToDatabase();
                    const user = await prisma.user.findFirst({ where: { email: credentials.email } });
                    if (!user) {
                        return null;
                    }

                    if (!user?.hashedPassword) {
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)
                    if(isPasswordCorrect){
                        return user;
                    }

                    return null;

                } catch (error) {
                    console.log(error);
                    return null;
                } finally {
                    await prisma.$disconnect();
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }