import React from "react";
import { Table } from "@mantine/core";
import { AgricultureData } from "../types";

interface Props {
  data: AgricultureData[];
}

const AverageYieldAreaTable: React.FC<Props> = ({ data }) => {
  const calculateAverages = () => {
    let averages: { [cropName: string]: { yield: number; area: number } } = {};

    data.forEach((record) => {
      if (!averages[record.CropName]) {
        averages[record.CropName] = {
          yield: 0,
          area: 0,
        };
      }
      averages[record.CropName].yield += record.YieldOfCrops;
      averages[record.CropName].area += record.AreaUnderCultivation;
    });

    Object.keys(averages).forEach((cropName) => {
      const count = data.filter(
        (record) => record.CropName === cropName
      ).length;
      averages[cropName].yield = averages[cropName].yield / count;
      averages[cropName].area = averages[cropName].area / count;
      averages[cropName].yield = parseFloat(
        averages[cropName].yield.toFixed(3)
      );
      averages[cropName].area = parseFloat(averages[cropName].area.toFixed(3));
    });

    return averages;
  };

  const averages = calculateAverages();

  return (
    <div className="table-container">
      <Table>
        <thead>
          <tr>
            <th>Crop Name</th>
            <th>Average Yield (Kg/Ha)</th>
            <th>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(averages).map((cropName, index) => (
            <tr key={index}>
              <td>{cropName}</td>
              <td>{averages[cropName].yield}</td>
              <td>{averages[cropName].area}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AverageYieldAreaTable;
