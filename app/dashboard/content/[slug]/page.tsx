'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { Button } from '@/components/ui/button'
import { _Template } from '../../_components/TemplateList'
import { Templates } from '@/constant/templates'

const CreateNewContent = ({params}: {params: {slug: string}}) => {
    const selectedTemplate:_Template | undefined = Templates?.find((item)=>item.slug== params['slug']);
    const [loading,setLoading]= useState<boolean>(false);

    return (
        <div className='p-5'>
            <Link href={"/dashboard"}>
                <Button> <ArrowLeft/> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
                {/* FormSection  */}
                    <FormSection 
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v:any)=>console.log(v)}
                    loading={loading} />
                {/* OutputSection  */}
                <div className='col-span-2'>
                    <OutputSection />
                    </div>
            </div>
        </div>
      )
    }

export default CreateNewContent
