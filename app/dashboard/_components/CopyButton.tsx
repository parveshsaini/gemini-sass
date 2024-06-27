import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';

function CopyButton({ aiResponse }: {aiResponse: string}) {
  const [buttonText, setButtonText] = useState(<Clipboard/>);

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse);
    setButtonText(<Check/>); // Change button text to 'Copied!'
    setTimeout(() => {
      setButtonText(<Clipboard/>); // Reset button text to 'Copy' after 2 seconds
    }, 1000);
  };

  return (
    <div>
      <Button variant='ghost' className='text-primary' onClick={handleCopy}>
        {buttonText}
      </Button>
    </div>
  );
}

export default CopyButton;
