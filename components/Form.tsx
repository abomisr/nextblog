import Link from 'next/link'
import React from 'react'

const Form = ({type, post, setPost, submitting, handleSubmit}:Record<string,any>) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left blue_gradient'>
        {type} Post
        </h1>
        <p className="desc text-left max-w-md">
          Share awesome prompts around the world, and let your imagination run wild with any AI-powered platform.
        </p>

        <form onSubmit={handleSubmit} className='w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism mb-2 drop-shadow-sm'>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Your AI Prompt
            </span>
              <textarea value={post.prompt} onChange={(e)=> setPost({...post,prompt:e.target.value})} required placeholder='Write your prompt here...' className='form_textarea drop-shadow-md' />
          </label>

          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Tag {' '}
              <span className='font-normal'>( #web, #react, #next.js, #problem_solving )</span>
            </span>
              <input value={post.tag} onChange={(e)=> setPost({...post,tag:e.target.value})} required placeholder='#tag' className='form_input drop-shadow-md' />
          </label>

          <div className="flex-end mx-3 mb-5 gap-5">
            <Link href="/" className='text-gray-500 text-sm'>
              Cancel
            </Link>

            <button type="submit" disabled={submitting} className="px-5 p-1.5 text-sm rounded-full text-white bg-gradient-to-br from-orange-500 to-yellow-500 disabled:from-gray-700 disabled:to-gray-500" >
              {submitting? "Waiting...":"Submit"}
            </button>
          </div>
        </form>
    </section>
  )
}

export default Form