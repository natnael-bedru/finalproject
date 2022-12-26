CREATE DATABASE  IF NOT EXISTS `login_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `login_system`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: login_system
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carta`
--

DROP TABLE IF EXISTS `carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenId` int DEFAULT NULL,
  `woredaId` int DEFAULT NULL,
  `img` varchar(50) DEFAULT NULL,
  `blockNumber` int DEFAULT NULL,
  `parcelNumber` int DEFAULT NULL,
  `houseNumber` int DEFAULT NULL,
  `plotArea` int DEFAULT NULL,
  `builtUpArea` int DEFAULT NULL,
  `landGrade` varchar(45) DEFAULT NULL,
  `titleDeedNo` varchar(100) DEFAULT NULL,
  `cartaIssuedDate` date DEFAULT NULL,
  `basemapNo` varchar(100) DEFAULT NULL,
  `registrationNo` varchar(100) DEFAULT NULL,
  `typeOfHolding` varchar(45) DEFAULT NULL,
  `coordinateId` int DEFAULT NULL,
  `plannedLandUse` varchar(45) DEFAULT NULL,
  `permittedUse` varchar(45) DEFAULT NULL,
  `staffId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `woredaId_idx` (`woredaId`),
  KEY `citizenId_idx` (`citizenId`),
  KEY `staffId_fk` (`staffId`),
  KEY `coordinateId_idx` (`coordinateId`),
  CONSTRAINT `citizenId` FOREIGN KEY (`citizenId`) REFERENCES `citizen` (`id`),
  CONSTRAINT `coordinateId` FOREIGN KEY (`coordinateId`) REFERENCES `coordinateland` (`id`),
  CONSTRAINT `FK_WoredaCarta` FOREIGN KEY (`woredaId`) REFERENCES `woreda` (`id`),
  CONSTRAINT `staffId_fk` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
INSERT INTO `carta` VALUES (3,1,1,'Hailu Tesfai Nataye-[2022-12-26][BFRra].png',1235,233,213,3543,6545,'345','13','2022-12-26','32436','4564','Permits hold',3,'Mixed','Mixed',3);
/*!40000 ALTER TABLE `carta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citizen`
--

DROP TABLE IF EXISTS `citizen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citizen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `middleName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `woredaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `woredaId_idx` (`woredaId`),
  CONSTRAINT `woredaId` FOREIGN KEY (`woredaId`) REFERENCES `woreda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citizen`
--

