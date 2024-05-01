"use strict";

function parseDotStructureFromURL(dotBracketEncoded) {
  const dotStructureParam = decodeURIComponent(dotBracketEncoded);

  const dotBracket = dotStructureParam.replace(/D/g, ".");

  return dotBracket;
}

function updateStructure() {
  var url = new URL(window.location.href);
  var sequence = url.searchParams.get("sequence")?.toUpperCase();
  var dotBracketEncoded = url.searchParams.get("dot_structure");

  let shouldDisplay = sequence && dotBracketEncoded ? true : false;
  // console.log(shouldDisplay);
  if (!shouldDisplay) {
    console.log("hide vis 1");
    document.getElementById("vis2").style.display = "none";
  }

  // var dotBracket = dot;
  const dotBracket = parseDotStructureFromURL(dotBracketEncoded);
  console.log(dotBracket);
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
