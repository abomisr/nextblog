import { AnyARecord } from "dns"
import PromptCard from "./PromptCard"
import { PromptI } from "@types"


const Profile = ({
  name, desc, handleEdit, handleDelete, data
}: any) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">
        {name} Profile
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data.length > 0 && data?.map((post:PromptI) => (
          <PromptCard key={post._id} post={post} handleEdit={()=> handleEdit && handleEdit(post)} handleDelete={()=> handleDelete && handleDelete(post)} />
        ))}
      </div>
    </section>
  )
}

export default Profile