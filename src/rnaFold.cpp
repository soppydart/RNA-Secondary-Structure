#include "../include/rnaFold.h"

#include <fstream>

// run RNAfold on the sequence file and return the output
FILE* getRnaFoldOutput() {
  std::string fileName;
  std::cout << "\nEnter the file name: ";
  std::getline(std::cin, fileName);

  std::string filePath = "rna-sequences/" + fileName;
  std::ifstream file(filePath);
  if (!file.is_open()) {
    std::cerr << "Error: File '" << filePath << "' not found." << std::endl;
    exit(-1);
  }
  file.close();

  std::string command = "RNAfold " + filePath;
  FILE* pipe = popen(command.c_str(), "r");
  if (!pipe) {
    std::cerr << "Error: Unable to execute command." << std::endl;
    exit(-1);
  }
  return pipe;
}

// extract the sequence and the dot bracket from the output of
// getRnaFoldOutput()
struct Sequence getSequenceAndDotStructure(FILE* pipe) {
  struct Sequence newSequence;
  std::stringstream buffer;
  constexpr int bufferSize = 128;
  char tempBuffer[bufferSize];
  bool sequenceFound = false;
  std::string dotStructure;
  while (!feof(pipe)) {
    if (fgets(tempBuffer, bufferSize, pipe) != nullptr) {
      buffer << tempBuffer;
      std::string line = tempBuffer;
      if (!sequenceFound &&
          line.find_first_not_of(" \n\r\t") != std::string::npos) {
        sequenceFound = true;
        std::string sequence = line.substr(0, line.find_first_of("\n"));
        std::cout << std::endl << "Sequence: " << sequence << std::endl;
        newSequence.rnaSequence = sequence;
      }
      if (line.find('(') != std::string::npos) {
        dotStructure = line.substr(0, line.size() - 9);
        std::cout << "Dot Structure: " << dotStructure << std::endl;
        newSequence.rnaDotBracket = dotStructure;
        break;
      }
    }
  }
  return newSequence;
}

// read a sequence file conatining an RNA sequence and extract its details to
// create a struct Sequence instance
struct Sequence getSequenceDetails() {
  FILE* pipe = getRnaFoldOutput();
  struct Sequence newSequence = getSequenceAndDotStructure(pipe);
  pclose(pipe);

  return newSequence;
}