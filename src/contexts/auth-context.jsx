import { authAPI } from "@/services/auth-api";
import { Text } from "@chakra-ui/react";
import { Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { createContext, useContext } from "react";
import useSWR from "swr";

export const AuthContext = createContext();

export const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
};

export const AuthProvider = (props) => {
    const { data, isLoading, error } = useSWR("auth/me", authAPI.checkAuth);

    const globalState = {
        isAuthenticated: Boolean(data),
        user: data,
        isLoading
    };

    return (
        <AuthContext.Provider value={globalState}>
            {props.children}
        </AuthContext.Provider>
    );
};
