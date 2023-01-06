CREATE DATABASE  IF NOT EXISTS `lras_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lras_system`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lras_system
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
  `lastModifiedBy` int DEFAULT NULL,
  `lastModifiedDate` date DEFAULT NULL,
  `generatedPassword` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `woredaId_idx` (`woredaId`),
  KEY `citizenId_idx` (`citizenId`),
  KEY `staffId_fk` (`staffId`),
  KEY `coordinateId_idx` (`coordinateId`),
  KEY `lastModifiedBy_fk_idx` (`lastModifiedBy`),
  CONSTRAINT `citizenId` FOREIGN KEY (`citizenId`) REFERENCES `citizen` (`id`),
  CONSTRAINT `coordinateId` FOREIGN KEY (`coordinateId`) REFERENCES `coordinateland` (`id`),
  CONSTRAINT `FK_WoredaCarta` FOREIGN KEY (`woredaId`) REFERENCES `woreda` (`id`),
  CONSTRAINT `staffId_fk` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
INSERT INTO `carta` VALUES (6,1,1,'Hailu Tesfai Nataye-[2023-01-05][CbMCJ].png',33333,44444,222222,77777,888888,'66666','1111','2023-01-05','55555','99999','Permits hold',6,'Mixed','Residence',7,7,'2023-01-05',NULL),(14,2,1,'Abera Misgina Noab-[2023-01-06][OnEbb].png',232,2345,4234,22253,33356,'22566','2323','2023-01-06','2252','22','Permits hold',16,'Residence','Mixed',3,3,'2023-01-06','3GG4234CNH'),(15,2,3,'Abera Misgina Noab-[2023-01-06][E08aq].png',26223,3532,2352,223,3262,'2525','2234','2023-01-06','2562','3562','Permits hold',17,'Mixed','Residence',3,3,'2023-01-06','5UC2352H0D');
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
INSERT INTO `citizen` VALUES (1,'Male/1.jpg','Hailu','Tesfai','Nataye','Male','0911223344','1987-10-31',1),(2,'Male/2.jpg','Abera','Misgina','Noab','Male','0955667788','1984-01-29',2),(3,'Male/3.jpg','Gizaw','Barnabas','Gorfu','Male','0912121212','1997-03-03',3),(4,'Male/4.jpg','Aregawi','Iskinder','Siyoum','Male','0913131313','1991-07-07',1),(5,'Male/5.jpg','Eyoab','Beyne','Taye','Male','0914141414','1991-11-04',2),(6,'Male/6.jpg','Zewedu','Feleke','Caleb','Male','0915151515','2001-11-10',3),(7,'Male/7.jpg','Eyasu','Duri','Bessufekad','Male','0955667788','1984-01-29',2),(8,'Male/8.jpg','Ephraim','Aklilu','Abdellahi','Male','0912121212','1997-03-03',3),(9,'Male/9.jpg','Benyam','Basliel','Ketema','Male','0913131313','1991-07-07',1),(10,'Male/10.jpg','Adamu','Teka','Belayneh','Male','0914141414','1991-11-04',2),(11,'Male/11.jpg','Iyasu','Hagos','Atikem','Male','0915151515','2001-11-10',3),(12,'Female/1.jpg','Mahdere','Negasi','Getahun','Female','0916161616','1994-12-10',1),(13,'Female/2.jpg','Gadesse','Tamru','Wagaye','Female','0917171717','1996-05-12',2),(14,'Female/3.jpg','Tesfaye','Goliad','Keya','Female','0918181818','1993-08-22',3),(15,'Female/4.jpg','Melat','Legesse','Meba','Female','0921212121','1989-11-09',1),(16,'Female/5.jpg','Habte','Amare','Galawdeyos','Female','0923232323','1993-04-25',2),(17,'Female/6.jpg','Dagem','Tiruneh','Tewolde','Female','0924242424','1987-12-18',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinateland`
--

LOCK TABLES `coordinateland` WRITE;
/*!40000 ALTER TABLE `coordinateland` DISABLE KEYS */;
INSERT INTO `coordinateland` VALUES (6,111.9999,222.8888,3333.7777,4444.6666,5555.555,66666.4444,777.333,8888.222,9999.1111,12121.565),(7,333,444,555,443,335,445,5436,3345,445,225),(8,333,444,555,443,335,445,5436,3345,445,225),(9,333,444,555,443,335,445,5436,3345,445,225),(10,333,444,555,443,335,445,5436,3345,445,225),(11,224,3345,332,344,5552,335,3355,225,3356,335),(12,224,3345,332,344,5552,335,3355,225,3356,335),(13,224,3345,332,344,5552,335,3355,225,3356,335),(14,224,3345,332,344,5552,335,3355,225,3356,335),(15,224,3345,332,344,5552,335,3355,225,3356,335),(16,224,3345,332,344,5552,335,3355,225,3356,335),(17,222,333,44,556,55,33,445,33,446,2242);
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
  `lastChanged` date DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,1,'Admin/Natnael abc Abdulkadir-16.png',NULL,'Natnael','Bedru','Abdulkadir','Nati','$2b$10$rIRw3Fjdx0MUsueeV8.Cw.XTJIpoYXhvzEqQybohzYjXyUSQ3PV/O','Active','nati@gmail.com','0911223344','Male','1920-09-09','Bole','2022-12-16','2022-12-10'),(2,1,'Unspecified/defaultPicture.png',1,'Kebede','Gebre','Yohannes','kebede','$2b$10$afUFUZ2PP7aYeqqWVaya1OPYNhvKlG8p04V8q2Jqo4..KiEY1KoNC','Active','natiwe@gmail.com','0911223343','Male','2022-12-15','Gergi','2022-12-31','2022-12-11'),(3,2,'Employee/Alemu Shemsu Kebede-26.png',2,'Alemu','Shemsu','Kebede','alemu','$2b$10$S1Pchmn.QH80cxXIux0c3Oi.rH42g7UnM2ELCWge4GFA6AMoEcx5e','Active','alemu@gmail.com','0912345678','Male','2022-12-14','Saris','2022-12-29','2022-12-12'),(7,2,'Employee/Dave Hailu Kasahun-[2023-01-01][hCr3k].png',1,'Dave','Hailu','Kasahun','dave','$2b$10$Gg/LlhhjXCEuIO19IyfXc.OSwY3nX2blhzoQMRdlP6Zc7daoxt44O','Active','dave@gmail.com','098475457','Male','1994-06-07','Saris','2023-01-04','2022-12-30'),(27,1,'Unspecified/defaultPicture.png',1,'test1','test2','test3','ewtswt','$2b$10$Sp1ZT7DiLfQokSL2rg4Qa.mI0o5oi8N1gtaNPWvAyYsCmLOWVJari','Active','ndweerat@gmail.com','0911288888','Male','2022-10-13','qwer2','2023-01-04','2023-01-04');
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

-- Dump completed on 2023-01-06 16:54:28
