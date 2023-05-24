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
    callbacks:{
         session: async ({session}:any)=> {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        signIn: async({profile}:any)=> {
            try{
                await connectToDB();
                
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                if(!userExists){
                    // profile.email
                    const profileEmail = profile.email
                    await User.create({
                        email: profileEmail,
                        username: profileEmail.slice(0 , profileEmail.indexOf("@")).toLowerCase(),
                        picture: profile.picture
                    })
                }
    
                return true;
            }catch (err:any){
                console.log("Error checking if user exists: ", err.message)
                return false;
            }
        },
    }
})

export {handler as GET, handler as POST}