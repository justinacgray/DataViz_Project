import React from 'react'

const StatCards = ({ title, data }) => {
    console.log("Stat card should be here")
    return (
        <>
            {data && (
                <div className="block items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-auto">
                    {title && <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>}
                    {Object.entries(data).map(([key, value]) => (
                        <p key={key} className="font-normal text-gray-700 dark:text-gray-400">{key}: {value}</p>
                    ))}
                </div>
            )}
        </>

    )
}

export default StatCards