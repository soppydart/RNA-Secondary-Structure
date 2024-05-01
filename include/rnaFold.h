#pragma once

#include <cstdio>
#include <iostream>
#include <sstream>
#include <string>

#include "../lib/data.h"

FILE* getRnaFoldOutput();
struct Sequence getSequenceAndDotStructure(FILE* pipe);
struct Sequence getSequenceDetails();