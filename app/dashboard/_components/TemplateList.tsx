'use client'

import { Templates } from '@/constant/templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'

export interface _Template{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:_Form[]
}

export interface _Form{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

const TemplateList = ({userSearchInput}:{userSearchInput?: string})=> {

  const [templateList,setTemplateList] = useState(Templates)
  useEffect(()=>{
    
    if(userSearchInput)
      {
        const filterData=Templates.filter(item=>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setTemplateList(filterData);
      }
      else{
        setTemplateList(Templates)
      }
  },[userSearchInput])


  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
        {templateList.map((item:_Template,index:number)=>(
            <TemplateCard {...item} key={index}/>
        ))}
    </div>
  )
}

export default TemplateList