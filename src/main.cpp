#include "../include/predictStructure.h"
#include "../include/rnaFold.h"
#include "../include/visualization.h"

int main() {
  struct Sequence sequence;
  sequence = getSequenceDetails();
  predict(sequence);
  visualize(sequence);
  return 0;
}