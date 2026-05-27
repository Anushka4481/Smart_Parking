CREATE DATABASE IF NOT EXISTS smart_parking;

USE smart_parking;

DROP TABLE IF EXISTS parking;
DROP TABLE IF EXISTS slots;

CREATE TABLE slots (
    id INT PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    occupied TINYINT(1) DEFAULT 0
);

CREATE TABLE parking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_no VARCHAR(20) NOT NULL,
    vehicle_type VARCHAR(10) NOT NULL,
    slot_id INT NOT NULL,
    entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    exit_time DATETIME NULL,
    fee DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (slot_id)
    REFERENCES slots(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO slots (id, type, occupied) VALUES
(10,'car',0),
(11,'car',0),
(12,'car',0),
(13,'car',0),
(14,'car',0),
(15,'car',0),
(16,'car',0),
(17,'car',0),
(18,'car',0),
(19,'car',0),

(20,'bike',0),
(21,'bike',0),
(22,'bike',0),
(23,'bike',0),
(24,'bike',0),
(25,'bike',0),
(26,'bike',0),
(27,'bike',0),
(28,'bike',0),
(29,'bike',0);