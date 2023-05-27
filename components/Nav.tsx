"use client";

import Link from "next/link"
import Image from "next/image"
import {useState, useEffect} from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react" 
import { dropdownLinks } from "@constants";

const Nav = () => {
  const {data: session}:any = useSession();

  const [providers, setProviders] = useState<Record<string,any> | null>(null);
  const [dropdownOpened, setDropdownOpened] = useState(false)
  useEffect(()=>{
    const setProvidersFunc = async () =>{
      const res = await getProviders();

      setProviders(res);
    }

    setProvidersFunc()
  },[])

  const toggleDropdown = () =>{
    setDropdownOpened(prev=>!prev)
  }
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.png" alt="NextBlog Logo" width={35} height={35} className="object-contain" />
        <p className="logo_text">NextBlog</p>
      </Link>

      <div className="sm:flex hidden">
      {session?.user ? 
        <div className="flex gap-3 md:gap-5">
          <Link href="/new-prompt" className="black_btn">
            New Post
          </Link>

          <button type="button" onClick={()=>signOut()} className="outline_btn">
            Sign out
          </button>

          <Link href={"/profile"}>
            <Image src={session.user.image || ""} width={37} height={37} className="rounded-full" alt={`Profile`} />
          </Link>
        </div>
        :
        <>
        {providers && Object.values(providers).map((provider)=>(
          <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="black_btn">
            Sign In
          </button>
        ))}
        </>
      }
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? 
        <div className="flex">
          <Image
            width={37}
            height={37}
            src={session.user.image || ""}
            className="rounded-full"
            alt="profile"
            onClick={toggleDropdown}
          />

          {dropdownOpened && (
          <div className="dropdown">
            {dropdownLinks.map(link=>(
              <Link href={link.href} key={link.href} className="dropdown_link" onClick={toggleDropdown}>
                {link.title}
              </Link>
            ))}
            <button type="button" onClick={()=>{toggleDropdown(); signOut()}} className="bt-5 w-full black_btn">
              Sign out
            </button>
          </div>
          )}
        </div>
        :
        <>
        {providers && Object.values(providers).map((provider)=>(
          <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="black_btn">
            Sign In
          </button>
        ))}
        </>
      }
      </div>
    </nav>
  )
}

export default Nav