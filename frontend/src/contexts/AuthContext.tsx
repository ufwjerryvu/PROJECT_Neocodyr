import { useState, useEffect, createContext, useContext, ReactNode} from 'react';
import { BasicUserInfo } from '../services/userService';

interface AuthContextType{
    user: BasicUserInfo | null;
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
                console.error("Error unable to parse userInfo from local storage: ", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = (): [BasicUserInfo | null, (user: BasicUserInfo | null) => void] => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return [context.user, context.setUser];
};

export { AuthProvider, useAuth, AuthContext };