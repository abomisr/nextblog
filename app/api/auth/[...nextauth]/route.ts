import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/User"

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        })
    ],
    async session({session}){

    },
    async signIn({profile}:{profile:{email:string,name:string,picture:string}}){
        try{
            await connectToDB();
            
            // check if a user already exists
            const userExists = await User.findOne({
                email: profile.email
            })

            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    picture: profile.picture
                })
            }

            return true;
        }catch (err){
            console.log(err)
            return false;
        }
    }
})

export {handler as GET, handler as Post}