LOCK TABLES `citizen` WRITE;
/*!40000 ALTER TABLE `citizen` DISABLE KEYS */;
INSERT INTO `citizen` VALUES (1,'Male/1.jpg','Hailu','Tesfai','Nataye','Male','0911223344','1987-10-31',1),(2,'Male/2.jpg','Abera','Misgina','Noab','Male','0955667788','1984-01-29',2),(3,'Male/3.jpg','Gizaw','Barnabas','Gorfu','Male','0912121212','1997-03-03',3),(4,'Male/4.jpg','Aregawi','Iskinder','Siyoum','Male','0913131313','1991-07-07',1),(5,'Male/5.jpg','Eyoab','Beyne','Taye','Male','0914141414','1991-11-04',2),(6,'Male/6.jpg','Zewedu','Feleke','Caleb','Male','0915151515','2001-11-10',3),(7,'Male/7.jpg','Abera','Misgina','Noab','Male','0955667788','1984-01-29',2),(8,'Male/8.jpg','Gizaw','Barnabas','Gorfu','Male','0912121212','1997-03-03',3),(9,'Male/9.jpg','Aregawi','Iskinder','Siyoum','Male','0913131313','1991-07-07',1),(10,'Male/10.jpg','Eyoab','Beyne','Taye','Male','0914141414','1991-11-04',2),(11,'Male/11.jpg','Zewedu','Feleke','Caleb','Male','0915151515','2001-11-10',3),(12,'Female/1.jpg','Mahdere','Negasi','Getahun','Female','0916161616','1994-12-10',1),(13,'Female/2.jpg','Gadesse','Tamru','Wagaye','Female','0917171717','1996-05-12',2),(14,'Female/3.jpg','Tesfaye','Goliad','Keya','Female','0918181818','1993-08-22',3),(15,'Female/4.jpg','Melat','Legesse','Meba','Female','0921212121','1989-11-09',1),(16,'Female/5.jpg','Habte','Amare','Galawdeyos','Female','0923232323','1993-04-25',2),(17,'Female/6.jpg','Dagem','Tiruneh','Tewolde','Female','0924242424','1987-12-18',3);
/*!40000 ALTER TABLE `citizen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinateland`
--

DROP TABLE IF EXISTS `coordinateland`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinateland` (
  `id` int NOT NULL AUTO_INCREMENT,
  `X1` double DEFAULT NULL,
  `Y1` double DEFAULT NULL,
  `X2` double DEFAULT NULL,
  `Y2` double DEFAULT NULL,
  `X3` double DEFAULT NULL,
  `Y3` double DEFAULT NULL,
  `X4` double DEFAULT NULL,
  `Y4` double DEFAULT NULL,
  `X5` double DEFAULT NULL,
  `Y5` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinateland`
--

LOCK TABLES `coordinateland` WRITE;
/*!40000 ALTER TABLE `coordinateland` DISABLE KEYS */;
INSERT INTO `coordinateland` VALUES (1,145.544,3423.45,354.54,5345.456,34534.4,3234.423,4234.43,432.32,4321.32,3213.43),(2,123.234,24,234.345,234.2345,234.243,23,234.2234,2342.234,2345.324,234.32),(3,234,423,4322,342,42434,23,3234,4344,433,234);
/*!40000 ALTER TABLE `coordinateland` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Employee');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleid` int NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `assignedBy` int DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `middleName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(72) DEFAULT NULL,
  `accountStatus` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `residentAddress` varchar(200) DEFAULT NULL,
  `joinedDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`firstName`,`middleName`,`lastName`) /*!80000 INVISIBLE */,
  UNIQUE KEY `username.email_UNIQUE` (`username`,`email`) /*!80000 INVISIBLE */,
  UNIQUE KEY `phonenumber_UNIQUE` (`phoneNumber`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `roleid_idx` (`roleid`) /*!80000 INVISIBLE */,
  KEY `id_idx` (`assignedBy`) /*!80000 INVISIBLE */,
  CONSTRAINT `id` FOREIGN KEY (`assignedBy`) REFERENCES `staff` (`id`),
  CONSTRAINT `roleid` FOREIGN KEY (`roleid`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,1,'Admin/Natnael abc Abdulkadir-16.png',NULL,'Natnael','Bedru','Abdulkadir','Nati','$2b$10$rIRw3Fjdx0MUsueeV8.Cw.XTJIpoYXhvzEqQybohzYjXyUSQ3PV/O','Active','nati@gmail.com','0911223344','Male','1920-09-09','Bole','2022-12-16'),(2,1,'Unspecified/defaultPicture.png',1,'Kebede','Gebre','Yohannes','kebede','$2b$10$pXmnnK9p14roLrAQ5mrvf.YInI8FmwFxshW8vKH4P6tXolyWWYmw2','Active','natiwe@gmail.com','0911223343','Male','2022-12-15','Gergi','2022-12-19'),(3,2,'Employee/Alemu Shemsu Kebede-26.png',2,'Alemu','Shemsu','Kebede','alemu','$2b$10$S1Pchmn.QH80cxXIux0c3Oi.rH42g7UnM2ELCWge4GFA6AMoEcx5e','Active','alemu@gmail.com','0912345678','Male','2022-12-14','Saris','2022-12-19'),(4,2,'Employee/Dave Shimelis Akalu-[2022-12-25][In9OK].png',1,'Dave','Shimelis','Akalu','dave','$2b$10$UtVEc2vQMwH.HLeeGfogaeBB0Rl9lkZxAw.mo5h/50UmIsUA6YZ3u','Active','dave@gmail.com','0911223369','Male','2022-12-10','Kebena','2022-12-25');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcity`
--

DROP TABLE IF EXISTS `subcity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subCityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcity`
--

LOCK TABLES `subcity` WRITE;
/*!40000 ALTER TABLE `subcity` DISABLE KEYS */;
INSERT INTO `subcity` VALUES (1,'Addis Ketema'),(2,'Akaky Kaliti'),(3,'Arada'),(4,'Bole'),(5,'Gullele'),(6,'Kirkos'),(7,'Kolfe Keranio'),(8,'Lideta'),(9,'Nifas Silk-Lafto'),(10,'Yeka');
/*!40000 ALTER TABLE `subcity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `woreda`
--

DROP TABLE IF EXISTS `woreda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `woreda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subCityId` int DEFAULT NULL,
  `woredaNumber` int DEFAULT NULL,
  `kebeleNumber` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subCityId_idx` (`subCityId`),
  CONSTRAINT `subCityId` FOREIGN KEY (`subCityId`) REFERENCES `subcity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `woreda`
--

LOCK TABLES `woreda` WRITE;
/*!40000 ALTER TABLE `woreda` DISABLE KEYS */;
INSERT INTO `woreda` VALUES (1,10,12,9),(2,10,11,5),(3,10,6,14);
/*!40000 ALTER TABLE `woreda` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-26 12:41:25
