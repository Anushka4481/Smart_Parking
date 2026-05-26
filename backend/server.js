const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const parkingExe = path.join(__dirname, "../algorithm/parking.exe");
const staffExe = path.join(__dirname, "../algorithm/staff.exe");

// PARK VEHICLE
app.post("/park", (req, res) => {
    const { type, vehicle } = req.body;

    if (!type || !vehicle) {
        return res.send("Missing data");
    }

    exec(`"${parkingExe}" ${type}`, (err, stdout) => {
        if (err) return res.send("Algorithm error");

        const match = stdout.match(/ALLOCATED_SLOT (\d+)/);

        if (!match) return res.send(stdout);

        const slot = match[1];

        // SAVE TO DB (FIXED)
        db.query(
            "INSERT INTO parking(vehicle_no, slot_id) VALUES (?,?)",
            [vehicle, slot]
        );

        db.query(
            "UPDATE slots SET occupied=1 WHERE id=?",
            [slot]
        );

        res.send(`Vehicle ${vehicle} parked at slot ${slot}`);
    });
});

// STAFF ROUTE
app.get("/staff", (req, res) => {
    exec(`"${staffExe}"`, (err, stdout) => {
        if (err) return res.send("Error executing staff module");
        res.send(stdout);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});