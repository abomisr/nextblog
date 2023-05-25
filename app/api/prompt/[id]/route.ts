import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database"


// GET (read)
export const GET = async (req:Request,{params}:{params:{id:string}}) =>{
    try{
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("publishedBy");

        if(!prompt) return new Response("Prompt not found",{status:404})

        return new Response(JSON.stringify(prompt),{status:200})

    }catch(err){
        return new Response(JSON.stringify("Failed to fetch the prompt"),{status:500})
    }
}


// PATCH (update)
export const PATCH = async (req:Request,{params}:{params:{id:string}})=>{
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status:404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (err) {
        return new Response(JSON.stringify("Failed to update the prompt"),{status:500})
    }
}


//DELETE
export const DELETE = async (req:Request,{params}:{params:{id:string}}) =>{
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)

        return new Response(JSON.stringify("Deleted successfully"),{status:200})
    } catch (err) {
        return new Response(JSON.stringify("Failed to delete the prompt"),{status:500})
    }
}