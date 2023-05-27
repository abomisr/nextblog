"use client";

import { useState,useEffect, ChangeEvent } from "react"

import PromptCard from "./PromptCard"
import { PromptI } from "@types";


const PromptCardList = ({data,handleTagClick}:{data:PromptI[],handleTagClick(promptTag:string):void}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post:PromptI)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchTimeOut, setSearchTimeOut] = useState<any>(null)
  const [searchResults, setSearchResults] = useState([])

  const filterPosts = (searchText:string) =>{
    const regexp = new RegExp(searchText, "i") 

    return posts.filter((p:PromptI)=>
      regexp.test(p.publishedBy.username) ||
      regexp.test(p.tag) ||
      regexp.test(p.prompt)
    )
  }

  const handleTagClick = (promptTag:string) =>{
    setSearchText(promptTag)
    setSearchResults(filterPosts(promptTag))
  }

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setSearchText(e.target.value);
    clearTimeout(searchTimeOut);

    setSearchTimeOut(
      setTimeout(() => {
        setSearchResults(filterPosts(e.target.value))
      }, 500)
    )

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
      <form className="relative w-full flex-center" onSubmit={(e)=>e.preventDefault()}>
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} className="peer search_input" />
      </form>

      {searchText !== "" ? 
      <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      :
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
      }
    </section>
  )
}

export default Feed