import React from "react";
import { MantineProvider } from "@mantine/core";
import agricultureData from "./data/agricultureData.json";
import { AgricultureData } from "./types";
import AverageYieldAreaTable from "./components/AverageYieldAreaTable";
import MaxMinProductionTable from "./components/MaxMinProductionTable";
import "./App.css"; // Import app.css for styling

const App: React.FC = () => {
  const data: AgricultureData[] = agricultureData.map((item) => ({
    Country: item.Country,
    Year: item.Year,
    CropName: item["Crop Name"],
    CropProduction:
      parseFloat(String(item["Crop Production (UOM:t(Tonnes))"])) || 0,
    YieldOfCrops:
      parseFloat(
        String(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])
      ) || 0,
    AreaUnderCultivation:
      parseFloat(String(item["Area Under Cultivation (UOM:Ha(Hectares))"])) ||
      0,
  }));

  console.log("Data:", data); // Debugging line

  return (
    <MantineProvider>
      <div className="center colour">
        <h1 style={{ color: "white" }}>Welcome to Agriculture Analytics</h1>
        <div className="app-container">
          <div className="table-containers">
            <MaxMinProductionTable data={data} />
          </div>
          <div className="table-containers">
            <AverageYieldAreaTable data={data} />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
