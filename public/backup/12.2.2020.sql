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
  `create_at` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_location_vehicle_node_device` (`node_id`),
  CONSTRAINT `FK_location_vehicle_node_device` FOREIGN KEY (`node_id`) REFERENCES `node_device` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.location_vehicle: ~5 rows (approximately)
/*!40000 ALTER TABLE `location_vehicle` DISABLE KEYS */;
INSERT INTO `location_vehicle` (`id`, `rfid`, `node_id`, `create_at`, `status`) VALUES
	(1, '123456', 2, '2000-01-01 00:00:00', 0),
	(3, 'wqeew', 3, '2000-01-01 00:00:00', 0),
	(4, 'sdsd', 2, '2020-09-02 16:35:34', 0),
	(5, '123456', 2, '2020-10-02 00:29:56', 0),
	(6, 'sdsd', 2, '2020-11-02 23:55:11', 0);
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
  `ip` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `park_name` varchar(100) NOT NULL,
  `row` varchar(3) NOT NULL,
  `col` varchar(3) NOT NULL,
  `x_pixcel` int(7) unsigned DEFAULT NULL,
  `y_pixcel` int(7) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.node_device: ~9 rows (approximately)
/*!40000 ALTER TABLE `node_device` DISABLE KEYS */;
INSERT INTO `node_device` (`id`, `ip`, `name`, `park_name`, `row`, `col`, `x_pixcel`, `y_pixcel`) VALUES
	(1, '192.168.0.1', 'node1', 'ptit', '1', '1', 12, 1114),
	(2, '192.168.0.2', 'node2', 'ptit', '1', '2', 14, 14),
	(3, '192.168.0.3', 'node3', 'ptit', '1', '3', 12, 1114),
	(4, '192.168.0.4', 'node3', 'ptit', '1', '3', 12, 1114),
	(5, '192.168.0.5', 'cuong', 'ptit', '1', '3', 12, 1114),
	(6, '192.168.0.6', 'node6', 'ptit', '1', '3', NULL, NULL),
	(7, '192.168.0.6', 'node6', 'ptit', '1', '3', NULL, NULL),
	(8, '192.168.0.8', 'node9', 'ptit', '1', '2', 14, 14),
	(9, '192.168.0.9', 'node8', 'ptit', '1', '3', 12, 1114);
/*!40000 ALTER TABLE `node_device` ENABLE KEYS */;

-- Dumping structure for table parking_local1.node_status
DROP TABLE IF EXISTS `node_status`;
CREATE TABLE IF NOT EXISTS `node_status` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `node_id` int(20) unsigned NOT NULL,
  `status` int(20) unsigned NOT NULL COMMENT '1: còn sống, 2: cập nhật media, 3: cập nhật lập lịch',
  `create_at` datetime NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_node_status_node_device` (`node_id`),
  CONSTRAINT `FK_node_status_node_device` FOREIGN KEY (`node_id`) REFERENCES `node_device` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parking_local1.node_status: ~26 rows (approximately)
/*!40000 ALTER TABLE `node_status` DISABLE KEYS */;
INSERT INTO `node_status` (`id`, `node_id`, `status`, `create_at`, `note`) VALUES
	(1, 1, 1, '2020-02-04 00:42:51', NULL),
	(2, 2, 2, '2020-02-04 00:45:15', NULL),
	(3, 3, 1, '2020-02-07 00:24:15', NULL),
	(4, 1, 2, '2020-02-08 00:24:37', NULL),
	(5, 2, 2, '2020-02-09 00:27:55', NULL),
	(6, 3, 2, '2020-07-02 00:24:15', NULL),
	(7, 3, 2, '2020-07-02 00:24:15', NULL),
	(8, 3, 2, '2020-07-02 00:24:15', NULL),
	(9, 3, 2, '2020-07-02 00:24:15', NULL),
	(10, 3, 2, '2020-07-02 00:24:15', NULL),
	(11, 3, 2, '2020-07-02 00:24:15', 'yf'),
	(12, 3, 2, '2020-07-02 00:24:15', NULL),
	(13, 3, 2, '2020-07-02 00:24:15', NULL),
	(14, 3, 2, '2020-07-02 00:24:15', NULL),
	(15, 3, 2, '2020-07-02 00:24:15', NULL),
	(16, 3, 2, '2020-07-02 00:24:15', NULL),
	(17, 3, 2, '2020-07-02 00:24:15', NULL),
	(18, 3, 2, '2020-07-02 00:24:15', NULL),
	(19, 3, 2, '2020-07-02 00:24:15', NULL),
	(20, 3, 2, '2020-07-02 00:24:15', NULL),
	(21, 3, 2, '2020-07-02 00:24:15', NULL),
	(22, 3, 2, '2020-07-02 00:24:15', NULL),
	(23, 3, 2, '2020-07-02 00:24:15', NULL),
	(24, 3, 4, '2020-07-02 00:24:15', NULL),
	(25, 3, 1, '2020-07-02 00:24:15', NULL),
	(26, 3, 1, '2020-07-02 00:24:15', NULL);
/*!40000 ALTER TABLE `node_status` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
