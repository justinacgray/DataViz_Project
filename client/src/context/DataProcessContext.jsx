import { createContext, useState } from "react";

export const DataProcessContext = createContext();

export const DataProcessProvider = ({children}) => {
    const [dataframe, setDataframe] = useState({});
    const [file, setFile] = useState({})
    const [parsedFileData, setParsedFileData] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [csvList, setCsvList] = useState([])

    return (
        <DataProcessContext.Provider value={{dataframe, setDataframe, 
                                            file, setFile, 
                                            parsedFileData, setParsedFileData, 
                                            uploadStatus, setUploadStatus,
                                            csvList, setCsvList
                                            }}>
            {children}
        </DataProcessContext.Provider>
    );
}
