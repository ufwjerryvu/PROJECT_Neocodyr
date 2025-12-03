import { useState, useEffect, createContext, useContext, ReactNode} from 'react';
import { BasicUserInfo } from '../services/userService';

interface AuthContextType{
    user: BasicUserInfo | null;
    setUser: (user: BasicUserInfo | null) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps{
    children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if(userInfo){
            try{
                setUser(JSON.parse(userInfo) as BasicUserInfo);
            }catch(error){
                console.error("Error unable to parse userInfo from local storage: ", error);
            }
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = (): [BasicUserInfo | null, (user: BasicUserInfo | null) => void, boolean] => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return [context.user, context.setUser, context.loading];
};

export { AuthProvider, useAuth, AuthContext };