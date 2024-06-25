import React, { PropsWithChildren } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'

const layout = ({children}: PropsWithChildren) => {
  return (
    <div>
      <div className='md:w-64 hidden md:block fixed'>
        <Sidebar/>
      </div>
        <div className='md:ml-64'>
          <Header/>
        {children}
      </div>
    </div>
  )
}

export default layout
