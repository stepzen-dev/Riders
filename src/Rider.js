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
  if (error) {
    // You can render any custom fallback UI
    return <h1>{error.message}</h1>;
  }

  console.log("rider", rider);

  return (
    <>
      <div className="rider">
        <a className="back" href="/">
          Return Home
        </a>
        <h1>
          Hello! My Name is {rider.first_name} {rider.last_name} 🚴
        </h1>
        <h3>And I have rode these mountains below</h3>
        {rider.rideSlugs.map((slug) => {
          // console.log("slug", slug);
          let mountain = slug.myRides[0];
          return (
            <div className="mountain" key={mountain.title}>
              <span className="title">{mountain.title}</span>
              <img src={mountain.image} alt={mountain.slug} />
              <span className="height">{mountain.height}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Rider;
