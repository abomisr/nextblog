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

  async function newPrompt(e: FormDataEvent){

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