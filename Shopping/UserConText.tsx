import React, { useState, createContext, ReactNode } from "react";

interface IgetUserId {
    getUserId: string | null;
    setGetUserId: (getUserId:string|null) => void
}

const defaultValue:IgetUserId = {
    getUserId:'',
    setGetUserId: ()=>{}
}

const UserType = createContext(defaultValue);

const UserConText = ({children}:{children:ReactNode}) => {
    
    const [getUserId, setGetUserId] = useState<string|null>('');
    
    return(
        <UserType.Provider value={{getUserId, setGetUserId}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType, UserConText}

    