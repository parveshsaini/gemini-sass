import { PropsWithChildren } from "react";
import { UsageProvider } from "./UsageProvider";
import AuthProvider from "./AuthProvider";

export const Providers= ({children}: PropsWithChildren) => {
    return (
        <AuthProvider>
            <UsageProvider>
                {children}
            </UsageProvider>
        </AuthProvider>
    )
}