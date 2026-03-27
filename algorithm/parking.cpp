#include <bits/stdc++.h>
using namespace std;

struct Slot {
    int node;
    string type;
    bool occupied;
};

vector<pair<int,int>> graph[10];

// Car and bike slots
vector<Slot> slots = {
    {3, "car", false},
    {4, "car", false},
    {7, "car", false},
    {8, "car", false},
    {5, "bike", false},
    {6, "bike", false},
    {9, "bike", false}
};

// Dijkstra
vector<int> dijkstra(int start, vector<int>& dist) {
    dist.assign(10, INT_MAX);
    vector<int> parent(10, -1);

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[start] = 0;
    pq.push({0, start});

    while(!pq.empty()) {
        int node = pq.top().second;
        pq.pop();

        for(auto &edge : graph[node]) {
            int next = edge.first;
            int weight = edge.second;

            if(dist[node] + weight < dist[next]) {
                dist[next] = dist[node] + weight;
                parent[next] = node;
                pq.push({dist[next], next});
            }
        }
    }
    return parent;
}

// Path
vector<int> getPath(int target, vector<int>& parent) {
    vector<int> path;
    while(target != -1) {
        path.push_back(target);
        target = parent[target];
    }
    reverse(path.begin(), path.end());
    return path;
}

int main(int argc, char* argv[]) {

    if(argc < 2) {
        cout << "Enter vehicle type (car/bike)";
        return 0;
    }

    string type = argv[1];

    // GRAPH
    graph[0] = {{1,2}, {2,3}};
    graph[1] = {{3,2}, {4,3}};
    graph[2] = {{5,2}, {6,3}};
    graph[3] = {{7,2}};
    graph[4] = {{8,2}};
    graph[5] = {{9,2}};

    vector<int> dist;
    vector<int> parent = dijkstra(0, dist);

    int bestSlot = -1;
    int minDist = INT_MAX;

    for(auto &s : slots) {
        if(!s.occupied && s.type == type) {
            if(dist[s.node] < minDist) {
                minDist = dist[s.node];
                bestSlot = s.node;
            }
        }
    }

    if(bestSlot == -1) {
        cout << "No slot available";
        return 0;
    }

    vector<int> path = getPath(bestSlot, parent);

    cout << "Slot:" << bestSlot << "\nPath:";
    for(int x : path) cout << x << " ";

    return 0;
}