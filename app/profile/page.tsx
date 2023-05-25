"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [posts, setPosts] = useState([])

    const {data:session} = useSession();
    // const router = useRouter();


    useEffect(()=>{
        const fetchPosts = async () =>{
          const res = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await res.json();
    
          setPosts(data)
        }
    
        fetchPosts()
      },[])

    const handleEdit = ()=>{
        
    }


    const handleDelete =async ()=>{

    }

  return (
    <Profile name="My" desc="Welcome to your personalized profile page." data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
  )
}

export default MyProfile;