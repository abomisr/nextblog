"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { PromptI } from "@types";

const MyProfile = () => {
    const [posts, setPosts] = useState([])

    const { data: session }:any = useSession();
    const router = useRouter();


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await res.json();

            setPosts(data)
        }

        fetchPosts()
    }, [])

    const handleEdit = (post:PromptI) => {
        router.push("/update-prompt?id="+post._id)
    }


    const handleDelete = async (post:PromptI) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

        if(!hasConfirmed) return;

        try {
            await fetch(`api/prompt/${post._id.toString()}`,{
                method:"DELETE"
            })

            const filteredPosts = posts.filter((p:PromptI)=> p._id !== post._id)
            setPosts(filteredPosts)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Profile name="My" desc="Welcome to your personalized profile page." data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
    )
}

export default MyProfile;