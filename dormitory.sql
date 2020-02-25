/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : dormitory

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-02-25 21:07:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `buildingId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`buildingId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `admins_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES ('2020-02-22 14:47:30', '2020-02-22 14:47:30', '3', '2');
INSERT INTO `admins` VALUES ('2020-02-22 14:59:08', '2020-02-22 14:59:08', '6', '2');
INSERT INTO `admins` VALUES ('2020-02-24 14:22:51', '2020-02-24 14:22:51', '7', '12');

-- ----------------------------
-- Table structure for backrecords
-- ----------------------------
DROP TABLE IF EXISTS `backrecords`;
CREATE TABLE `backrecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `backrecords_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of backrecords
-- ----------------------------
INSERT INTO `backrecords` VALUES ('1', '2020-02-15 17:47:55', '2020-02-15 17:47:55', null, '1', '1');
INSERT INTO `backrecords` VALUES ('2', '2020-02-17 13:56:02', '2020-02-17 22:56:55', null, '1', '1');
INSERT INTO `backrecords` VALUES ('3', '2020-02-17 13:56:02', '2020-02-18 19:04:43', null, '4', '1');
INSERT INTO `backrecords` VALUES ('4', '2020-02-01 13:56:02', '2020-02-17 13:56:02', null, '5', '1');
INSERT INTO `backrecords` VALUES ('5', '2020-02-02 13:56:02', '2020-02-01 13:56:02', null, '5', '1');
INSERT INTO `backrecords` VALUES ('6', '2020-02-03 13:56:02', '2020-02-01 13:56:02', null, '5', '1');
INSERT INTO `backrecords` VALUES ('7', '2020-02-19 12:43:57', '2020-02-19 12:43:57', null, '1', '1');
INSERT INTO `backrecords` VALUES ('14', '2020-02-21 14:27:53', '2020-02-21 14:27:53', null, '6', '2');
INSERT INTO `backrecords` VALUES ('15', '2020-02-22 12:31:26', '2020-02-22 12:31:26', null, '1', '1');
INSERT INTO `backrecords` VALUES ('16', '2020-02-22 14:44:39', '2020-02-22 14:44:39', null, '6', '2');
INSERT INTO `backrecords` VALUES ('17', '2020-02-24 11:49:19', '2020-02-24 11:49:19', null, '5', '1');
INSERT INTO `backrecords` VALUES ('18', '2020-02-24 14:08:36', '2020-02-24 14:08:36', null, '11', '1');
INSERT INTO `backrecords` VALUES ('19', '2020-02-24 14:36:11', '2020-02-24 14:36:11', null, '1', '1');

-- ----------------------------
-- Table structure for buildings
-- ----------------------------
DROP TABLE IF EXISTS `buildings`;
CREATE TABLE `buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '楼宇名称',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buildings
-- ----------------------------
INSERT INTO `buildings` VALUES ('1', '通天苑', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null);
INSERT INTO `buildings` VALUES ('2', '大西门', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null);
INSERT INTO `buildings` VALUES ('3', '于心苑', '2020-02-21 11:36:05', '2020-02-21 11:36:07', null);
INSERT INTO `buildings` VALUES ('6', '测试楼层', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null);
INSERT INTO `buildings` VALUES ('7', '测试楼2', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null);

