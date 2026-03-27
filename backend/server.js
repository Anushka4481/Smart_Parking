const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Paths to executables
const parkingExePath = path.join(__dirname, "../algorithm/parking.exe");
const staffExePath = path.join(__dirname, "../algorithm/staff.exe");

// 🚗 PARK VEHICLE (Dijkstra)
app.post("/park", (req, res) => {
    const type = req.body.type;

    if (!type) {
        return res.status(400).send("Vehicle type required");
    }

    // ✅ ADD DEBUG HERE
    console.log("FULL PATH:", parkingExePath);
    console.log("TYPE:", type);

    exec(`"${parkingExePath}" ${type}`, { shell: true }, (error, stdout, stderr) => {

        console.log("ERROR:", error);
        console.log("STDERR:", stderr);
        console.log("OUTPUT:", stdout);

        if (error) {
            return res.status(500).send("Error running parking program");
        }

        res.send(stdout);
    });
});
// 👨‍🔧 STAFF ROUTE (Kruskal)
app.get("/staff", (req, res) => {

    exec(`"${staffExePath}"`, { shell: true }, (error, stdout, stderr) => {

        console.log("ERROR:", error);
        console.log("STDERR:", stderr);
        console.log("OUTPUT:", stdout);

        if (error) {
            return res.status(500).send("Error running staff program");
        }

        res.send(stdout);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});