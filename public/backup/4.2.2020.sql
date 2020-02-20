-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.16 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for parking_local1
DROP DATABASE IF EXISTS `parking_local1`;
CREATE DATABASE IF NOT EXISTS `parking_local1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `parking_local1`;

-- Dumping structure for table parking_local1.location_vehicle
DROP TABLE IF EXISTS `location_vehicle`;
CREATE TABLE IF NOT EXISTS `location_vehicle` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rfid` varchar(20) DEFAULT NULL,
  `node_id` int(3) unsigned NOT NULL,
  `destination_id` int(3) unsigned DEFAULT NULL,
  `create_at` datetime DEFAULT '2000-01-01 00:00:00',
  PRIMARY KEY (`id`),
  KEY `FK_location_vehicle_node_device` (`node_id`),
  KEY `FK_location_vehicle_node_device_2` (`destination_id`),
  CONSTRAINT `FK_location_vehicle_node_device` FOREIGN KEY (`node_id`) REFERENCES `node_device` (`id`),
  CONSTRAINT `FK_location_vehicle_node_device_2` FOREIGN KEY (`destination_id`) REFERENCES `node_device` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.location_vehicle: ~2 rows (approximately)
/*!40000 ALTER TABLE `location_vehicle` DISABLE KEYS */;
INSERT INTO `location_vehicle` (`id`, `rfid`, `node_id`, `destination_id`, `create_at`) VALUES
	(1, NULL, 1, 2, '2000-01-01 00:00:00'),
	(2, NULL, 2, NULL, '2000-01-01 00:00:00');
/*!40000 ALTER TABLE `location_vehicle` ENABLE KEYS */;

-- Dumping structure for table parking_local1.media
DROP TABLE IF EXISTS `media`;
CREATE TABLE IF NOT EXISTS `media` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `company` varchar(50) DEFAULT NULL,
  `link` varchar(50) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.media: ~2 rows (approximately)
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` (`id`, `name`, `company`, `link`, `create_at`) VALUES
	(1, 'map', 'p', 'http://localhost:80/public/media/map.jpg', '2020-02-04 00:46:30'),
	(2, 'QC1', 'ptit', 'http://localhost:80/public/media/qc1.mp4', '2020-02-04 00:47:32');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;

-- Dumping structure for table parking_local1.node_device
DROP TABLE IF EXISTS `node_device`;
CREATE TABLE IF NOT EXISTS `node_device` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `park_name` varchar(100) DEFAULT NULL,
  `row` varchar(3) NOT NULL,
  `col` varchar(3) NOT NULL,
  `x_pixcel` int(7) unsigned zerofill DEFAULT NULL,
  `y_pixcel` int(7) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.node_device: ~2 rows (approximately)
/*!40000 ALTER TABLE `node_device` DISABLE KEYS */;
INSERT INTO `node_device` (`id`, `ip`, `name`, `park_name`, `row`, `col`, `x_pixcel`, `y_pixcel`) VALUES
	(1, '192.168.0.1', 'node1', 'ptit', '1', '1', 0000012, 0001114),
	(2, '192.168.0.2', 'node2', 'ptit', '1', '2', 0000014, 0000014);
/*!40000 ALTER TABLE `node_device` ENABLE KEYS */;

-- Dumping structure for table parking_local1.node_status
DROP TABLE IF EXISTS `node_status`;
CREATE TABLE IF NOT EXISTS `node_status` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `node_id` int(20) unsigned NOT NULL,
  `status` int(20) unsigned DEFAULT NULL COMMENT '1: còn sống, 2: cập nhật media, 3: cập nhật lập lịch',
  `create_at` datetime NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_node_status_node_device` (`node_id`),
  CONSTRAINT `FK_node_status_node_device` FOREIGN KEY (`node_id`) REFERENCES `node_device` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.node_status: ~2 rows (approximately)
/*!40000 ALTER TABLE `node_status` DISABLE KEYS */;
INSERT INTO `node_status` (`id`, `node_id`, `status`, `create_at`, `note`) VALUES
	(1, 1, 1, '2020-02-04 00:42:51', NULL),
	(2, 2, 2, '2020-02-04 00:45:15', NULL);
/*!40000 ALTER TABLE `node_status` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
