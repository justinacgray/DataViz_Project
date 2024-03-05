import { createContext, useState } from "react";

export const DataframeContext = createContext();

export const DataframeProvider = ({children}) => {
    const [ dataframe, setDataframe] = useState({});
    const [parsedFileData, setParsedFileData] = useState([]);


    return (
        <DataframeContext.Provider value={{
                                        dataframe, setDataframe,
                                        parsedFileData, setParsedFileData
        }}>
            {children}
        </DataframeContext.Provider>
    );
}