-- ----------------------------
-- Table structure for cleaners
-- ----------------------------
DROP TABLE IF EXISTS `cleaners`;
CREATE TABLE `cleaners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '保洁员姓名',
  `phone` varchar(255) DEFAULT NULL COMMENT '保洁员电话',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `buildingId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buildingId` (`buildingId`),
  CONSTRAINT `cleaners_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `buildings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cleaners
-- ----------------------------
INSERT INTO `cleaners` VALUES ('1', '凉风阿姨', '13822222222', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, '1');
INSERT INTO `cleaners` VALUES ('2', '巫山阿姨', '12233333333', '2020-02-22 11:09:56', '2020-02-22 11:09:56', null, '1');
INSERT INTO `cleaners` VALUES ('3', '宿舍阿姨', '12345678901', '2020-02-22 12:29:49', '2020-02-22 12:29:49', '2020-02-23 10:09:39', '1');
INSERT INTO `cleaners` VALUES ('4', '贝贝阿姨', '123455666666', '2020-02-22 12:34:11', '2020-02-22 12:34:11', null, '2');
INSERT INTO `cleaners` VALUES ('5', '测试阿姨', '12333333333', '2020-02-22 16:11:30', '2020-02-22 16:11:30', null, '6');
INSERT INTO `cleaners` VALUES ('6', '测试保洁员', '12333333333', '2020-02-24 14:23:47', '2020-02-24 14:23:47', null, '7');

-- ----------------------------
-- Table structure for cleanrecords
-- ----------------------------
DROP TABLE IF EXISTS `cleanrecords`;
CREATE TABLE `cleanrecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `cleanrecords_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cleanrecords
-- ----------------------------
INSERT INTO `cleanrecords` VALUES ('1', '2020-02-12 21:46:16', '2020-02-19 21:46:22', null, '1', '1');
INSERT INTO `cleanrecords` VALUES ('2', '2020-02-16 12:22:36', '2020-02-19 21:46:39', null, '1', '1');
INSERT INTO `cleanrecords` VALUES ('3', '2020-02-19 14:12:22', '2020-02-19 22:12:54', null, '4', '1');
INSERT INTO `cleanrecords` VALUES ('5', '2020-02-20 07:00:37', '2020-02-20 07:00:37', null, '1', '1');
INSERT INTO `cleanrecords` VALUES ('6', '2020-02-21 08:56:01', '2020-02-21 08:56:01', null, '6', '2');
INSERT INTO `cleanrecords` VALUES ('7', '2020-02-21 10:20:59', '2020-02-21 10:20:59', null, '1', '1');
INSERT INTO `cleanrecords` VALUES ('8', '2020-02-21 17:26:48', '2020-02-21 17:26:48', null, '1', '1');
INSERT INTO `cleanrecords` VALUES ('9', '2020-02-22 14:44:43', '2020-02-22 14:44:43', null, '6', '2');
INSERT INTO `cleanrecords` VALUES ('10', '2020-02-24 11:49:17', '2020-02-24 11:49:17', null, '5', '1');

-- ----------------------------
-- Table structure for evaluates
-- ----------------------------
DROP TABLE IF EXISTS `evaluates`;
CREATE TABLE `evaluates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL COMMENT '评价分数',
  `note` varchar(255) DEFAULT NULL COMMENT '评价备注',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `evaluates_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of evaluates
-- ----------------------------
INSERT INTO `evaluates` VALUES ('1', '98', '宿舍不错', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, '2', '1');
INSERT INTO `evaluates` VALUES ('2', '75', '一般般吧', '2020-02-13 21:20:13', '2020-02-13 21:20:25', null, '2', '1');
INSERT INTO `evaluates` VALUES ('3', '59', '很差劲', '2020-02-01 21:20:42', '2020-02-01 21:20:46', null, '2', '1');
INSERT INTO `evaluates` VALUES ('5', '60', '一般一般', '2020-02-24 13:50:59', '2020-02-24 14:14:19', '2020-02-24 14:14:19', '2', '1');
INSERT INTO `evaluates` VALUES ('6', '100', '不错i', '2020-02-24 13:51:55', '2020-02-24 14:01:27', '2020-02-24 14:01:27', '2', '1');
INSERT INTO `evaluates` VALUES ('7', '60', '评价测试', '2020-02-24 14:14:38', '2020-02-24 14:14:38', null, '2', '1');

-- ----------------------------
-- Table structure for floors
-- ----------------------------
DROP TABLE IF EXISTS `floors`;
CREATE TABLE `floors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layer` int(11) DEFAULT NULL COMMENT '楼层',
  `buildingId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `cleanerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`layer`,`buildingId`),
  KEY `buildingId` (`buildingId`),
  KEY `cleanerId` (`cleanerId`),
  CONSTRAINT `floors_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `buildings` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `floors_ibfk_2` FOREIGN KEY (`cleanerId`) REFERENCES `cleaners` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of floors
