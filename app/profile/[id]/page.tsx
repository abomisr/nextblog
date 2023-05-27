"use client";

import { useParams, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";

const MyProfile = () => {
    const [posts, setPosts] = useState([])

    const params = useParams();
    const searchParams = useSearchParams();

    const userId = params.id;
    const username = searchParams.get("username")


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${userId}/posts`);
            const data = await res.json();

            setPosts(data)
        }

        fetchPosts()
    }, [userId])



    return (
        <Profile name={username} desc={`Welcome to ${username} profile page.`} data={posts}/>
    )
}

export default MyProfile;