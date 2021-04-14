import React from "react";

//wrapper function for the bar chart to
//render bars as ReactJs components
function Leaderboard(props) {
  const { sourceData } = props;

  const data = sourceData;

  console.log("data", data);

  let barData = [];

  data?.riders?.forEach(function (rider) {
    let riderObject = [];
    let name = rider.first_name + " " + rider.last_name;
    let riderId = rider.id;
    let mountains = [];
    rider.rideSlugs.map(function (mountain) {
      mountain.myRides.map(function (mountain) {
        // console.log("mountain", mountain.height);
        let number = mountain.height.replaceAll("m", "");
        number = mountain.height.replaceAll(",", "");
        number = parseFloat(number);
        mountains.push(number);
        return mountains;
      });
      return mountains;
    });
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
    return b.height - a.height;
  });

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
