#include <bits/stdc++.h>
using namespace std;

struct Slot {
    int node;
    string type;
    bool occupied;
};
// PARKING SLOTS
vector<Slot> slots = {

    // Cars

    {10,"car",false},
    {11,"car",false},
    {12,"car",false},
    {13,"car",false},
    {14,"car",false},
    {15,"car",false},
    {16,"car",false},
    {17,"car",false},
    {18,"car",false},
    {19,"car",false},

    // Bikes

    {20,"bike",false},
    {21,"bike",false},
    {22,"bike",false},
    {23,"bike",false},
    {24,"bike",false},
    {25,"bike",false},
    {26,"bike",false},
    {27,"bike",false},
    {28,"bike",false},
    {29,"bike",false}
};

// Graph with 30 nodes
vector<pair<int,int>> graph[30];
// CREATE PARKING MAP
void buildGraph()
{
    graph[0]={{1,2},{2,3}};
    graph[1]={{3,2},{4,2}};
    graph[2]={{5,2},{6,2}};
    graph[3]={{7,1},{8,2}};
    graph[4]={{9,2},{10,1}};
    graph[5]={{11,1},{12,2}};
    graph[6]={{13,1},{14,2}};
    graph[7]={{15,1}};
    graph[8]={{16,1}};
    graph[9]={{17,1}};
    graph[10]={{18,1}};
    graph[11]={{19,1}};
    graph[12]={{20,1}};
    graph[13]={{21,1}};
    graph[14]={{22,1}};
    graph[15]={{23,1}};
    graph[16]={{24,1}};
    graph[17]={{25,1}};
    graph[18]={{26,1}};
    graph[19]={{27,1}};
    graph[20]={{28,1}};
    graph[21]={{29,1}};
}
// DIJKSTRA
vector<int> dijkstra(int start, vector<int>& dist)
{
    dist.assign(30, INT_MAX);

    vector<int> parent(30, -1);

    priority_queue<
        pair<int,int>,
        vector<pair<int,int>>,
        greater<pair<int,int>>
    > pq;

    dist[start] = 0;
    pq.push({0, start});

    while(!pq.empty())
    {
        int currentDist = pq.top().first;
        int node = pq.top().second;
        pq.pop();

        // Skip outdated entries
        if(currentDist > dist[node])
            continue;

        for(auto edge : graph[node])
        {
            int next = edge.first;
            int weight = edge.second;

            if(dist[node] + weight < dist[next])
            {
                dist[next] = dist[node] + weight;
                parent[next] = node;

                pq.push({dist[next], next});
            }
        }
    }

    return parent;
}
// PATH GENERATOR
vector<int> getPath(int target, vector<int>& parent)
{
    vector<int> path;

    while(target != -1)
    {
        path.push_back(target);
        target = parent[target];
    }

    reverse(path.begin(), path.end());

    return path;
}
// FIND BEST SLOT
int findNearestSlot(string type, vector<int>& dist)
{
    int bestSlot = -1;
    int minDistance = INT_MAX;

    for(auto &slot : slots)
    {
        if(slot.type == type &&
           slot.occupied == false)
        {
            if(dist[slot.node] < minDistance)
            {
                minDistance = dist[slot.node];
                bestSlot = slot.node;
            }
        }
    }

    return bestSlot;
}
// MARK SLOT OCCUPIED
void occupySlot(int slotNode)
{
    for(auto &slot : slots)
    {
        if(slot.node == slotNode)
        {
            slot.occupied = true;
            return;
        }
    }
}

int main(int argc, char* argv[])
{
    if(argc < 3)
    {
        cout << "Usage: parking.exe <car/bike> <vehicleNo>";
        return 0;
    }

    string type = argv[1];
    string vehicleNo = argv[2];

    buildGraph();

    vector<int> dist;

    vector<int> parent = dijkstra(0, dist);

    int slot = findNearestSlot(type, dist);

    if(slot == -1)
    {
        cout << "No Available "
             << type
             << " Slot Found";
        return 0;
    }

    occupySlot(slot);

    vector<int> path = getPath(slot, parent);

    cout << "=========================\n";
    cout << " SMART PARKING SYSTEM\n";
    cout << "=========================\n\n";

    cout << "Vehicle Number : "
         << vehicleNo << "\n";

    cout << "Vehicle Type   : "
         << type << "\n";

    cout << "Allocated Slot : "
         << slot << "\n";

    cout << "Distance       : "
         << dist[slot]
         << " units\n\n";

    cout << "Shortest Path : ";

    for(int x : path)
        cout << x << " ";

    cout << "\n\n";

    cout << "Parking Successful";

    return 0;
}