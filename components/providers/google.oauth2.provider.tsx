import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export default function GoogleOauth2Provider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    console.log("Client ID: ", clientId);
    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}
