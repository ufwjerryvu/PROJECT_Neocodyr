import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { BasicUserInfo } from '../services/userService';

interface AuthContextType{
    user: BasicUserInfo | null,
    setUser: (user: BasicUserInfo | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps{
    children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<BasicUserInfo | null>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if(userInfo){
            try{
                setUser(JSON.parse(userInfo) as BasicUserInfo);
            }catch(error){
                console.error("Error parsing using information from local storage: ", error);
                localStorage.removeItem("userInfo");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): [BasicUserInfo | null, (user: BasicUserInfo | null) => void] => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return [context.user, context.setUser]
}

export { useAuth, AuthProvider, AuthContext }