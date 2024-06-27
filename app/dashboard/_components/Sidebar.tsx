"use client"

import React from 'react'
import { FileClock, Home, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Usage from './Usage';

const Sidebar = () => {
  const MenuList=[
    {
        name:'Home',
        icon:Home,
        path:'/dashboard'
    },
    {
        name:'History',
        icon:FileClock,
        path:'/dashboard/history'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/dashboard/billing'
    }

]

  const path=usePathname();

  return (
  <div className='h-screen relative p-4 shadow-sm border bg-white'>
      <div className='flex justify-center'>
      <h1 className='text-3xl font-bold cursor-pointer'>Cont<span className='text-primary'>Gen</span> ✏️</h1>
      </div>
      <hr className='my-6 border' />
      <div className='mt-3'>
          {MenuList.map((menu,index)=>(
              <Link href={menu.path} key={index}>
                  <div className={`flex gap-2 mb-2 p-3
                  hover:bg-primary hover:text-white rounded-lg
                  cursor-pointer items-center
                  ${path==menu.path&&'bg-primary text-white'}
                  `}>
                      <menu.icon className='h-6 w-6'/>
                      <h2 className='text-lg'>{menu.name}</h2>
                  </div>
              </Link>
          ))}
      </div>
      <div className='absolute bottom-2 left-0 w-full'>
          <Usage/>
      </div>
  </div>
  )
  }

export default Sidebar
