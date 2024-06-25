import React, { PropsWithChildren } from 'react'
import Sidebar from './_components/Sidebar'

const layout = ({children}: PropsWithChildren) => {
  return (
    <div>
      <div className='md:w-64 hidden md:block fixed'>
        <Sidebar/>
      </div>
        <div className='md:ml-64'>
        {children}
      </div>
    </div>
  )
}

export default layout
