CREATE DATABASE smart_parking;
USE smart_parking;

CREATE TABLE slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(10),
    occupied INT DEFAULT 0
);

CREATE TABLE parking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_no VARCHAR(20),
    slot_id INT,
    entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO slots(type, occupied) VALUES
('car',0),('car',0),('car',0),('car',0),
('bike',0),('bike',0),('bike',0),('bike',0);