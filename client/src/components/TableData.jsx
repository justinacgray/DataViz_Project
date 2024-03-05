import React, { useState, useEffect } from 'react'
import "../Table.css"


const TableData = ({ parsedFileData }) => {

    const [tableRows, setTableRows] = useState([]);
    const [tableValues, setTableValues] = useState([]);

    useEffect(() => {
        if (parsedFileData) {
            const each_row = [];
            const each_value = [];

            parsedFileData.forEach((data) => {
                each_row.push(Object.keys(data));
                each_value.push(Object.values(data));
            });
            setTableRows(each_row[0]);
            setTableValues(each_value);

        }
    }, [parsedFileData ]);

    


    return (
        <div className="bg-gray-100 text-gray-900 tracking-wider leading-normal">
        <div className="p-4 mt-6 lg:mt-0 rounded shadow bg-white w-[100%] h-[400px] overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {tableRows && tableRows.map((rows, index) => {
                            return <th key={index} className='px-6 py-3'>{rows}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableValues.map((value, index) => {
                        return (
                            <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                {value.map((val, i) => {
                                    return <td key={i} className='px-4 py-4'>{val}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
        </div>
    );
};

export default TableData;