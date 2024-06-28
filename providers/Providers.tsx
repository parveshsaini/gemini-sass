
import { PropsWithChildren } from "react";
import { UsageProvider } from "./UsageProvider";
import AuthProvider from "./AuthProvider";
import { SubscriptionProvider } from "./UserSubscription";


export const Providers= ({children}: PropsWithChildren) => {
    return (
        <AuthProvider>
            <UsageProvider>
                <SubscriptionProvider>
                    {children}
                

                </SubscriptionProvider>
            </UsageProvider>
        </AuthProvider>
    )
}