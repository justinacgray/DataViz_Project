import React, { useEffect, useState } from "react";
import StatCards from "../components/StatCards";

const StatCardsData = ({ dataframe }) => {

  const [statistics, setStatistics] = useState([]);
  let df_stats = []

  const extractOverviewData = (describe) => {
    if (!describe || typeof describe !== 'object') {
      return 'Invalid overview data';
    }
  
    let overviewDataBreakdown = {};

    for (const key in describe) {
        if (Array.isArray(describe[key]) && describe[key].length >= 8) {
         
          const data = describe[key];
          const overviewObject = {
            Count: data[0],
            Mean: data[1],
            Std: data[2],
            Min: data[3],
            Percentile25: data[4],
            Median: data[5],
            Percentile75: data[6],
            Max: data[7]
          };
          overviewDataBreakdown[key] = overviewObject; 
        }
      }
    
  
    return overviewDataBreakdown;
  };


  useEffect(() => {

    if (dataframe && dataframe.df_info) {
      const { shape, duplicates, missing_values, data_types, describe } = dataframe.df_info;
      const overviewDataBreakdown = extractOverviewData(describe);
    

      df_stats = [
        { title: "General Stats", data: { Columns: shape[1], Rows: shape[0], Duplicates: duplicates } },
        { title: "Missing Values", data: { "Number of missing values": missing_values.length } },
        { title: "Data Types", data: { DataType: Object.entries(data_types).join(' ')} },
        { title: "Overview", data:  overviewDataBreakdown},
      ]
      console.log("overViewDataString:", overviewDataBreakdown);
      setStatistics(df_stats)
    }
  }, [dataframe]);


  return (
        <div className="flex w-full">
              {statistics.map((stats, index) => (
                <StatCards key={index} title={stats.title} data={stats.data} />
              ))}
        </div>
  )
}

export default StatCardsData