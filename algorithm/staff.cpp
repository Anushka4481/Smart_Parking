#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "STAFF OPTIMIZED ROUTES\n";

    vector<pair<int,int>> edges = {
        {0,1},{1,2},{2,3},{3,4},{4,5}
    };

    int cost = 0;

    for (auto e : edges) {
        cout << e.first << " -> " << e.second << " cost:1\n";
        cost++;
    }

    cout << "TOTAL COST: " << cost;
    return 0;
}