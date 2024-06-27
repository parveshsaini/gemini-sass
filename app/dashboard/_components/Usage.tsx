"use client"

import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { _History } from '../history/page'
import { UsageContext } from '@/providers/UsageProvider'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

const Usage = () => {

  const {totalUsage,setTotalUsage}=useContext(UsageContext)

  const {data: user, status}= useSession()

  const getWords=(usageData: _History[])=>{
    //count the total words and set the usage to toal words
    let totalWords=0;
    usageData.forEach((history)=>{
        totalWords+=history.aiResponse.split(' ').length;
        console.log('totalWords', totalWords);
    })
    setTotalUsage(totalWords);
  }

  useEffect(()=>{
      user&&GetData();
      // user&&IsUserSubscribe();
  },[user]);


  // useEffect(()=>{
  //     user&&GetData();
  // },[updateCreditUsage&&user]);

  const GetData=async()=>{
    const response = await axios.get('/api/output');

    const usageData = response.data;
    // console.log('usageData', usageData);
      
    getWords(usageData)
  }

  return (
    <div className='m-5'>
        <div className='bg-primary text-white p-3 rounded-lg'>
            <h2 className='font-medium'>Credits 💸</h2>
            <div className='h-2 bg-[#f8bc5a] w-full rounded-full mt-3'>
                <div className='h-2 bg-white rounded-full'
                style={{
                    width:totalUsage/10000>1?100+"%":(totalUsage/10000)*100+"%"
                }}
                ></div>
            </div>
            <h2 className='text-sm my-2'>{totalUsage}/{10000} credit used</h2>
        </div>
        <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}


export default Usage
