const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const parkingExePath =
    path.join(__dirname, "../algorithm/parking.exe");

const staffExePath =
    path.join(__dirname, "../algorithm/staff.exe");

app.post("/park", (req, res) => {

    const { type, vehicle } = req.body;

    if (!type || !vehicle) {
        return res.status(400)
            .send("Vehicle number and type required");
    }

    exec(
        `"${parkingExePath}" ${type} ${vehicle}`,
        { shell: true },
        (error, stdout, stderr) => {

            if (error) {
                console.log(stderr);
                return res.status(500)
                    .send("Parking allocation failed");
            }

            const slotMatch =
                stdout.match(/Allocated Slot : (\d+)/);

            if (!slotMatch) {
                return res.send(stdout);
            }

            const slotId =
                parseInt(slotMatch[1]);

            db.occupySlot(slotId, (err) => {

                if (err) {
                    return res.status(500)
                        .send("Database error");
                }

                db.parkVehicle(
                    vehicle,
                    type,
                    slotId,
                    (err) => {

                        if (err) {
                            return res.status(500)
                                .send("Vehicle save failed");
                        }

                        res.send(stdout);
                    }
                );
            });
        }
    );
});

app.get("/staff", (req, res) => {

    exec(
        `"${staffExePath}"`,
        { shell: true },
        (error, stdout, stderr) => {

            if (error) {
                console.log(stderr);
                return res.status(500)
                    .send("Staff route failed");
            }

            res.send(stdout);
        }
    );
});

app.post("/exit", (req, res) => {

    const vehicleNo = req.body.vehicle;

    if (!vehicleNo) {
        return res.status(400)
            .send("Vehicle number required");
    }

    db.findVehicle(vehicleNo, (err, result) => {

        if (err) {
            return res.status(500)
                .send("Database error");
        }

        if (result.length === 0) {
            return res.status(404)
                .send("Vehicle not found");
        }

        const vehicle = result[0];

        const entryTime =
            new Date(vehicle.entry_time);

        const exitTime =
            new Date();

        const diffHours =
            Math.max(
                1,
                Math.ceil(
                    (exitTime - entryTime)
                    / (1000 * 60 * 60)
                )
            );

        const fee =
            diffHours * 20;

        const updateSql = `
            UPDATE parking
            SET exit_time = NOW(),
                fee = ?
            WHERE vehicle_no = ?
            AND exit_time IS NULL
        `;

        db.connection.query(
            updateSql,
            [fee, vehicleNo],
            (err) => {

                if (err) {
                    return res.status(500)
                        .send("Exit update failed");
                }

                db.freeSlot(
                    vehicle.slot_id,
                    (err) => {

                        if (err) {
                            return res.status(500)
                                .send("Slot release failed");
                        }

                        res.json({
                            vehicle: vehicleNo,
                            slot: vehicle.slot_id,
                            hours: diffHours,
                            fee: fee,
                            status: "Exited Successfully"
                        });
                    }
                );
            }
        );
    });
});

app.get("/dashboard", (req, res) => {

    const slotSql = `
        SELECT
            COUNT(*) AS total,
            SUM(occupied = 1) AS occupied,
            SUM(occupied = 0) AS available
        FROM slots
    `;

    db.connection.query(
        slotSql,
        (err, slotData) => {

            if (err) {
                return res.status(500)
                    .send("Dashboard error");
            }

            const vehicleSql = `
                SELECT
                    SUM(vehicle_type='car') AS cars,
                    SUM(vehicle_type='bike') AS bikes,
                    COALESCE(SUM(fee),0) AS revenue
                FROM parking
            `;

            db.connection.query(
                vehicleSql,
                (err, vehicleData) => {

                    if (err) {
                        return res.status(500)
                            .send("Dashboard error");
                    }

                    res.json({
                        total:
                            slotData[0].total || 0,

                        occupied:
                            slotData[0].occupied || 0,

                        available:
                            slotData[0].available || 0,

                        cars:
                            vehicleData[0].cars || 0,

                        bikes:
                            vehicleData[0].bikes || 0,

                        revenue:
                            vehicleData[0].revenue || 0
                    });
                }
            );
        }
    );
});

app.get("/slots", (req, res) => {

    const sql = `
        SELECT
            id,
            type,
            occupied
        FROM slots
        ORDER BY id
    `;

    db.connection.query(
        sql,
        (err, result) => {

            if (err) {
                return res.status(500)
                    .send("Unable to fetch slots");
            }

            res.json(result);
        }
    );
});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );
});