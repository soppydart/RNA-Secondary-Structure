function encodeDot(inputString) {
  let result = "";
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === ".") {
      result += "D";
    } else {
      result += inputString[i];
    }
  }
  return result;
}
function redirect() {
  // Get the values from the form fields
  var s = document.getElementById("sequence").value;
  var d = document.getElementById("dot_structure").value;

  console.log("sending " + encodeDot(d));

  // Construct the URL based on the form values
  var url =
    "https://rna-secondary-structure-docs.surge.sh/visualization.html?sequence=" +
    s +
    "&dot_structure=" +
    encodeDot(d);
  // var url = "http://127.0.0.1:5500/docs/visualization.html??sequence=CUACGGCGCGGCGCCCUUGGCGA&dot_structure=DDDDDDDDDDD((((DDD))))D";
  // Redirect to the constructed URL
  window.location.href = url;

  // Prevent the default form submission
  return false;
}
