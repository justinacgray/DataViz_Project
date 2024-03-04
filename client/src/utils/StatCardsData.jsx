import React, { useEffect, useState } from "react";
import StatCards from "../components/StatCards";

const StatCardsData = ({ dataframe }) => {

  const [statistics, setStatistics] = useState([]);
  let df_stats = []

  useEffect(() => {
    if (dataframe && dataframe.df_info) {
      const { shape, duplicates, missing_values, data_types } = dataframe.df_info;

      df_stats = [
        { title: "General Stats", data: { Columns: shape[1], Rows: shape[0], Duplicates: duplicates } },
        { title: "Missing Values", data: { "Missing Values": missing_values.length } },
        { title: "Data Types", data: { DataType: Object.entries(data_types).join(' ')} },

      ]

      console.log("df_stats:", df_stats);

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