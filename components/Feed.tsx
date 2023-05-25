"use client";

import { useState,useEffect, ChangeEvent } from "react"

import PromptCard from "./PromptCard"
import { PromptI } from "@types";


const PromptCardList = ({data,handleTagClick}:{data:PromptI[],handleTagClick():void}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post:PromptI)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setSearchText(e.target.value)
  }

  useEffect(()=>{
    const fetchPosts = async () =>{
      const res = await fetch('api/prompt');
      const data = await res.json();

      setPosts(data)
    }

    fetchPosts()
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} className="peer search_input" />
      </form>

      <PromptCardList data={posts} handleTagClick={()=> {}} />
    </section>
  )
}

export default Feed