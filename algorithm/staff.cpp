#include <bits/stdc++.h>
using namespace std;

// Edge Structure
struct Edge {
    int u, v, weight;
};

// Disjoint Set Union (Union-Find)
class DisjointSet {
private:
    vector<int> parent, rankv;

public:
    DisjointSet(int n) {
        parent.resize(n);
        rankv.resize(n, 0);

        for(int i = 0; i < n; i++)
            parent[i] = i;
    }

    int find(int x) {
        if(parent[x] != x)
            parent[x] = find(parent[x]);

        return parent[x];
    }

    bool unite(int x, int y) {

        int rootX = find(x);
        int rootY = find(y);

        if(rootX == rootY)
            return false;

        if(rankv[rootX] < rankv[rootY])
            swap(rootX, rootY);

        parent[rootY] = rootX;

        if(rankv[rootX] == rankv[rootY])
            rankv[rootX]++;

        return true;
    }
};

// Kruskal MST
void kruskalMST(int n, vector<Edge>& edges) {

    sort(edges.begin(), edges.end(),
         [](Edge a, Edge b) {
            return a.weight < b.weight;
         });

    DisjointSet ds(n);

    int totalCost = 0;
    int routesUsed = 0;

    vector<Edge> mst;

    for(auto &e : edges) {

        if(ds.unite(e.u, e.v)) {

            mst.push_back(e);

            totalCost += e.weight;

            routesUsed++;
        }
    }

    cout << "\n=====================================\n";
    cout << "     STAFF ROUTE OPTIMIZATION\n";
    cout << "=====================================\n\n";

    for(auto &e : mst) {

        cout << "Node "
             << setw(2) << e.u
             << "  ->  Node "
             << setw(2) << e.v
             << "    Distance : "
             << e.weight << "\n";
    }

    cout << "\n-------------------------------------\n";

    cout << "Total Maintenance Distance : "
         << totalCost << "\n";

    cout << "Total Nodes Covered        : "
         << n << "\n";

    cout << "Routes Optimized           : "
         << routesUsed << "\n";

    double avgDistance =
        routesUsed ? (double)totalCost/routesUsed : 0;

    cout << fixed << setprecision(2);

    cout << "Average Distance           : "
         << avgDistance << "\n";

    double efficiency =
        ((double)routesUsed/(n-1))*100;

    cout << "Optimization Efficiency    : "
         << efficiency << "%\n";

    cout << "-------------------------------------\n";

    cout << "\nStatus : All parking zones are "
         << "reachable with minimum travel cost.\n";
}

int main() {

    /*
       Expanded Parking Layout

       Entrance = 0

       Car Slots :
       3 4 7 8 10 11 12 13

       Bike Slots :
       5 6 9 14 15 16 17
    */

    int n = 18;

    vector<Edge> edges = {

        {0,1,2},
        {0,2,3},

        {1,3,2},
        {1,4,3},

        {2,5,2},
        {2,6,3},

        {3,7,1},
        {4,8,2},
        {5,9,2},

        {7,10,2},
        {7,11,3},

        {8,12,2},
        {8,13,3},

        {9,14,2},
        {9,15,2},

        {14,16,1},
        {15,17,2}
    };

    kruskalMST(n, edges);

    return 0;
}