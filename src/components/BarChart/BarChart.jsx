import React, { useEffect } from "react";
import { scaleLinear, max, select } from "d3";

const animateRect = (rectRef, height, colour, countTextRef) => {
  const rect = select(rectRef.current);
  rect
    .transition()
    .duration(650)
    .attr("height", height + 10.5)
    .attr("fill", colour);
  const text = select(countTextRef.current);
  text
    .transition()
    .duration(650)
    .attr("y", (12 + height) * -1);
};

const barTextStyle = {
  fontSize: "2px",
  fontFamily: "Roboto, san-serif",
};

const Bar = (props) => {
  const rectRef = React.createRef();
  const countTextRef = React.createRef();
  const { x, y, width, height, colour, count } = props;

  useEffect(() => {
    animateRect(rectRef, height, colour, countTextRef);
  });

  return (
    <g>
      <rect x={x} y={y + 5} width={width} ref={rectRef} />
      <text
        x={x + 4.9}
        transform="scale(1, -1)"
        fill="white"
        textAnchor="middle"
        style={barTextStyle}
        ref={countTextRef}
      >
        {Math.round(count)}
      </text>
    </g>
  );
};

//wrapper function for the bar chart to
//render bars as ReactJs components
function BarChart(props) {
  const {
    positionX,
    positionY,
    height,
    selectedGroup,
    barColour,
    sourceData,
  } = props;

  const margin = { top: 20, right: 20, bottom: 30, left: 45 };
  const barChartHeight = height - margin.top - margin.bottom;

  const data = sourceData;

  //   console.log("data", data);

  let barData = [];

  data?.riders?.forEach(function (rider) {
    let riderObject = [];
    // Need to set the name to the individual rider
    let name = rider.first_name + " " + rider.last_name;
    let mountains = [];
    rider?.myRides?.map(function (mountain) {
      let number = mountain.mountainRode.height.replaceAll("m", "");
      number = mountain.mountainRode.height.replaceAll(",", "");
      number = parseFloat(number);
      mountains.push(number);
    });
    let added = mountains.reduce((a, b) => a + b, 0);
    riderObject["height"] = added;
    riderObject["name"] = name;
    barData.push(riderObject);
  });

  //labels that will appear under the bars
  const categoriesLabel = barData.map((datum, index) => (
    <text
      key={index}
      x={index * 13 + 3.5}
      y={-2.5}
      textAnchor="middle"
      transform={`scale(1, -1)`}
      style={barTextStyle}
    >
      {datum.name}
    </text>
  ));

  //Title above the bar chart
  const groupsLabel = (
    <text
      x={10}
      y={-70}
      textAnchor="start"
      transform={`scale(1, -1)`}
      style={barTextStyle}
    >
      Mountain Leaders
    </text>
  );

  //d3 function that sizes the bars height according to data range
  const y = scaleLinear()
    .domain([0, max(barData, (d) => d.height)])
    .range([barChartHeight, 0]);

  //creation of bars components
  const bars = barData.map((datum, index) => (
    <Bar
      key={index}
      x={index * 12}
      y={0}
      width={10.8}
      height={barChartHeight - y(datum.height)}
      colour={barColour}
      count={datum.height}
    />
  ));

  return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
      {groupsLabel}
      {bars}
      {categoriesLabel}
    </g>
  );
}

export default BarChart;
