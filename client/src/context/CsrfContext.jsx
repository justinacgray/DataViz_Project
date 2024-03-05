import { createContext, useState } from "react";

export const CsrfContext = createContext();

export const CsrfProvider = ({children}) => {
    const [csrfToken, setCsrfToken] = useState(null)

    return (
        <CsrfContext.Provider value={{csrfToken, setCsrfToken}} >
            {children}
        </CsrfContext.Provider>
    );
}