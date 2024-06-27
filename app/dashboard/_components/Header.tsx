'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Header= ()=> {
  const { data: session, status } = useSession()

  return (
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white'>
        {/* <Search/>
        <input type='text' placeholder='Search...'
        className='outline-none'
        /> */}
        {status==="authenticated" ? <h1>{session?.user?.name}</h1> : <h1>Not Authenticated</h1>}

      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary p-1 rounded-full text-sm text-white px-2'>
        Upgrade you plan at just 69.9₹/mo !!!</h2>
        {status==="authenticated" ? 
            <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">

                <Avatar className='p-1 rounded-full'>
                <AvatarImage 
                  src={session.user!.image!} 
                  className='rounded-full'
                  referrerPolicy='no-referrer'/>
                <AvatarFallback>?</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
      
            <DropdownMenuContent>
              <DropdownMenuItem >
                {session.user!.email}
              </DropdownMenuItem>
              <div className='mt-2'>
              <Button variant={"outline"} className=''>
                <Link href={'/api/auth/signout'}>Logout</Link>
                </Button>
              </div>
              
            </DropdownMenuContent>
          </DropdownMenu> 
            
            : 
            <Button variant={"secondary"} className='ml-8'>
            <Link href={'/api/auth/signin'}>Login</Link>
            </Button>
        }
        

      </div>
    </div>
  )
}

export default Header