function findPairs(sequence) {
  const mp = new Map();
  const dp = [];
  const bondIndex = [];

  function solve(str, n) {
    for (let k = 5; k <= n - 1; k++) {
      for (let i = 0; i < n - k; i++) {
        const j = i + k;
        let val = dp[i][j - 1];
        let finalVal = -1;
        for (let t = i; t < j - 4; t++) {
          if (
            (str[t] === "A" && str[j] === "U") ||
            (str[t] === "U" && str[j] === "A") ||
            (str[t] === "G" && str[j] === "C") ||
            (str[t] === "C" && str[j] === "G")
          ) {
            if ((t - 1 < 0 ? 0 : dp[i][t - 1]) + dp[t + 1][j - 1] + 1 > val) {
              val = (t - 1 < 0 ? 0 : dp[i][t - 1]) + dp[t + 1][j - 1] + 1;
              finalVal = t;
            }
          }
        }
        mp.set(`${i},${j}`, finalVal);
        dp[i][j] = val;
      }
    }
  }

  function makePairs(i, j) {
    if (i >= j - 4) {
      return;
    }
    const t = mp.get(`${i},${j}`);
    if (t !== -1) {
      bondIndex.push([t, j]);
      makePairs(i, t - 1);
      makePairs(t + 1, j - 1);
    } else {
      makePairs(i, j - 1);
    }
  }

  const n = sequence.length;
  for (let i = 0; i < n; i++) {
    dp.push(Array(n).fill(0));
  }
  solve(sequence, n);
  makePairs(0, n - 1);
  return bondIndex;
}

// RNA sequence
var url = new URL(window.location.href);
const sequence = url.searchParams.get("sequence").toUpperCase();
console.log(sequence);
// Pairs
const pairs = findPairs(sequence);

const canvasWidth = 1000;
const canvasHeight = 300;
const baseRadius = 20;

// Color mapping for bases
const baseColors = {
  A: "red",
  U: "blue",
  G: "green",
  C: "orange",
};

const svg = d3
  .select("#canvas1")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`)
  .call(
    d3.zoom().on("zoom", function (event) {
      svg.attr("transform", event.transform);
    })
  )
  .append("g");

// Draw bases (spheres) and initials
const bases = svg
  .selectAll(".base")
  .data(sequence.split(""))
  .enter()
  .append("g")
  .attr("class", "base")
  .attr("transform", (d, i) => `translate(${i * 40 + 30},${canvasHeight / 2})`);

bases
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", baseRadius)
  .style("fill", (d) => baseColors[d]);

bases
  .append("text")
  .attr("class", "baseText")
  .text((d) => d)
  .attr("x", 0)
  .attr("y", 0);

// Draw pairing lines
pairs.forEach((pair, index) => {
  const startX = pair[0] * 40 + 30;
  const endX = pair[1] * 40 + 30;
  const startY = canvasHeight / 2 - baseRadius; // Adjusted startY
  const endY = canvasHeight / 2 - baseRadius; // Adjusted endY

  // Draw vertical lines shooting upwards from each base
  svg
    .append("line")
    .attr("x1", startX)
    .attr("y1", startY)
    .attr("x2", startX)
    .attr("y2", startY - 50 - index * 20) // Adjusted to make each line unique
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", endX)
    .attr("y1", endY)
    .attr("x2", endX)
    .attr("y2", endY - 50 - index * 20) // Adjusted to make each line unique
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // Draw horizontal line connecting the endpoints of the vertical lines
  svg
    .append("line")
    .attr("x1", startX)
    .attr("y1", startY - 50 - index * 20) // Adjusted to make each line unique
    .attr("x2", endX)
    .attr("y2", startY - 50 - index * 20) // Adjusted to make each line unique
    .attr("stroke", "black")
    .attr("stroke-width", 2);
});
