'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search } from 'lucide-react'
import React from 'react'

const Header= ()=> {
  return (
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white'>
        <Search/>
        <input type='text' placeholder='Search...'
        className='outline-none'
        />
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary p-1 rounded-full text-sm text-white px-2'>
        Upgrade you plan at just 69.9₹/mo !!!</h2>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Papi</AvatarFallback>
        </Avatar>

      </div>
    </div>
  )
}

export default Header