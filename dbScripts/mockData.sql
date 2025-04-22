USE zapp;

-- ########################
-- 1) PARKING ZONES
-- ########################
INSERT INTO parking_zones (id, name, description, location) VALUES
  (1, 'Keskusta',      'Downtown parking zone', ST_GeomFromText('MULTIPOINT((24.9384 60.1699),(24.9390 60.1705))', 4326)),
  (2, 'Rautatieasema',  'Station area',         ST_GeomFromText('MULTIPOINT((24.9410 60.1700),(24.9420 60.1705))', 4326)),
  (3, 'Olympialaituri','Olympic Harbor',       ST_GeomFromText('MULTIPOINT((24.9450 60.1750),(24.9460 60.1755))', 4326));

-- ########################
-- 2) USERS
-- ########################
INSERT INTO users (id, email,             firstname, lastname, password,     phone_number, postnumber, address,           is_validated, role,    created_at) VALUES
  (1, 'admin@example.com', 'Admin',     'User',   'password',   '0501234567', '00100',    'Admin Street 1',   TRUE,         'admin', NOW()),
  (2, 'dealer@example.com','Dealer',    'One',    'dealerpass', '0502345678', '00101',    'Dealer Avenue 2',  TRUE,         'dealer',NOW()),
  (3, 'user1@example.com', 'User',      'One',    'userpass1',  '0503456789', '00102',    'User Road 3',      TRUE,         'user',  NOW()),
  (4, 'user2@example.com', 'User',      'Two',    'userpass2',  '0504567890', '00103',    'User Lane 4',      FALSE,        'user',  NOW());

-- ########################
-- 3) DEALERSHIPS
-- ########################
INSERT INTO dealerships (id, name,          address,           contact_id) VALUES
  (1, 'City Cars',    'City Street 10',    2),
  (2, 'Harbor Autos', 'Harbor Road 20',   NULL);

-- ########################
-- 4) CARS
-- ########################
INSERT INTO cars (id, dealership_id, brand, model, year, license_plate, seats, location_id, latitude,  longitude,   is_reserved) VALUES
  (1, 1, 'Toyota', 'Corolla', 2020, 'ABC-123', 5, 1, 60.16990000, 24.93840000, FALSE),
  (2, 1, 'Honda',  'Civic',   2019, 'DEF-456', 5, 2, 60.17000000, 24.94100000, TRUE),
  (3, 2, 'BMW',    'X1',      2021, 'GHI-789', 5, 3, 60.17500000, 24.94500000, FALSE),
  (4, 2, 'Audi',   'A3',      2018, 'JKL-012', 5, NULL,       NULL,        NULL,        FALSE);

-- ########################
-- 5) RESERVATIONS
-- ########################
INSERT INTO reservations (id, user_id, car_id, start_time,           end_time,             active, price, start_location,    end_location) VALUES
  (1, 3, 1, '2025-04-20 09:00:00', '2025-04-20 12:00:00', FALSE, 50.00, 'Keskusta',        'Rautatieasema'),
  (2, 4, 2, '2025-04-21 10:30:00', NULL,                 TRUE,  75.00, 'Rautatieasema',   NULL),
  (3, 3, 3, '2025-04-21 08:15:00', '2025-04-21 09:45:00', FALSE, 30.00, 'Olympialaituri',  'Keskusta'),
  (4, 4, 4, '2025-04-22 14:00:00', NULL,                 TRUE,   0.00, 'Harbor Autos',    NULL);

-- ########################
-- 6) FILES
-- ########################
INSERT INTO files (id, user_id, file_name,              file_url,                                        file_type,        file_usage,      related_type, related_id) VALUES
  (1, 3, 'profile.jpg',             'http://example.com/files/profile3.jpg',          'image/jpeg',      'profile',       'user', 3),
  (2, 1, 'admin_doc.pdf',           'http://example.com/files/admin_doc.pdf',         'application/pdf', 'documentation', 'user', 1),
  (3, 1, 'license_front_admin.jpg', 'http://example.com/files/license_front_admin.jpg','image/jpeg',      'license_front', 'user', 1),
  (4, 2, 'car1_reg.pdf',            'http://example.com/files/car1_reg.pdf',          'application/pdf', 'registration',  'car',  1),
  (5, 2, 'car2_photo.png',          'http://example.com/files/car2_photo.png',        'image/png',       'photo',         'car',  2);

-- ########################
-- 7) DRIVING LICENSES
-- ########################
INSERT INTO driving_licenses (id, user_id, front_license_url,                                   back_license_url,                                   is_verified, expiry_date, uploaded_at) VALUES
  (1, 3, 'http://example.com/files/dl_front_user1.jpg', 'http://example.com/files/dl_back_user1.jpg', TRUE,  '2028-12-31', NOW()),
  (2, 4, 'http://example.com/files/dl_front_user2.jpg', 'http://example.com/files/dl_back_user2.jpg', FALSE, '2030-06-30', NOW());

-- ########################
-- 8) DROPOFF PICTURES
-- ########################
INSERT INTO dropoff_pictures (id, reservation_id, front_url,                                 back_url,                                side_left_url,                              side_right_url,                             uploaded_at) VALUES
  (1, 1, 'http://example.com/files/dropoff1_front.jpg', 'http://example.com/files/dropoff1_back.jpg', 'http://example.com/files/dropoff1_left.jpg', 'http://example.com/files/dropoff1_right.jpg', NOW()),
  (2, 3, 'http://example.com/files/dropoff3_front.jpg', 'http://example.com/files/dropoff3_back.jpg', 'http://example.com/files/dropoff3_left.jpg', 'http://example.com/files/dropoff3_right.jpg', NOW());