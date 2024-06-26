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

const CreateNewContent = ({params}: {params: {slug: string}}) => {
    const selectedTemplate:_Template | undefined = Templates?.find((item)=>item.slug== params['slug']);
    const [loading,setLoading]= useState<boolean>(false);
    const [aiOutput,setAiOutput]=useState<string>('');
    const router=useRouter();

    const GenerateAIContent=async(formData:any)=>{
        // if(totalUsage>=10000&&!userSubscription)
        //     {
        //         console.log("Please Upgrade");
        //         router.push('/dashboard/billing')
        //         return ;
        //     }
        setLoading(true);
        const SelectedPrompt=selectedTemplate?.aiPrompt;
        const FinalAIPrompt=JSON.stringify(formData)+", "+SelectedPrompt;
        const result=await chatSession.sendMessage(FinalAIPrompt);
        
        setAiOutput(result?.response.text());
        // await SaveInDb(JSON.stringify(formData),selectedTemplate?.slug,result?.response.text())
        setLoading(false);
        
        // setUpdateCreditUsage(Date.now())

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
