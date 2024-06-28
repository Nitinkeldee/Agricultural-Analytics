import React from "react";
import { Table } from "@mantine/core";
import { AgricultureData } from "../types";
import "./MaxMinProductionTable.css";

interface Props {
  data: AgricultureData[];
}

const MaxMinProductionTable: React.FC<Props> = ({ data }) => {
  const aggregateData = () => {
    const aggregatedData: {
      [year: string]: { maxCrop: string; minCrop: string };
    } = {};

    data.forEach((item) => {
      const year = item.Year;
      const cropName = item.CropName;
      const cropProduction = item.CropProduction;

      if (!aggregatedData[year]) {
        aggregatedData[year] = { maxCrop: cropName, minCrop: cropName };
      } else {
        if (
          cropProduction >
          (data.find((x) => x.Year === year)?.CropProduction || 0)
        ) {
          aggregatedData[year].maxCrop = cropName;
        }
        if (
          cropProduction <
          (data.find((x) => x.Year === year)?.CropProduction || Infinity)
        ) {
          aggregatedData[year].minCrop = cropName;
        }
      }
    });

    return aggregatedData;
  };

  const aggregatedData = aggregateData();

  return (
    <div className="table-container">
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(aggregatedData).map((year) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{aggregatedData[year].maxCrop}</td>
              <td>{aggregatedData[year].minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MaxMinProductionTable;
