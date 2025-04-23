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
  is_validated BOOLEAN DEFAULT FALSE,
  role ENUM('admin', 'dealer', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dealerships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  registeration_number VARCHAR(255) NOT NULL UNIQUE,
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
  is_reserved BOOLEAN DEFAULT FALSE,
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

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL, -- The user who uploaded the file
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_usage VARCHAR(50) NOT NULL,
  related_type ENUM('user', 'car') NOT NULL, -- The type of entity the file is related to (user or car)
  related_id INT NOT NULL, -- The ID of the user or car the file is related to
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE driving_licenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  front_license_url VARCHAR(255) NOT NULL,
  back_license_url VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  expiry_date DATE DEFAULT NULL, -- Expiry date of the driving license, Admin can set this while verifying the license
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE dropoff_pictures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT NOT NULL,
  front_url VARCHAR(255) NOT NULL,
  back_url VARCHAR(255) NOT NULL,
  side_left_url VARCHAR(255) NOT NULL,
  side_right_url VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE
);

CREATE TABLE invite_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token_hash BINARY(32) NOT NULL UNIQUE, -- Assuming SHA-256 hash
  role_to_assign ENUM('admin', 'dealer') NOT NULL,
  created_by INT NOT NULL, -- The user who created the token
  is_used BOOLEAN DEFAULT FALSE,
  used_by INT DEFAULT NULL, -- The user who used the token
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (used_by) REFERENCES users(id) ON DELETE SET NULL
);