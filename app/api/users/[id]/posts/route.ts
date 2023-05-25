import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database"


export const GET = async (req:Request,{params}:{params:{id:string}}) =>{
    try{
        await connectToDB()
        
        const prompts = await Prompt.find({publishedBy:params.id}).populate("publishedBy");

        return new Response(JSON.stringify(prompts),{status:200})
    }catch(err){
        return new Response(JSON.stringify("Failed to fetch all prompts"),{status:500})
    }
}