-- ----------------------------
INSERT INTO `floors` VALUES ('1', '1', '1', '2020-02-15 14:34:55', '2020-02-24 14:12:32', null, '1');
INSERT INTO `floors` VALUES ('2', '2', '1', '2020-02-15 14:34:55', '2020-02-24 14:12:37', null, null);
INSERT INTO `floors` VALUES ('3', '3', '1', '2020-02-15 14:34:55', '2020-02-23 10:09:51', null, '1');
INSERT INTO `floors` VALUES ('4', '4', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('5', '5', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('6', '6', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('7', '7', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('8', '8', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('9', '9', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('10', '10', '1', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `floors` VALUES ('11', '1', '3', '2020-02-21 11:36:29', '2020-02-21 11:36:31', null, null);
INSERT INTO `floors` VALUES ('14', '1', '6', '2020-02-22 14:58:45', '2020-02-22 16:11:39', null, '5');
INSERT INTO `floors` VALUES ('15', '2', '6', '2020-02-22 14:58:45', '2020-02-24 14:12:21', null, '5');
INSERT INTO `floors` VALUES ('16', '3', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, null);
INSERT INTO `floors` VALUES ('17', '4', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, null);
INSERT INTO `floors` VALUES ('18', '5', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, null);
INSERT INTO `floors` VALUES ('19', '6', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, null);
INSERT INTO `floors` VALUES ('20', '7', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, null);
INSERT INTO `floors` VALUES ('21', '8', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, null);
INSERT INTO `floors` VALUES ('22', '9', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, null);
INSERT INTO `floors` VALUES ('23', '1', '7', '2020-02-24 14:22:24', '2020-02-24 14:24:13', null, '6');
INSERT INTO `floors` VALUES ('24', '2', '7', '2020-02-24 14:22:25', '2020-02-24 14:24:19', null, '6');
INSERT INTO `floors` VALUES ('25', '3', '7', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, null);

-- ----------------------------
-- Table structure for getuprecords
-- ----------------------------
DROP TABLE IF EXISTS `getuprecords`;
CREATE TABLE `getuprecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `getuprecords_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of getuprecords
-- ----------------------------
INSERT INTO `getuprecords` VALUES ('8', '2020-02-15 12:11:17', '2020-02-15 12:11:17', null, '4', '1');
INSERT INTO `getuprecords` VALUES ('9', '2020-02-16 12:12:00', '2020-02-16 12:12:00', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('13', '2020-02-16 17:16:14', '2020-02-16 17:16:14', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('14', '2020-02-01 21:24:26', '2020-02-01 21:24:31', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('16', '2020-02-18 11:06:43', '2020-02-18 11:06:43', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('17', '2020-02-19 12:41:58', '2020-02-19 12:41:58', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('27', '2020-02-21 14:25:18', '2020-02-21 14:25:18', null, '6', '2');
INSERT INTO `getuprecords` VALUES ('28', '2020-02-22 12:31:23', '2020-02-22 12:31:23', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('29', '2020-02-22 14:44:37', '2020-02-22 14:44:37', null, '6', '2');
INSERT INTO `getuprecords` VALUES ('30', '2020-02-24 11:49:22', '2020-02-24 11:49:22', null, '5', '1');
INSERT INTO `getuprecords` VALUES ('31', '2020-01-09 19:51:21', '2020-02-06 19:51:28', null, '4', '1');
INSERT INTO `getuprecords` VALUES ('32', '2020-01-17 19:51:43', '2020-02-24 19:51:50', null, '5', '1');
INSERT INTO `getuprecords` VALUES ('33', '2020-01-24 19:52:03', '2020-02-24 19:52:08', null, '5', '1');
INSERT INTO `getuprecords` VALUES ('34', '2020-01-17 19:52:18', '2020-02-24 19:52:23', null, '5', '1');
INSERT INTO `getuprecords` VALUES ('35', '2020-01-17 19:52:30', '2020-02-05 19:52:34', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('36', '2020-01-18 19:52:43', '2020-02-24 19:52:49', null, '1', '1');
INSERT INTO `getuprecords` VALUES ('37', '2020-02-24 14:08:05', '2020-02-24 14:08:05', null, '11', '1');

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL COMMENT '房间号',
  `buildingId` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '宿舍状态，可入住为1，不可入住为2',
  `peopleNum` int(11) NOT NULL COMMENT '房间最大人数',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `floorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`number`,`buildingId`),
  KEY `buildingId` (`buildingId`),
  KEY `floorId` (`floorId`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`floorId`) REFERENCES `floors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES ('1', '101', '1', '1', '6', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, '1');
INSERT INTO `rooms` VALUES ('2', '101', '3', '1', '6', '2020-02-21 11:37:11', '2020-02-21 11:37:14', null, '11');
INSERT INTO `rooms` VALUES ('5', '101', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('6', '102', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('7', '103', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('8', '104', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('9', '105', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('10', '106', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('11', '107', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('12', '108', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('13', '109', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('14', '110', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('15', '111', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('16', '112', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('17', '113', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('18', '114', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('19', '115', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('20', '116', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('21', '117', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('22', '118', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('23', '119', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('24', '120', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '14');
INSERT INTO `rooms` VALUES ('25', '201', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('26', '202', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('27', '203', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('28', '204', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('29', '205', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('30', '206', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('31', '207', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('32', '208', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('33', '209', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('34', '210', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('35', '211', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('36', '212', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('37', '213', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('38', '214', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('39', '215', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('40', '216', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('41', '217', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('42', '218', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('43', '219', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('44', '220', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '15');
INSERT INTO `rooms` VALUES ('45', '301', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('46', '302', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('47', '303', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('48', '304', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('49', '305', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('50', '306', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('51', '307', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('52', '308', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('53', '309', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('54', '310', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('55', '311', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('56', '312', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('57', '313', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('58', '314', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('59', '315', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('60', '316', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('61', '317', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('62', '318', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('63', '319', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('64', '320', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '16');
INSERT INTO `rooms` VALUES ('65', '401', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('66', '402', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('67', '403', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('68', '404', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('69', '405', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('70', '406', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('71', '407', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('72', '408', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('73', '409', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('74', '410', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('75', '411', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('76', '412', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('77', '413', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('78', '414', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('79', '415', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('80', '416', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('81', '417', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('82', '418', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('83', '419', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('84', '420', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '17');
INSERT INTO `rooms` VALUES ('85', '501', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '18');
INSERT INTO `rooms` VALUES ('86', '502', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '18');
INSERT INTO `rooms` VALUES ('87', '503', '6', '1', '6', '2020-02-22 14:58:45', '2020-02-22 14:58:45', null, '18');
INSERT INTO `rooms` VALUES ('88', '504', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('89', '505', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('90', '506', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('91', '507', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('92', '508', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('93', '509', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('94', '510', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('95', '511', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('96', '512', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('97', '513', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('98', '514', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('99', '515', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('100', '516', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('101', '517', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('102', '518', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('103', '519', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('104', '520', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '18');
INSERT INTO `rooms` VALUES ('105', '601', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('106', '602', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('107', '603', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('108', '604', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('109', '605', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('110', '606', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('111', '607', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('112', '608', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('113', '609', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('114', '610', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('115', '611', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('116', '612', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('117', '613', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('118', '614', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('119', '615', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('120', '616', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('121', '617', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('122', '618', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('123', '619', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('124', '620', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '19');
INSERT INTO `rooms` VALUES ('125', '701', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('126', '702', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('127', '703', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('128', '704', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('129', '705', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('130', '706', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('131', '707', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('132', '708', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('133', '709', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('134', '710', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('135', '711', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('136', '712', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('137', '713', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('138', '714', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('139', '715', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('140', '716', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('141', '717', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('142', '718', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('143', '719', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('144', '720', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '20');
INSERT INTO `rooms` VALUES ('145', '801', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('146', '802', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('147', '803', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('148', '804', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('149', '805', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('150', '806', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('151', '807', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('152', '808', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('153', '809', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('154', '810', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('155', '811', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('156', '812', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('157', '813', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('158', '814', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('159', '815', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('160', '816', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('161', '817', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('162', '818', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('163', '819', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('164', '820', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '21');
INSERT INTO `rooms` VALUES ('165', '901', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('166', '902', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('167', '903', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('168', '904', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('169', '905', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('170', '906', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('171', '907', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('172', '908', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('173', '909', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('174', '910', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('175', '911', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('176', '912', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('177', '913', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('178', '914', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('179', '915', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('180', '916', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('181', '917', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('182', '918', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('183', '919', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('184', '920', '6', '1', '6', '2020-02-22 14:58:46', '2020-02-22 14:58:46', null, '22');
INSERT INTO `rooms` VALUES ('185', '101', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('186', '102', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('187', '103', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('188', '104', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('189', '105', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('190', '106', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('191', '107', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('192', '108', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('193', '109', '7', '1', '6', '2020-02-24 14:22:24', '2020-02-24 14:22:24', null, '23');
INSERT INTO `rooms` VALUES ('194', '110', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '23');
INSERT INTO `rooms` VALUES ('195', '201', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('196', '202', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('197', '203', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('198', '204', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('199', '205', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('200', '206', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('201', '207', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('202', '208', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('203', '209', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('204', '210', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '24');
INSERT INTO `rooms` VALUES ('205', '301', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('206', '302', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('207', '303', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('208', '304', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('209', '305', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('210', '306', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('211', '307', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('212', '308', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('213', '309', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');
INSERT INTO `rooms` VALUES ('214', '310', '7', '1', '6', '2020-02-24 14:22:25', '2020-02-24 14:22:25', null, '25');

-- ----------------------------
-- Table structure for tokens
-- ----------------------------
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tokens
-- ----------------------------
INSERT INTO `tokens` VALUES ('14', '2020-02-21 03:39:33', '2020-02-21 03:39:33', '6');
INSERT INTO `tokens` VALUES ('18', '2020-02-21 14:20:08', '2020-02-21 14:20:08', '6');
INSERT INTO `tokens` VALUES ('19', '2020-02-21 15:11:56', '2020-02-21 15:11:56', '7');
INSERT INTO `tokens` VALUES ('20', '2020-02-21 15:14:34', '2020-02-21 15:14:34', '3');
INSERT INTO `tokens` VALUES ('21', '2020-02-22 14:44:33', '2020-02-22 14:44:33', '6');
INSERT INTO `tokens` VALUES ('24', '2020-02-24 11:49:11', '2020-02-24 11:49:11', '5');
INSERT INTO `tokens` VALUES ('28', '2020-02-24 13:17:01', '2020-02-24 13:17:01', '10');
INSERT INTO `tokens` VALUES ('29', '2020-02-24 13:22:44', '2020-02-24 13:22:44', '2');
INSERT INTO `tokens` VALUES ('30', '2020-02-24 13:56:33', '2020-02-24 13:56:33', '3');
INSERT INTO `tokens` VALUES ('31', '2020-02-24 13:57:18', '2020-02-24 13:57:18', '2');
INSERT INTO `tokens` VALUES ('32', '2020-02-24 14:06:02', '2020-02-24 14:06:02', '11');
INSERT INTO `tokens` VALUES ('33', '2020-02-24 14:10:27', '2020-02-24 14:10:27', '2');
INSERT INTO `tokens` VALUES ('34', '2020-02-24 14:20:32', '2020-02-24 14:20:32', '3');
INSERT INTO `tokens` VALUES ('37', '2020-02-24 14:36:36', '2020-02-24 14:36:36', '11');
INSERT INTO `tokens` VALUES ('38', '2020-02-25 11:34:52', '2020-02-25 11:34:52', '1');
INSERT INTO `tokens` VALUES ('39', '2020-02-25 11:39:29', '2020-02-25 11:39:29', '1');
INSERT INTO `tokens` VALUES ('40', '2020-02-25 11:39:50', '2020-02-25 11:39:50', '4');
INSERT INTO `tokens` VALUES ('41', '2020-02-25 11:40:01', '2020-02-25 11:40:01', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'student',
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `checkTime` datetime DEFAULT NULL COMMENT '入住宿舍时间',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`account`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '123456', '$2a$10$vGnvYKcAYAOLwLF7blj2JeyORsf/BDb/5qVsIoC6ohuD0.4zln7P6', 'student', '王麻', '12222222222', '2020-02-15 14:57:14', '2020-02-15 14:34:55', '2020-02-25 11:40:09', null, '1');
INSERT INTO `users` VALUES ('2', 'admin', '$2a$10$NNZoAxHHO.NJq1AJLzp.4eRBMCRWfJbiPltpJdV3yNV4iP2cASB.K', 'admin', '王晓鹏', '1233333', null, '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, null);
INSERT INTO `users` VALUES ('3', 'superAdmin', '$2a$10$UzYrrpiCanig0CFGdqONRe.c65B9d9sEOiD1wH6B/oZCXubJKLi6m', 'superAdmin', '李达康', '122222222', null, '2020-02-15 14:34:55', '2020-02-24 14:24:53', null, null);
INSERT INTO `users` VALUES ('4', '111111', '$2a$10$Zm41SRjOlSYl2ph3.YwL/.X340x5PBdr46MOOeKDJjblHBbAYqEl2', 'student', '哇水水', '123456789011', '2020-02-15 14:34:55', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, '1');
INSERT INTO `users` VALUES ('5', '222222', '$2a$10$JAeYA769PDtIL6oqHvv7TOTaFOJZGK7iOwXsxJiMxcZb/VYNXbtrK', 'student', '王大拿', '123456789011', '2020-02-15 14:34:55', '2020-02-15 14:34:55', '2020-02-15 14:34:55', null, '1');
INSERT INTO `users` VALUES ('6', '333333', '$2a$10$IvA0ATl.h2NwRS4XFrcsxuF2eEagmwRGGieAYiAdCTA5tEz714H9W', 'student', '王彪s', '1222322333', '2020-02-21 04:49:51', '2020-02-20 07:03:17', '2020-02-21 09:02:34', null, '2');
INSERT INTO `users` VALUES ('7', '666666', '$2a$10$h8yVZoEnfOy/DnBnOq4aEOgoS1Zm81b722bV7Na.u0.xBxgzhpURC', 'student', '测试员', '1233333333333', '2020-02-21 15:12:16', '2020-02-21 15:11:55', '2020-02-21 15:12:16', null, '2');
INSERT INTO `users` VALUES ('11', '10101010', '$2a$10$urcAJNlkFOpwlJIhPV1l/egzU0uH8eGs8AxgjR5f9JAE6hR7xj7rW', 'student', '测试', '123456', '2020-02-24 14:07:27', '2020-02-24 14:05:57', '2020-02-24 14:10:00', null, '1');
INSERT INTO `users` VALUES ('12', 'admin2', '$2a$10$T0477k8Pokm9PbkFpDp6Yerh.ej3I8TTrJa3qxAPRYHWpmJfKQFu2', 'admin', 'admin2', '123', null, '2020-02-24 14:21:48', '2020-02-24 14:21:48', null, null);
