/* -----------------------------------------------------------
   MOCK-DATA ZAPP-KANTAAN
   ----------------------------------------------------------- */
USE zapp;

/* --- 1. parking_zones ------------------------------------ */
INSERT INTO parking_zones (id, name, description, location)
VALUES
  (1, 'City Center Zone A', 'Keskustan pysäköintialue',
     ST_GeomFromText('MULTIPOINT((24.9384 60.1699),(24.9400 60.1700))', 4326)),
  (2, 'Airport Zone', 'Lentokentän pysäköintialue',
     ST_GeomFromText('MULTIPOINT((24.9633 60.3172),(24.9650 60.3180))', 4326));

/* --- 2. users -------------------------------------------- */
INSERT INTO users
  (id, email, firstname, lastname, password, phone_number,
   postnumber, address, is_validated, role, created_at)
VALUES
  
  (1, 'admin@zapp.fi',        'Mikko',  'Manager',
     '$2y$10$abcdefg1234567890', '0400000001',
     '00100', 'Main Street 1, Helsinki', 1, 'admin',  '2025-04-20 08:00:00'),
  (2, 'dealer@dealer.fi',     'Anna',   'Autokauppias',
     '$2y$10$hijklmn1234567890','0400000002',
     '00200', 'Dealer Road 2, Espoo',    1, 'dealer', '2025-04-21 09:00:00'),
  (3, 'john.doe@example.com', 'John',   'Doe',
     '$2y$10$opqrstu1234567890','0400000003',
     '00150', 'Example St 3, Helsinki', 1, 'user',   '2025-04-22 10:00:00'),
  (4, 'emilia.lahti@example.com','Emilia','Lahti',
     '$2y$10$vwxyzab1234567890','0400000004',
     '33100', 'Sample Rd 4, Tampere',   0, 'user',   '2025-04-23 11:00:00'),
  (5, 'vasti.saarinen@example.com','Västi','Saarinen',
     '$2y$10$cdefghi1234567890','0400000005',
     '20500', 'Riverbank 5, Turku',     0, 'user',   '2025-04-24 12:00:00');

/* --- 3. dealerships -------------------------------------- */
INSERT INTO dealerships
  (name, address, registeration_number, contact_id)
VALUES
  ('Northern Motors', 'Dealer Road 2, Espoo',  'FI1234567', 4),
  ('City Cars',       'Auto Lane 3, Vantaa',   'FI7654321', 1);

/* --- 4. cars --------------------------------------------- */
INSERT INTO cars
  (id, dealership_id, brand, model, year, license_plate,
   seats, location_id, latitude, longitude, is_reserved)
VALUES
  (1, 1, 'Toyota',      'Corolla', 2022, 'ABC-123', 5,
      1, 60.169900, 24.938400, 0),
  (2, 1, 'Volkswagen',  'Golf',    2021, 'DEF-456', 5,
      1, 60.170000, 24.939500, 1),
  (3, 1, 'Tesla',       'Model 3', 2023, 'TES-001', 5,
      2, 60.317500, 24.964000, 1),
  (4, 5, 'Volvo',       'XC40',    2022, 'GHI-789', 5,
      2, 60.318000, 24.965000, 0);

/* --- 5. reservations ------------------------------------- */
INSERT INTO reservations
  (id, user_id, car_id, start_time, end_time,
   active, price, start_location, end_location)
VALUES
  (1, 3, 1, '2025-04-25 10:00:00', '2025-04-25 14:00:00',
      0, 25.00, 'City Center Zone A', 'City Center Zone A'),
  (2, 4, 3, '2025-04-27 12:00:00', NULL,
      1,  0.00, 'Airport Zone',       NULL),
  (3, 5, 2, '2025-04-28 09:00:00', NULL,
      1,  0.00, 'City Center Zone A', NULL);

/* --- 6. files -------------------------------------------- */
INSERT INTO files
  (id, user_id, file_name, file_url, file_type, file_usage,
   related_type, related_id, uploaded_at)
VALUES
  (1, 3, 'profile_john.jpg',
      'https://example.com/files/profile_john.jpg',
      'image/jpeg', 'profile', 'user', 3, '2025-04-22 10:05:00'),
  (2, 1, 'toyota_corolla_front.jpg',
      'https://example.com/files/toyota_corolla_front.jpg',
      'image/jpeg', 'vehicle', 'car',  1, '2025-04-25 09:50:00'),
  (3, 2, 'tesla_model3_side.jpg',
      'https://example.com/files/tesla_model3_side.jpg',
      'image/jpeg', 'vehicle', 'car',  3, '2025-04-27 11:50:00');

/* --- 7. driving_licenses --------------------------------- */
INSERT INTO driving_licenses
  (id, user_id, front_license_url, back_license_url,
   is_verified, expiry_date, uploaded_at)
VALUES
  (1, 3,
     'https://example.com/licenses/john_front.jpg',
     'https://example.com/licenses/john_back.jpg',
     1, '2028-05-31', '2025-04-22 10:06:00'),
  (2, 4,
     'https://example.com/licenses/emilia_front.jpg',
     'https://example.com/licenses/emilia_back.jpg',
     0, '2027-03-15', '2025-04-23 11:06:00'),
  (3, 5,
     'https://example.com/licenses/vasti_front.jpg',
     'https://example.com/licenses/vasti_back.jpg',
     0, '2029-08-20', '2025-04-24 12:06:00');

/* --- 8. dropoff_pictures --------------------------------- */
INSERT INTO dropoff_pictures
  (id, reservation_id, front_url, back_url,
   side_left_url, side_right_url, uploaded_at)
VALUES
  (1, 1,
     'https://example.com/dropoff/1/front.jpg',
     'https://example.com/dropoff/1/back.jpg',
     'https://example.com/dropoff/1/left.jpg',
     'https://example.com/dropoff/1/right.jpg',
     '2025-04-25 14:05:00');

/* --- 9. invite_tokens ------------------------------------ */
INSERT INTO invite_tokens
  (id, token_hash, role_to_assign, created_by,
   is_used, used_by, expires_at, created_at)
VALUES
  (1,
     UNHEX('3F8B1E2A4D6C7F8B9A0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F2'),
     'dealer', 1, 0, NULL,
     '2025-05-30 23:59:59', '2025-04-20 08:03:00'),
  (2,
     UNHEX('1A2B3C4D5E6F70819293949596979899A0B1C2D3E4F5061728394A5B6C7D8E9F'),
     'admin',  1, 1, 2,
     '2025-05-15 23:59:59', '2025-04-21 09:05:00');