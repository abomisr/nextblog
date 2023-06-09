"use client";

import {useEffect, useState} from "react"
import { useRouter,useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:'',
    tag:'',
  })

  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  useEffect(()=>{
      const getPromptDetails = async()=>{
          const res = await fetch(`/api/prompt/${promptId}`)
        
        const {prompt,tag} = await res.json()
        setPost({
            prompt,
            tag
        })
    }
    if(promptId) getPromptDetails();
  },[promptId])

  async function editPrompt(e: FormDataEvent){
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt Id not found.")

    try {
      const res = await fetch(`/api/prompt/${promptId}`,{
        method: "PATCH",
        body: JSON.stringify(post)
      })

      if(res.ok) router.push("/")
    } catch (err) {
      console.log(err);
    } finally{
      setSubmitting(false);
    }

  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt;