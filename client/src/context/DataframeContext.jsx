import { createContext, useState } from "react";

export const DataframeContext = createContext();

export const DataframeProvider = ({children}) => {
    const [ dataframe, setDataframe] = useState({});

    return (
        <DataframeContext.Provider value={{dataframe, setDataframe}}>
            {children}
        </DataframeContext.Provider>
    );
}