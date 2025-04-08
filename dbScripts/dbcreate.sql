DROP DATABASE IF EXISTS zapp;

CREATE DATABASE zapp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE zapp;

CREATE TABLE parking_zones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  -- location GEOMETRY NOT NULL SRID 4326 -- All geometries are in WGS 84
  location MULTIPOINT NOT NULL SRID 4326 -- Assuming the location is a multipoint
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL UNIQUE,
  postnumber VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  validated BOOLEAN DEFAULT FALSE,
  role ENUM('admin', 'dealer', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dealerships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  contact_id INT DEFAULT NULL UNIQUE,
  FOREIGN KEY (contact_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dealership_id INT NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  license_plate VARCHAR(50) NOT NULL,
  seats INT NOT NULL,
  -- Check if the location_id is needed or if it can be removed, its tied to the parking_zones table
  location_id INT DEFAULT NULL, 
  latitude DECIMAL(10, 8) DEFAULT NULL,
  longitude DECIMAL(11, 8) DEFAULT NULL,
  reserved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (dealership_id) REFERENCES dealerships(id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES parking_zones(id) ON DELETE SET NULL
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  reservation_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  price DECIMAL(10, 2) DEFAULT 0,
  -- Check if the start_location and end_location should be used as geolocation
  start_location VARCHAR(255) NOT NULL,
  end_location VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);