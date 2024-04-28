#include "../include/visualization.h"

#include <iostream>

// to replace the '.'s with 'D's before adding them to the URL
std::string dotEncode(const std::string& value) {
  std::string encoded = "";
  for (char c : value) {
    if (c == '.')
      encoded += 'D';
    else
      encoded += c;
  }
  return encoded;
}

// construct the URL string
std::string getURL(std::string sequence, std::string dotStructure) {
  std::string baseURL =
      "https://rna-secondary-structure-docs.surge.sh/visualization.html";
  std::string encodedDotStructure = dotEncode(dotStructure);

  std::string finalURL = baseURL + "?sequence=" + sequence +
                         "&dot_structure=" + encodedDotStructure;
  return finalURL;
}

// generates a URL to the visualization html page
void visualize(struct Sequence seq) {
  std::string rnaSequence = seq.rnaSequence;
  std::string rnaDotStructure = seq.rnaDotBracket;
  std::string URL = getURL(rnaSequence, rnaDotStructure);
  std::cout << std::endl << "Visualization link: " << URL << std::endl;
}
