import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CopyButton from '../../_components/CopyButton';

interface Props{
  aiOutput:string;
}

const OutputSection= ({aiOutput}:Props)=> {
  const editorRef:any=useRef();

  useEffect(()=>{
    const editorInstance=editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  },[aiOutput])

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <div className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(aiOutput)}
        ><CopyButton aiResponse={aiOutput}/></div>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  )
}

export default OutputSection