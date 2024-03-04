import React from 'react';

const StatCards = ({ title, data }) => {
    console.log("Stat card should be here");
    console.log("I SHOULD SEEEE ---->>>>", data)

    const formatDataType = (key, type) => {
        return (
            <p key={key}>
            <span className="font-thin text-white">{key}:</span> {type}
        </p>
        );
    };

    return (
        <>
            {data && (
                <div className="block items-center m-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-[250px] overflow-y-auto">
                    {title && <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>}
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key}>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">{key}</p>
                            {Array.isArray(value) ? (
                                <ul className="list-disc ml-6">
                                    {value.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : typeof value === 'object' ? (
                                <div className="ml-6">
                                    {Object.entries(value).map(([subKey, subValue], idx) => (
                                        <div key={idx}>
                                            <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">{subKey}:</p>
                                            {Array.isArray(subValue) ? (
                                                <ul className="list-disc ml-6">
                                                    {subValue.map((item, idx) => (
                                                        <li key={idx}>{item}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="font-normal text-sm text-gray-700 dark:text-gray-400 ml-6">{subValue}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="font-normal text-sm text-gray-700 dark:text-gray-400 ml-6">{value}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default StatCards; 