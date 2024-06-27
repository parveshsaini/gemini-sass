'use client'

import { createContext, PropsWithChildren, useState } from "react";

interface UsageState{
    totalUsage: number,
    setTotalUsage: (value:number)=>void
}

export const UsageContext=createContext<UsageState>({totalUsage:0, setTotalUsage:()=>{}})

export const UsageProvider= ({children}: PropsWithChildren) => {
    const [totalUsage,setTotalUsage]=useState<number>(0);

    return (
        <UsageContext.Provider value={{ totalUsage, setTotalUsage }}>
          {children}
        </UsageContext.Provider>
      );
};