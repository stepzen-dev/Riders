import { useQuery } from "@apollo/client";
import "./App.css";
import React, { useState } from "react";
import BarChart from "./components/BarChart/BarChart";
import Leaderboard from "./components/Leaderboard/Leaderboard";

import { GET_RIDERS } from "./queries/riders.queries";

function Home() {
  const { data, error, loading } = useQuery(GET_RIDERS, {});

  console.log("data", data);

  // React hooks with common state values for all components
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");

  //function that will hook into the state to change it
  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }

  return (
    <div className="results">
      {/* <div className="barchart">
        <svg viewBox="-2 0 140 100" preserveAspectRatio="none">
          <BarChart
            positionX={45}
            positionY={100}
            width={80}
            height={100}
            selectedGroup={selectedGroup}
            barColour={groupColour}
            sourceData={data}
          />
        </svg>
      </div> */}
      <Leaderboard sourceData={data} />
    </div>
  );
}

export default Home;
