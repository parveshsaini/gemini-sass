
'use client'

import { Templates } from '@/constant/templates'
import Image from 'next/image'
import React from 'react'
import { _Template } from '../_components/TemplateList'
import CopyButton from '../_components/CopyButton'
import axios from 'axios'

export interface _History{
    id:Number,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    authorId:string,
    createdAt:string
}

function History() {

    const [HistoryList, setHistoryList]= React.useState<_History[]>()
    React.useEffect(()=>{
        getHistory().then((data)=>setHistoryList(data))
    },[])
    const getHistory= async()=>{
        const response= await axios.get('/api/output')
        return response.data
    }
    

    const GetTemplateName = (slug: string): _Template => {
        const template: _Template | undefined = Templates?.find((item) => item.slug == slug);
        if (!template) {
            throw new Error(`Template with slug ${slug} not found`);
        }
        return template;
    };

  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
        <h2 className='font-bold text-3xl'>History</h2>
        <p className='text-gray-500'>Search your previously generate AI content</p>
        <div className='grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3'>
            <h2 className='col-span-2'>TEMPLATE</h2>
            <h2 className='col-span-2'>AI RESPONSE</h2>
            <h2>DATE</h2>
            <h2>WORDS</h2>
            <h2>ACTION</h2>
        </div>
        {HistoryList && HistoryList.length>0 && HistoryList.map((item:_History,index:number)=>(
            <div key={index}>
            <div className='grid grid-cols-7 my-5 py-3 px-3'>
            <h2 className='col-span-2 flex gap-2 items-center'>
                <Image src={GetTemplateName(item?.templateSlug)?.icon} width={25} height={25} alt='icon' />
                {GetTemplateName(item.templateSlug)?.name}
            </h2>
            <h2 className='col-span-2 line-clamp-3 mr-3'>{item?.aiResponse}</h2>
            <h2>{new Date(item.createdAt).toLocaleString()}</h2>
            <h2>{item?.aiResponse.split(' ').length}</h2>
            <h2>
              <CopyButton aiResponse={item.aiResponse} />
            </h2>
        </div>
        <hr/>
            </div>
        ))}
    </div>
  )
}

export default History