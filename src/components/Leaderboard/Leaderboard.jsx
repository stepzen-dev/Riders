import React, { useEffect } from "react";

//wrapper function for the bar chart to
//render bars as ReactJs components
function Leaderboard(props) {
  const { height, sourceData } = props;

  const margin = { top: 20, right: 20, bottom: 30, left: 45 };
  const barChartHeight = height - margin.top - margin.bottom;

  const data = sourceData;

  // console.log("data", data);

  let barData = [];

  data?.riders?.forEach(function (rider) {
    let riderObject = [];
    let name = rider.first_name + " " + rider.last_name;
    let riderId = rider.id;
    let mountains = [];
    rider?.myRides?.map(function (mountain) {
      // console.log("mountain", mountain.mountainRode.height);
      let number = mountain.mountainRode.height.replaceAll("m", "");
      number = mountain.mountainRode.height.replaceAll(",", "");
      number = parseFloat(number);
      mountains.push(number);
    });
    // console.log("mountains typeof", typeof mountains);
    // console.log("mountains", mountains);
    let added = mountains.reduce((a, b) => a + b, 0);
    // console.log("name", name);
    riderObject["height"] = added;
    riderObject["name"] = name;
    riderObject["id"] = riderId;
    // console.log("riderObject after", riderObject);
    barData.push(riderObject);
  });

  console.log("barData", barData);

  barData.sort((a, b) => {
    // console.log("a", a.height);
    // console.log("b", b.height);
    return b.height - a.height;
  });

  // console.log("numArray", barData);

  return (
    <article className="leaderboard">
      <header>
        <h1 className="leaderboard__title">
          <span className="leaderboard__title--top">Rider</span>
          <span className="leaderboard__title--bottom">Leaderboard</span>
        </h1>
      </header>

      <main className="leaderboard__profiles">
        {barData.map((datum, index) => (
          <a href={`/rider/${datum.id}`}>
            <article className="leaderboard__profile" key={index}>
              🚴
              <span className="leaderboard__name">{datum.name}</span>
              <span className="leaderboard__value">
                {datum.height}
                <span>meters</span>
              </span>
            </article>
          </a>
        ))}
      </main>
    </article>
  );
}

export default Leaderboard;
