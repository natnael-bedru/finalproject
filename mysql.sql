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
  CONSTRAINT `citizenId` FOREIGN KEY (`citizenId`) REFERENCES `citizen` (`id`),
  CONSTRAINT `staffId_fk` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
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
  `firstName` varchar(45) DEFAULT NULL,
  `middleName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `residentAddress` varchar(45) DEFAULT NULL,
  `woredaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `woredaId_idx` (`woredaId`),
  CONSTRAINT `woredaId` FOREIGN KEY (`woredaId`) REFERENCES `woreda` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citizen`
--

LOCK TABLES `citizen` WRITE;
/*!40000 ALTER TABLE `citizen` DISABLE KEYS */;
/*!40000 ALTER TABLE `citizen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(45) DEFAULT NULL,
  `acronym` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (12,1,NULL,'Natnael','Bedru','Abdulkadir','Nati','$2b$10$rIRw3Fjdx0MUsueeV8.Cw.XTJIpoYXhvzEqQybohzYjXyUSQ3PV/O','Active','nati@gmail.com','0911223344','Male','1920-09-09',NULL,'2022-12-16'),(14,2,12,'Kebede','Abe','Shemsu','Kebede','$2b$10$neNJICTR0/FDRiU.kCrjNe5Li/uuERjHDNMbOLeSpVzTMTUP9Svli','Active','kebe@gmail.com','0922334455','Female','1911-03-15',NULL,'2022-12-16'),(15,2,NULL,'Sami','Shemsu','Hopa','Sami','$2b$10$rIRw3Fjdx0MUsueeV8.Cw.XTJIpoYXhvzEqQybohzYjXyUSQ3PV/O','Active','sami@gmail.com','1122334455','Male','1955-06-10',NULL,'2022-12-16'),(129,1,12,'Natnael','Bedru','qwerq','daveqwer','$2b$10$zU/0W5TNypgDtNGa8UTTuOBJJWA39XnoN4VVFeHQDjIOOWSC9X6ky','Active','qwqw@gmail.com','091122334432324','Male','2022-12-16','qwerqwe','2022-06-17');
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
  `cityId` int DEFAULT NULL,
  `subCityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cityId_idx` (`cityId`),
  CONSTRAINT `cityId` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcity`
--

LOCK TABLES `subcity` WRITE;
/*!40000 ALTER TABLE `subcity` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `woreda`
--

LOCK TABLES `woreda` WRITE;
/*!40000 ALTER TABLE `woreda` DISABLE KEYS */;
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

-- Dump completed on 2022-12-15  3:25:25