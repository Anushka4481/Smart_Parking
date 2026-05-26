const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "smart_parking"
});

db.connect((err) => {
    if (err) console.log("DB Error:", err);
    else console.log("MySQL Connected");
});

module.exports = db;