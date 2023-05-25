"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";


const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}:any) => {
  const [copied, setCopied] = useState(false)
  const {data:session} = useSession();
  const pathName = usePathname();


  const handleCopy = () =>{
    setCopied(true)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Image src={post.publishedBy.picture} alt={`${post.publishedBy.username} pic`} width={40} height={40} className="rounded-full object-contain" />

        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.publishedBy.username}
          </h3>

          <p className="font-inter text-sm text-gray-500">{post.publishedBy.email}</p>
        </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied?
              '/assets/icons/tick.svg'
              :
              '/assets/icons/copy.svg'
            }
            width={14}
            height={14}
            alt=""
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={()=> handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

      {
        session?.user.id === post.publishedBy._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
            <button className="green_gradient cursor-pointer font-inter text-sm" onClick={handleEdit}>Edit</button>
            <button className="orange_gradient cursor-pointer font-inter text-sm" onClick={handleDelete}>Delete</button>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard