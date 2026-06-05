"use client";
import React, { createContext, useContext, useState } from "react";
import { UserResponse } from "@/types/responses/user.response";

export interface IAuthContextProps {
    user: UserResponse | null;
    setUser: (user: UserResponse | null) => void;
}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider = ({
    children,
    initialUser,
}: {
    children: React.ReactNode;
    initialUser: UserResponse | null;
}) => {
    const [user, setUser] = useState<UserResponse | null>(initialUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
