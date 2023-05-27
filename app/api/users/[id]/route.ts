import User from "@models/User"
import { connectToDB } from "@utils/database"


// GET a user
export const GET = async(req:Request, {params}:{params:{id:string}})=>{
    try {
        await connectToDB()
        const user = await User.findById(params.id)

        return new Response(JSON.stringify(user),{status:200})
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch user"),{status:500})
    }
}