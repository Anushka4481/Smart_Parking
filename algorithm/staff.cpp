#include <bits/stdc++.h>
using namespace std;

// Edge structure
struct Edge {
    int u, v, weight;
};

// Disjoint Set (Union-Find)
class DisjointSet {
    vector<int> parent;

public:
    DisjointSet(int n) {
        parent.resize(n);
        for(int i = 0; i < n; i++)
            parent[i] = i;
    }

    int find(int x) {
        if(parent[x] != x)
            parent[x] = find(parent[x]); // Path compression
        return parent[x];
    }

    bool unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if(rootX != rootY) {
            parent[rootY] = rootX;
            return true;
        }
        return false;
    }
};

// Kruskal Algorithm
void kruskalMST(int n, vector<Edge>& edges) {

    // Sort edges by weight
    sort(edges.begin(), edges.end(), [](Edge a, Edge b) {
        return a.weight < b.weight;
    });

    DisjointSet ds(n);

    int totalCost = 0;

    cout << "Staff Optimized Routes:\n";

    for(auto &e : edges) {
        if(ds.unite(e.u, e.v)) {
            cout << e.u << " -> " << e.v 
                 << " (Distance: " << e.weight << ")\n";

            totalCost += e.weight;
        }
    }

    cout << "Total Minimum Distance: " << totalCost << endl;
}

int main() {

    // Same nodes as your parking graph
    int n = 10;

    // Define connections (you can adjust weights as per your map)
    vector<Edge> edges = {
        {0,1,2}, {0,2,3},
        {1,3,2}, {1,4,3},
        {2,5,2}, {2,6,3},
        {3,7,2}, {4,8,2},
        {5,9,2}
    };

    kruskalMST(n, edges);

    return 0;
}