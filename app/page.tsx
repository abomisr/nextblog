import Feed from "@components/Feed"


const page = () => {
  return (
    <section className='w-full flex-col flex-center'>
      <h1 className='head_text text-center'> 
        Discover & Share
        <br className="max-md:hidden" />
        <span className='orange_gradient text-center' >AI-Powered Prompts</span>
      </h1>

      <p className='desc text-center'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque hic voluptatum totam at possimus ea aut eaque voluptates blanditiis cumque!
      </p>

      <Feed />
    </section>
  )
}

export default page