import { React } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_RIDER } from "./queries/riders.queries";

function Rider() {
  const { riderId } = useParams();
  const { data, error, loading } = useQuery(GET_RIDER, {
    variables: {
      id: riderId,
    },
  });

  const rider = data?.rider;

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("post", rider);

  return (
    <>
      <div className="rider">
        <a className="back" href="/">
          Return Home
        </a>
        <h1>
          Hello! My Name is {rider.first_name} {rider.last_name} 🚴
        </h1>
        <h3>I have rode these beautiful mountains</h3>
        {rider.myRides.map((mountain, index) => (
          <div className="mountain" key={index}>
            <span className="title">{mountain.mountainRode.title}</span>
            <img
              src={mountain.mountainRode.image}
              alt={mountain.mountainRode.slug}
            />
            <span className="height">{mountain.mountainRode.height}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Rider;
