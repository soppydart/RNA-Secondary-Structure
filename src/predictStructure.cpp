#include "../include/predictStructure.h"

#include <chrono>
#include <iostream>
#include <map>
#include <vector>

std::map<std::pair<int, int>, int> mp;
std::vector<std::vector<int>> dp;
std::vector<std::pair<int, int>> bond_index;

// compute the maximum number of matching base pairs in an RNA sequence using
// dynamic programming.
void solve(const std::string& str) {
  int n = str.length();
  dp.assign(n, std::vector<int>(n, 0));
  for (int k = 5; k <= n - 1; k++) {
    for (int i = 0; i + k < n; i++) {
      int j = i + k;
      int val = dp[i][j - 1];
      int finalval = -1;
      for (int t = i; t < j - 4; t++) {
        if ((str[t] == 'A' && str[j] == 'U') ||
            (str[t] == 'U' && str[j] == 'A') ||
            (str[t] == 'G' && str[j] == 'C') ||
            (str[t] == 'C' && str[j] == 'G')) {
          if ((((t - 1 < 0) ? 0 : dp[i][t - 1]) + dp[t + 1][j - 1] + 1) > val) {
            val = ((t - 1 < 0) ? 0 : dp[i][t - 1]) + dp[t + 1][j - 1] + 1;
            finalval = t;
          }
        }
      }
      mp[{i, j}] = finalval;
      dp[i][j] = val;
    }
  }
}

// recursively reconstruct the matching base pairs from the DP table and store
// them in a list of pairs
void makePairs(int i, int j) {
  if (i >= j - 4) {
    return;
  }
  int t = mp[{i, j}];
  if (t != -1) {
    bond_index.push_back({t, j});
    makePairs(i, t - 1);
    makePairs(t + 1, j - 1);
  } else {
    makePairs(i, j - 1);
  }
}

// call the solve function to fill the table, makePairs function to reconstruct
// the pairings, and output the results
void predict(struct Sequence seq) {
  std::string s = seq.rnaSequence;
  solve(s);

  auto start = std::chrono::high_resolution_clock::now();
  makePairs(0, s.length() - 1);
  auto end = std::chrono::high_resolution_clock::now();

  std::cout << "\nMax Base Pairs = " << bond_index.size() << std::endl;
  std::cout << "Base pairs:" << std::endl;
  for (const auto& p : bond_index) {
    std::cout << "(" << p.first + 1 << ", " << p.second + 1 << ") ";
  }
  std::cout << std::endl;
  std::chrono::duration<double> duration = end - start;
  std::cout << "Execution time: " << duration.count() << " seconds."
            << std::endl;
}