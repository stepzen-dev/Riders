import { useQuery } from "@apollo/client";
import "./App.css";
import React from "react";
import Leaderboard from "./components/Leaderboard/Leaderboard";

import { GET_RIDERS } from "./queries/riders.queries";

function Home() {
  const { data, error, loading } = useQuery(GET_RIDERS, {});

  console.log("data", data);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    // You can render any custom fallback UI
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="results">
      <Leaderboard sourceData={data} />
    </div>
  );
}

export default Home;
