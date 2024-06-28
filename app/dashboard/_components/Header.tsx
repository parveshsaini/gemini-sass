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
import React, { useContext } from 'react'
import { UserSubscriptionContext } from '@/providers/UserSubscription';

const Header= ()=> {
  const { data: session, status } = useSession()
  const {userSubscription}= useContext(UserSubscriptionContext)

  return (
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center
         max-w-lg bg-white'>
        {/* <Search/>
        <input type='text' placeholder='Search...'
        className='outline-none'
        /> */}
        {status==="authenticated" ? <h1 className='text-2xl font-bold'>Welcome, {session?.user?.name}!</h1 > : <h1 className='text-2xl font-bold'>Please Login to get Started</h1>}

      </div>
      <div className='flex gap-5 items-center'>
        {!userSubscription ? <h2 className='bg-primary p-1 rounded-full text-sm text-white px-2'>
        Upgrade you plan at just 999₹/mo !!!</h2> :
        <h2 className='bg-primary p-1 rounded-full text-sm font-bold text-white px-2'>
        Plus Subscriber ⭐</h2>
        }
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