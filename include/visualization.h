#pragma once

#include <string>

#include "../lib/data.h"

std::string dotEncode(const std::string& value);
std::string getURL(std::string sequence, std::string dotStructure);
void visualize(struct Sequence seq);
