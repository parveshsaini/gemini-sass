'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { Button } from '@/components/ui/button'
import { _Template } from '../../_components/TemplateList'
import { Templates } from '@/constant/templates'
import { chatSession } from '@/gemini/Model'
import { useRouter } from 'next/navigation'
import prisma from '@/prisma/client'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateNewContent = ({params}: {params: {slug: string}}) => {
    const selectedTemplate:_Template | undefined = Templates?.find((item)=>item.slug== params['slug']);
    const [loading,setLoading]= useState<boolean>(false);
    const [aiOutput,setAiOutput]=useState<string>('');
    const router=useRouter();
    const { data: session, status } = useSession()

    const GenerateAIContent=async(formData:any)=>{
        setLoading(true);
        const SelectedPrompt=selectedTemplate?.aiPrompt;
        const FinalAIPrompt=JSON.stringify(formData)+", "+SelectedPrompt;
        const result=await chatSession.sendMessage(FinalAIPrompt);
        
        try {
            setAiOutput(result?.response.text());
            await axios.post('/api/output',{
                formData: JSON.stringify(formData),
                templateSlug: selectedTemplate?.slug,
                aiResponse: result?.response.text(),
            })
            toast.success('Saved Successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);

        }

    }

    return (
        <div className='p-5'>
            <Link href={"/dashboard"}>
                <Button> <ArrowLeft/> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
                {/* FormSection  */}
                    <FormSection 
                    selectedTemplate={selectedTemplate}
                    userFormInput={(value:any)=>GenerateAIContent(value)}
                    loading={loading} />
                {/* OutputSection  */}
                <div className='col-span-2'>
                    <OutputSection aiOutput={aiOutput}/>
                    </div>
            </div>
        </div>
      )
    }

export default CreateNewContent
