#include <bits/stdc++.h>
using namespace std;

struct Slot {
    int id;
    string type;
    bool occupied;
};

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cout << "Vehicle type required";
        return 0;
    }

    string type = argv[1];

    vector<Slot> slots;

    // simulate slots
    for (int i = 1; i <= 20; i++) {
        if (i % 2 == 0)
            slots.push_back({i, "car", false});
        else
            slots.push_back({i, "bike", false});
    }

    int best = -1;

    for (auto &s : slots) {
        if (!s.occupied && s.type == type) {
            best = s.id;
            break;
        }
    }

    if (best == -1) {
        cout << "No slot available";
        return 0;
    }

    cout << "ALLOCATED_SLOT " << best;
    return 0;
}