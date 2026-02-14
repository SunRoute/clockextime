CREATE DATABASE IF NOT EXISTS timeclock;
USE timeclock;
-- -------------------------------------
-- TABLA ROLES
-- -------------------------------------
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- -------------------------------------
-- TABLA USUARIOS
-- -------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_number VARCHAR(20) NOT NULL UNIQUE,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    daily_working_hours INT NOT NULL DEFAULT 8,
    weekly_working_hours INT NOT NULL DEFAULT 40,
    role_id INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    password_changed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- -------------------------------------
-- TABLA FICHAJES
-- -------------------------------------
CREATE TABLE IF NOT EXISTS time_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_recorded DATE NOT NULL,
    clock_in DATETIME,
    clock_out DATETIME,
    worked_hours DECIMAL(5,2),
    possible_overtime BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -------------------------------------
-- TABLA HORAS EXTRA
-- -------------------------------------
CREATE TABLE IF NOT EXISTS overtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time_record_id INT NOT NULL,
    overtime_hours DECIMAL(5,2) NOT NULL,
    reason TEXT,
    overtime_status ENUM('pendiente','aprobada','rechazada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (time_record_id) REFERENCES time_records(id)
        ON DELETE CASCADE
);

-- -------------------------------------
-- TABLA NOTIFICACIONES
-- -------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    notification_message TEXT NOT NULL,
    read_notification BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);