"use strict";

function solve(str, n) {
  let mp = new Map();
  let dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let k = 5; k <= n - 1; k++) {
    for (let i = 0, j = i + k; j < n; i++, j++) {
      let val = dp[i][j - 1];
      let finalval = -1;
      for (let t = i; t < j - 4; t++) {
        if (
          (str[t] === "A" && str[j] === "U") ||
          (str[t] === "U" && str[j] === "A") ||
          (str[t] === "G" && str[j] === "C") ||
          (str[t] === "C" && str[j] === "G")
        ) {
          if ((t - 1 < 0 ? 0 : dp[i][t - 1]) + dp[t + 1][j - 1] + 1 > val) {
            val = (t - 1 < 0 ? 0 : dp[i][t - 1]) + dp[t + 1][j - 1] + 1;
            finalval = t;
          }
        }
      }
      mp.set(`${i},${j}`, finalval);
      dp[i][j] = val;
    }
  }

  return mp;
}

function makePairs(mp, i, j, dotStructure) {
  if (i >= j - 4) {
    return;
  }
  let t = mp.get(`${i},${j}`);
  if (t !== -1) {
    dotStructure[i] = "(";
    dotStructure[j] = ")";
    makePairs(mp, i, t - 1, dotStructure);
    makePairs(mp, t + 1, j - 1, dotStructure);
  } else {
    dotStructure[j] = ".";
    makePairs(mp, i, j - 1, dotStructure);
  }
}

function generateDotStructure(str) {
  let n = str.length;
  let mp = solve(str, n);
  let dotStructure = Array(n).fill(".");
  makePairs(mp, 0, n - 1, dotStructure);
  return dotStructure.join("");
}

function parseDotStructureFromURL(dotBracketEncoded) {
  const dotStructureParam = decodeURIComponent(dotBracketEncoded);

  const dotBracket = dotStructureParam.replace(/D/g, ".");

  return dotBracket;
}

function updateStructure() {
  var url = new URL(window.location.href);
  var sequence = url.searchParams.get("sequence").toUpperCase();
  var dotBracketEncoded = url.searchParams.get("dot_structure");
  // var dotBracket = dot;
  // console.log(dotBracket);
  const dotBracket = parseDotStructureFromURL(dotBracketEncoded);
  // var dotBracket = "(((((((((...((((((.........))))))........((((((.......))))))..)))))))))";

  var svg = document.getElementById("rna_ss");
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  var options = {
    structure: dotBracket,
    sequence: sequence,
  };
  if (options.structure && options.sequence) {
    var container2 = new fornac.FornaContainer("#rna_ss", {
      animation: true,
      zoomable: true,
    });
    container2.addRNA(options.structure, options);
    container2.setSize(200, 200);
  } else {
    console.error("Error: Structure and sequence are not defined.");
  }
}

window.addEventListener("load", updateStructure);
