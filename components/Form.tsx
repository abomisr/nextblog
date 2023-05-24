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

        <form onSubmit={handleSubmit} className='w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism'>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Your AI Prompt
            </span>
              <textarea value={post.prompt} onChange={(e)=> setPost({...post,prompt:e.target.value})} required placeholder='Write your prompt here...' className='form_textarea' />
          </label>
        </form>
    </section>
  )
}

export default Form