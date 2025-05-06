CREATE USER 'zapproot'@'localhost' IDENTIFIED BY 'password123!';
GRANT ALL PRIVILEGES ON `zapp`.* TO 'zapproot'@'localhost';
FLUSH PRIVILEGES;
CREATE USER 'zapproot'@'localhost' IDENTIFIED BY 'ZapDealer69!';
GRANT ALL PRIVILEGES ON `zapp`.* TO 'zapproot'@'localhost';
FLUSH PRIVILEGES;