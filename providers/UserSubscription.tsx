'use client'

import { createContext, PropsWithChildren, useState } from "react";

interface UserSubscriptionState{
    userSubscription: boolean,
    setUserSubscription: (value:boolean)=>void
}

export const UserSubscriptionContext=createContext<UserSubscriptionState>({userSubscription: false, setUserSubscription:()=>{}})

export const SubscriptionProvider= ({children}: PropsWithChildren) => {
    const [userSubscription,setUserSubscription]=useState<boolean>(false);

    return (
        <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
          {children}
        </UserSubscriptionContext.Provider>
      );
};