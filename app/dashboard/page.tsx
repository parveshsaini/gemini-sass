'use client'

import React, { useState } from 'react'
import TemplateList from './_components/TemplateList'
import SearchSection from './_components/SearchSection'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const [userSearchInput,setUserSearchInput]=useState<string>()
  const {data: session, status}= useSession()

  return (
    <div>
        {/* Search Section  */}
        <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)} />

        {/* Template List Section  */}
        <TemplateList userSearchInput={userSearchInput} />
    </div>
  )
}


export default Dashboard
