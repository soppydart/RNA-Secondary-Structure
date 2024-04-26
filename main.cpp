#include <cstdlib>
#include <iostream>
#include <sstream>
#include <string>
#include <cstdio>
using namespace std;

string urlEncode(const string &value) {
    string encoded;
    for (char c : value) {
        if (c == '.') 
            encoded += 'D';
         else 
            encoded += c;
    }
    return encoded;
}

int main() {
    string fileName;
    cout << "Enter the file name: ";
    getline(cin, fileName);

    string command = "RNAfold input-sequences/" + fileName;
    FILE* pipe = popen(command.c_str(), "r");
    if (!pipe) {
        cout << "Did you enter the filename correctly?" << command << endl;
        return -1;
    }

    string RNAsequence="", RNAdotStructure="";

    stringstream buffer;
    constexpr int bufferSize = 128;
    char tempBuffer[bufferSize];
    bool sequenceFound = false;
    string dotStructure;
    while (!feof(pipe)) {
        if (fgets(tempBuffer, bufferSize, pipe) != nullptr) {
            buffer << tempBuffer;
            string line = tempBuffer;
            if (!sequenceFound && line.find_first_not_of(" \n\r\t") != string::npos) {
                sequenceFound = true;
                string sequence = line.substr(0, line.find_first_of("\n"));
                cout << "Sequence: " << sequence << endl;
                RNAsequence = sequence;
            }
            if (line.find('(') != string::npos) {
                dotStructure = line.substr(0, line.size() - 9);
                cout << "Dot Structure: " << dotStructure << endl;
                RNAdotStructure = dotStructure;
                break;
            }
        }
    }
    pclose(pipe);

    string baseURL = "Visualization link: http://localhost:9000/";
    string encodedDotStructure = urlEncode(RNAdotStructure);

    string finalURL = baseURL + "?sequence=" + RNAsequence + "&dot_structure=" + encodedDotStructure;

    cout << endl;

    cout << finalURL << endl;

    return 0;
}
