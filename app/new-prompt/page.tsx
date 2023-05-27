"use client";

import {useState} from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const NewPrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:'',
    tag:'',
  })

  const {data:session}:any = useSession();
  const router = useRouter();

  async function newPrompt(e: FormDataEvent){
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/new/`,{
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session?.data?.user?.id
        })
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
      type="New"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={newPrompt}
    />
  )
}

export default NewPrompt;