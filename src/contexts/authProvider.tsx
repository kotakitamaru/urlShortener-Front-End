import React, {createContext, ReactElement, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";

const UsernameContext:any  = createContext<string|null>(null);
const SetUsernameContext:any = createContext<React.Dispatch<React.SetStateAction<string>>|null>(null);
const TokenContext:any = createContext<string|null>(null);
const SetTokenContext:any = createContext<React.Dispatch<React.SetStateAction<string>>|null>(null);
const IsAdminContext:any = createContext<boolean|null>(false);
const SetIsAdminContext:any = createContext<React.Dispatch<React.SetStateAction<boolean>>|null>(null);

export function useUsername(){
    return useContext<string|null>(UsernameContext);
}
export function useSetUsername(){
    return useContext<React.Dispatch<React.SetStateAction<string|null>>>(SetUsernameContext);
}
export function useToken(){
    return useContext<string|null>(TokenContext);
}
export function useSetToken(){
    return useContext<React.Dispatch<React.SetStateAction<string|null>>>(SetTokenContext);
}

export function useIsAdmin(){
    return useContext<boolean|null>(IsAdminContext);
}
export function useSetIsAdmin(){
    return useContext<React.Dispatch<React.SetStateAction<boolean|null>>>(SetIsAdminContext);
}


function AuthProvider({children}:any){
    const [username, setUsername] = useState<string|null>(localStorage.getItem("username"));
    const [token, setToken] = useState<string|null>(localStorage.getItem("token"));
    const [isAdmin,setIsAdmin] = useState<boolean|null>("true" === localStorage.getItem("isAdmin"));

    return (
        <UsernameContext.Provider value={username}>
            <SetUsernameContext.Provider value={setUsername}>
                <TokenContext.Provider value={token}>
                    <SetTokenContext.Provider value={setToken}>
                        <IsAdminContext.Provider value={isAdmin}>
                            <SetIsAdminContext.Provider value={setIsAdmin}>
                                {children}
                            </SetIsAdminContext.Provider>
                        </IsAdminContext.Provider>
                    </SetTokenContext.Provider>
                </TokenContext.Provider>
            </SetUsernameContext.Provider>
        </UsernameContext.Provider>
    )
}
export default AuthProvider;