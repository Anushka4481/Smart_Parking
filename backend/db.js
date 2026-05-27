const mysql = require("mysql2");

// ======================
// DATABASE CONNECTION
// ======================

const connection = mysql.createConnection({
    host: "localhost",
    user: "parking_user",
    password: "1234",
    database: "smart_parking"
});

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

// ======================
// STORE VEHICLE ENTRY
// ======================

function parkVehicle(vehicleNo, vehicleType, slotId, callback) {

    const sql = `
        INSERT INTO parking
        (vehicle_no, vehicle_type, slot_id)
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [vehicleNo, vehicleType, slotId],
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// MARK SLOT OCCUPIED
// ======================

function occupySlot(slotId, callback) {

    const sql =
        "UPDATE slots SET occupied = 1 WHERE id = ?";

    connection.query(
        sql,
        [slotId],
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// FREE SLOT
// ======================

function freeSlot(slotId, callback) {

    const sql =
        "UPDATE slots SET occupied = 0 WHERE id = ?";

    connection.query(
        sql,
        [slotId],
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// FIND AVAILABLE SLOT
// ======================

function getAvailableSlot(type, callback) {

    const sql = `
        SELECT *
        FROM slots
        WHERE type = ?
        AND occupied = 0
        ORDER BY id
        LIMIT 1
    `;

    connection.query(
        sql,
        [type],
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// FIND ACTIVE VEHICLE
// ======================

function findVehicle(vehicleNo, callback) {

    const sql = `
        SELECT *
        FROM parking
        WHERE vehicle_no = ?
        AND exit_time IS NULL
    `;

    connection.query(
        sql,
        [vehicleNo],
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// GET ALL VEHICLES
// ======================

function getAllVehicles(callback) {

    const sql = `
        SELECT *
        FROM parking
        ORDER BY entry_time DESC
    `;

    connection.query(
        sql,
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// GET ALL SLOTS
// ======================

function getAllSlots(callback) {

    const sql = `
        SELECT *
        FROM slots
        ORDER BY id
    `;

    connection.query(
        sql,
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// DASHBOARD STATISTICS
// ======================

function getStatistics(callback) {

    const sql = `
        SELECT
            COUNT(*) AS total_slots,
            SUM(occupied = 1) AS occupied_slots,
            SUM(occupied = 0) AS free_slots
        FROM slots
    `;

    connection.query(
        sql,
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// VEHICLE EXIT
// ======================

function removeVehicle(vehicleNo, callback) {

    const sql = `
        UPDATE parking
        SET exit_time = CURRENT_TIMESTAMP
        WHERE vehicle_no = ?
        AND exit_time IS NULL
    `;

    connection.query(
        sql,
        [vehicleNo],
        (err, result) => {
            callback(err, result);
        }
    );
}

// ======================
// EXPORTS
// ======================

module.exports = {
    connection,
    parkVehicle,
    occupySlot,
    freeSlot,
    getAvailableSlot,
    findVehicle,
    getAllVehicles,
    getAllSlots,
    getStatistics,
    removeVehicle
};