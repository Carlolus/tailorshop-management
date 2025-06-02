-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: bookstackapp
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loggable_id` int(11) DEFAULT NULL,
  `loggable_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activities_user_id_index` (`user_id`),
  KEY `activities_entity_id_index` (`loggable_id`),
  KEY `activities_key_index` (`type`),
  KEY `activities_created_at_index` (`created_at`),
  KEY `activities_ip_index` (`ip`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-22 18:56:23','2025-05-22 18:56:23'),(2,'book_create','(1) Confección',1,'172.18.0.1',1,'book','2025-05-22 20:40:49','2025-05-22 20:40:49'),(3,'chapter_create','(1) Toma de medidas',1,'172.18.0.1',1,'chapter','2025-05-22 21:12:27','2025-05-22 21:12:27'),(4,'page_create','(1) Medidas pantalón',1,'172.18.0.1',1,'page','2025-05-22 21:13:17','2025-05-22 21:13:17'),(5,'page_create','(2) Medidas chaqueta',1,'172.18.0.1',2,'page','2025-05-22 21:14:42','2025-05-22 21:14:42'),(6,'page_create','(3) Medidas chaleco',1,'172.18.0.1',3,'page','2025-05-22 21:15:27','2025-05-22 21:15:27'),(7,'page_create','(4) Medidas camisa',1,'172.18.0.1',4,'page','2025-05-22 21:17:00','2025-05-22 21:17:00'),(8,'chapter_create','(2) Trazado',1,'172.18.0.1',2,'chapter','2025-05-22 21:19:19','2025-05-22 21:19:19'),(9,'user_create','(3) Carlos Córdoba',1,'172.18.0.1',NULL,NULL,'2025-05-22 21:23:37','2025-05-22 21:23:37'),(10,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-05-22 21:24:06','2025-05-22 21:24:06'),(11,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-22 21:25:41','2025-05-22 21:25:41'),(12,'chapter_update','(1) Toma de medidas',1,'172.18.0.1',1,'chapter','2025-05-22 21:29:59','2025-05-22 21:29:59'),(13,'chapter_update','(1) Toma de medidas',1,'172.18.0.1',1,'chapter','2025-05-22 21:32:16','2025-05-22 21:32:16'),(14,'page_update','(1) Medidas pantalón',1,'172.18.0.1',1,'page','2025-05-22 21:58:58','2025-05-22 21:58:58'),(15,'page_update','(1) Medidas pantalón',1,'172.18.0.1',1,'page','2025-05-22 22:11:39','2025-05-22 22:11:39'),(16,'page_update','(1) Medidas pantalón',1,'172.18.0.1',1,'page','2025-05-22 23:20:16','2025-05-22 23:20:16'),(17,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-05-23 22:33:05','2025-05-23 22:33:05'),(18,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-23 22:33:18','2025-05-23 22:33:18'),(19,'settings_update','features',1,'172.18.0.1',NULL,NULL,'2025-05-23 22:33:46','2025-05-23 22:33:46'),(20,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-23 23:03:16','2025-05-23 23:03:16'),(21,'settings_update','features',1,'172.18.0.1',NULL,NULL,'2025-05-23 23:03:25','2025-05-23 23:03:25'),(22,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-05-23 23:37:49','2025-05-23 23:37:49'),(23,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-23 23:39:06','2025-05-23 23:39:06'),(24,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-05-24 00:08:58','2025-05-24 00:08:58'),(25,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-24 00:16:51','2025-05-24 00:16:51'),(26,'page_create','(5) Trazado pantalón',1,'172.18.0.1',5,'page','2025-05-24 00:18:14','2025-05-24 00:18:14'),(27,'page_create','(6) Trazado chaqueta',1,'172.18.0.1',6,'page','2025-05-24 00:18:59','2025-05-24 00:18:59'),(28,'page_create','(7) Trazado camisa',1,'172.18.0.1',7,'page','2025-05-24 00:19:17','2025-05-24 00:19:17'),(29,'page_create','(8) Trazado chaleco',1,'172.18.0.1',8,'page','2025-05-24 00:19:32','2025-05-24 00:19:32'),(30,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-05-24 00:28:01','2025-05-24 00:28:01'),(31,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-24 00:32:07','2025-05-24 00:32:07'),(32,'book_update','(1) Confección',1,'172.18.0.1',1,'book','2025-05-24 00:34:15','2025-05-24 00:34:15'),(33,'settings_update','customization',1,'172.18.0.1',NULL,NULL,'2025-05-24 00:37:36','2025-05-24 00:37:36'),(34,'user_update','(1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-24 00:38:27','2025-05-24 00:38:27'),(35,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-05-24 00:38:38','2025-05-24 00:38:38'),(36,'auth_login','standard; (1) Admin',1,'172.18.0.1',NULL,NULL,'2025-05-24 00:40:07','2025-05-24 00:40:07'),(37,'book_update','(1) Confección',1,'172.18.0.1',1,'book','2025-05-24 00:40:24','2025-05-24 00:40:24'),(38,'page_update','(1) Medidas pantalón',1,'172.18.0.1',1,'page','2025-05-24 00:45:49','2025-05-24 00:45:49'),(39,'book_create','(2) Uso de herramientas',1,'172.18.0.1',2,'book','2025-06-02 00:32:55','2025-06-02 00:32:55'),(40,'chapter_create','(3) Corte',1,'172.18.0.1',3,'chapter','2025-06-02 00:33:40','2025-06-02 00:33:40'),(41,'chapter_create','(4) Confección',1,'172.18.0.1',4,'chapter','2025-06-02 00:34:20','2025-06-02 00:34:20'),(42,'page_create','(9) Confección de pantalones',1,'172.18.0.1',9,'page','2025-06-02 00:34:50','2025-06-02 00:34:50'),(43,'page_create','(10) Confección de sacos',1,'172.18.0.1',10,'page','2025-06-02 00:35:16','2025-06-02 00:35:16'),(44,'page_create','(11) Confección de chaquetas',1,'172.18.0.1',11,'page','2025-06-02 00:35:43','2025-06-02 00:35:43'),(45,'page_create','(12) Confección de camisas',1,'172.18.0.1',12,'page','2025-06-02 00:36:23','2025-06-02 00:36:23'),(46,'chapter_create','(5) Máquina de coser (eléctrica)',1,'172.18.0.1',5,'chapter','2025-06-02 00:42:44','2025-06-02 00:42:44'),(47,'chapter_create','(6) Máquina de coser (pedal)',1,'172.18.0.1',6,'chapter','2025-06-02 00:43:07','2025-06-02 00:43:07'),(48,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-06-02 00:45:19','2025-06-02 00:45:19'),(49,'auth_login','standard; (3) Carlos Córdoba',3,'172.18.0.1',NULL,NULL,'2025-06-02 00:45:32','2025-06-02 00:45:32');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `expires_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_tokens_token_id_unique` (`token_id`),
  KEY `api_tokens_user_id_index` (`user_id`),
  KEY `api_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_tokens`
--

LOCK TABLES `api_tokens` WRITE;
/*!40000 ALTER TABLE `api_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attachments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `extension` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_to` int(11) NOT NULL,
  `external` tinyint(1) NOT NULL,
  `order` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attachments_uploaded_to_index` (`uploaded_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `owned_by` int(10) unsigned NOT NULL,
  `default_template_id` int(11) DEFAULT NULL,
  `description_html` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_rule_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_slug_index` (`slug`),
  KEY `books_created_by_index` (`created_by`),
  KEY `books_updated_by_index` (`updated_by`),
  KEY `books_owned_by_index` (`owned_by`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Confección','confeccion','Guía para el proceso de confección, pasos detallados con ejemplos en imágenes y video.','2025-05-22 20:40:49','2025-05-24 00:40:24',1,1,2,NULL,1,NULL,'<p>Guía para el proceso de confección, pasos detallados con ejemplos en imágenes y video.</p>',NULL),(2,'Uso de herramientas','uso-de-herramientas','Modo de empleo de las diferentes herramientas requeridas para el proceso de confección.','2025-06-02 00:32:55','2025-06-02 00:32:55',1,1,3,NULL,1,NULL,'<p>Modo de empleo de las diferentes herramientas requeridas para el proceso de confección.</p>',NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookshelves`
--

DROP TABLE IF EXISTS `bookshelves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookshelves` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `owned_by` int(10) unsigned NOT NULL,
  `description_html` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookshelves_slug_index` (`slug`),
  KEY `bookshelves_created_by_index` (`created_by`),
  KEY `bookshelves_updated_by_index` (`updated_by`),
  KEY `bookshelves_owned_by_index` (`owned_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookshelves`
--

LOCK TABLES `bookshelves` WRITE;
/*!40000 ALTER TABLE `bookshelves` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookshelves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookshelves_books`
--

DROP TABLE IF EXISTS `bookshelves_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookshelves_books` (
  `bookshelf_id` int(10) unsigned NOT NULL,
  `book_id` int(10) unsigned NOT NULL,
  `order` int(10) unsigned NOT NULL,
  PRIMARY KEY (`bookshelf_id`,`book_id`),
  KEY `bookshelves_books_book_id_foreign` (`book_id`),
  CONSTRAINT `bookshelves_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookshelves_books_bookshelf_id_foreign` FOREIGN KEY (`bookshelf_id`) REFERENCES `bookshelves` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookshelves_books`
--

LOCK TABLES `bookshelves_books` WRITE;
/*!40000 ALTER TABLE `bookshelves_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookshelves_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  UNIQUE KEY `cache_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `owned_by` int(10) unsigned NOT NULL,
  `description_html` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_template_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chapters_slug_index` (`slug`),
  KEY `chapters_book_id_index` (`book_id`),
  KEY `chapters_priority_index` (`priority`),
  KEY `chapters_created_by_index` (`created_by`),
  KEY `chapters_updated_by_index` (`updated_by`),
  KEY `chapters_owned_by_index` (`owned_by`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,1,'toma-de-medidas','Toma de medidas','La toma de medidas es una etapa fundamental en el proceso de confección, ya que garantiza que las prendas se ajusten perfectamente al cuerpo del cliente, proporcionando comodidad y un acabado profesional. Este capítulo describe detalladamente los pasos, técnicas y herramientas necesarias para obtener medidas precisas y confiables.\r\n\r\nSe incluyen indicaciones para medir diferentes partes del cuerpo, además de recomendaciones para tomar las medidas en distintas posturas y condiciones. También se destacan aspectos importantes para evitar errores comunes y asegurar que las medidas reflejen con exactitud las proporciones del cliente.\r\n\r\nAl dominar la toma de medidas, el sastre podrá diseñar y confeccionar prendas personalizadas que realcen la figura del cliente y cumplan con sus expectativas de estilo y funcionalidad.',2,'2025-05-22 21:12:27','2025-05-22 21:32:16',1,1,NULL,1,'',NULL),(2,1,'trazado','Trazado','En este capítulo se llevará a cabo el trazado de patrones de corte sobre la tela',3,'2025-05-22 21:19:19','2025-05-22 21:19:19',1,1,NULL,1,'',NULL),(3,1,'corte','Corte','Proceso de corte',4,'2025-06-02 00:33:39','2025-06-02 00:33:39',1,1,NULL,1,'<p>Proceso de corte</p>',NULL),(4,1,'confeccion','Confección','Proceso de confección',5,'2025-06-02 00:34:20','2025-06-02 00:34:20',1,1,NULL,1,'<p>Proceso de confección</p>',NULL),(5,2,'maquina-de-coser-electrica','Máquina de coser (eléctrica)','',2,'2025-06-02 00:42:44','2025-06-02 00:42:44',1,1,NULL,1,'',NULL),(6,2,'maquina-de-coser-pedal','Máquina de coser (pedal)','',3,'2025-06-02 00:43:07','2025-06-02 00:43:07',1,1,NULL,1,'',NULL);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned NOT NULL,
  `entity_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci,
  `html` longtext COLLATE utf8mb4_unicode_ci,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `local_id` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_entity_id_entity_type_index` (`entity_id`,`entity_type`),
  KEY `comments_local_id_index` (`local_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deletions`
--

DROP TABLE IF EXISTS `deletions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deletions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `deleted_by` int(11) NOT NULL,
  `deletable_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletable_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `deletions_deleted_by_index` (`deleted_by`),
  KEY `deletions_deletable_type_index` (`deletable_type`),
  KEY `deletions_deletable_id_index` (`deletable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deletions`
--

LOCK TABLES `deletions` WRITE;
/*!40000 ALTER TABLE `deletions` DISABLE KEYS */;
/*!40000 ALTER TABLE `deletions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_confirmations`
--

DROP TABLE IF EXISTS `email_confirmations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_confirmations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_confirmations_user_id_index` (`user_id`),
  KEY `email_confirmations_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_confirmations`
--

LOCK TABLES `email_confirmations` WRITE;
/*!40000 ALTER TABLE `email_confirmations` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_confirmations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_permissions`
--

DROP TABLE IF EXISTS `entity_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity_permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned NOT NULL,
  `entity_type` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `view` tinyint(1) NOT NULL DEFAULT '0',
  `create` tinyint(1) NOT NULL DEFAULT '0',
  `update` tinyint(1) NOT NULL DEFAULT '0',
  `delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `new_entity_permissions_entity_id_entity_type_index` (`entity_id`,`entity_type`),
  KEY `new_entity_permissions_role_id_index` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_permissions`
--

LOCK TABLES `entity_permissions` WRITE;
/*!40000 ALTER TABLE `entity_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `entity_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favourites` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `favouritable_id` int(11) NOT NULL,
  `favouritable_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `favouritable_index` (`favouritable_id`,`favouritable_type`),
  KEY `favourites_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `path` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_to` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `images_type_index` (`type`),
  KEY `images_uploaded_to_index` (`uploaded_to`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'3-avatar.png','http://localhost:6875/uploads/images/user/2025-05/3-avatar.png','2025-05-22 21:23:37','2025-05-22 21:23:37',3,3,'/uploads/images/user/2025-05/3-avatar.png','user',3),(2,'confección.jpeg','http://localhost:6875/uploads/images/cover_book/2025-05/confeccion.jpeg','2025-05-24 00:40:24','2025-05-24 00:40:24',1,1,'/uploads/images/cover_book/2025-05/confeccion.jpeg','cover_book',1),(3,'singer-maquina.jpg','http://localhost:6875/uploads/images/cover_book/2025-06/singer-maquina.jpg','2025-06-02 00:32:55','2025-06-02 00:32:55',1,1,'/uploads/images/cover_book/2025-06/singer-maquina.jpg','cover_book',2);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imports`
--

DROP TABLE IF EXISTS `imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metadata` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `imports_created_by_index` (`created_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imports`
--

LOCK TABLES `imports` WRITE;
/*!40000 ALTER TABLE `imports` DISABLE KEYS */;
/*!40000 ALTER TABLE `imports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joint_permissions`
--

DROP TABLE IF EXISTS `joint_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `joint_permissions` (
  `role_id` int(11) NOT NULL,
  `entity_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` int(11) NOT NULL,
  `status` tinyint(3) unsigned NOT NULL,
  `owner_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`role_id`,`entity_type`,`entity_id`),
  KEY `joint_permissions_entity_id_entity_type_index` (`entity_id`,`entity_type`),
  KEY `joint_permissions_role_id_index` (`role_id`),
  KEY `joint_permissions_status_index` (`status`),
  KEY `joint_permissions_owner_id_index` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joint_permissions`
--

LOCK TABLES `joint_permissions` WRITE;
/*!40000 ALTER TABLE `joint_permissions` DISABLE KEYS */;
INSERT INTO `joint_permissions` VALUES (1,'book',1,3,1),(1,'book',2,3,1),(1,'chapter',1,3,1),(1,'chapter',2,3,1),(1,'chapter',3,3,1),(1,'chapter',4,3,1),(1,'chapter',5,3,1),(1,'chapter',6,3,1),(1,'page',1,3,1),(1,'page',2,3,1),(1,'page',3,3,1),(1,'page',4,3,1),(1,'page',5,3,1),(1,'page',6,3,1),(1,'page',7,3,1),(1,'page',8,3,1),(1,'page',9,3,1),(1,'page',10,3,1),(1,'page',11,3,1),(1,'page',12,3,1),(2,'book',1,1,1),(2,'book',2,1,1),(2,'chapter',1,1,1),(2,'chapter',2,1,1),(2,'chapter',3,1,1),(2,'chapter',4,1,1),(2,'chapter',5,1,1),(2,'chapter',6,1,1),(2,'page',1,1,1),(2,'page',2,1,1),(2,'page',3,1,1),(2,'page',4,1,1),(2,'page',5,1,1),(2,'page',6,1,1),(2,'page',7,1,1),(2,'page',8,1,1),(2,'page',9,1,1),(2,'page',10,1,1),(2,'page',11,1,1),(2,'page',12,1,1),(3,'book',1,1,1),(3,'book',2,1,1),(3,'chapter',1,1,1),(3,'chapter',2,1,1),(3,'chapter',3,1,1),(3,'chapter',4,1,1),(3,'chapter',5,1,1),(3,'chapter',6,1,1),(3,'page',1,1,1),(3,'page',2,1,1),(3,'page',3,1,1),(3,'page',4,1,1),(3,'page',5,1,1),(3,'page',6,1,1),(3,'page',7,1,1),(3,'page',8,1,1),(3,'page',9,1,1),(3,'page',10,1,1),(3,'page',11,1,1),(3,'page',12,1,1),(4,'book',1,1,1),(4,'book',2,1,1),(4,'chapter',1,1,1),(4,'chapter',2,1,1),(4,'chapter',3,1,1),(4,'chapter',4,1,1),(4,'chapter',5,1,1),(4,'chapter',6,1,1),(4,'page',1,1,1),(4,'page',2,1,1),(4,'page',3,1,1),(4,'page',4,1,1),(4,'page',5,1,1),(4,'page',6,1,1),(4,'page',7,1,1),(4,'page',8,1,1),(4,'page',9,1,1),(4,'page',10,1,1),(4,'page',11,1,1),(4,'page',12,1,1);
/*!40000 ALTER TABLE `joint_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mfa_values`
--

DROP TABLE IF EXISTS `mfa_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mfa_values` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `method` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mfa_values_user_id_index` (`user_id`),
  KEY `mfa_values_method_index` (`method`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mfa_values`
--

LOCK TABLES `mfa_values` WRITE;
/*!40000 ALTER TABLE `mfa_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `mfa_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2015_07_12_114933_create_books_table',1),(4,'2015_07_12_190027_create_pages_table',1),(5,'2015_07_13_172121_create_images_table',1),(6,'2015_07_27_172342_create_chapters_table',1),(7,'2015_08_08_200447_add_users_to_entities',1),(8,'2015_08_09_093534_create_page_revisions_table',1),(9,'2015_08_16_142133_create_activities_table',1),(10,'2015_08_29_105422_add_roles_and_permissions',1),(11,'2015_08_30_125859_create_settings_table',1),(12,'2015_08_31_175240_add_search_indexes',1),(13,'2015_09_04_165821_create_social_accounts_table',1),(14,'2015_09_05_164707_add_email_confirmation_table',1),(15,'2015_11_21_145609_create_views_table',1),(16,'2015_11_26_221857_add_entity_indexes',1),(17,'2015_12_05_145049_fulltext_weighting',1),(18,'2015_12_07_195238_add_image_upload_types',1),(19,'2015_12_09_195748_add_user_avatars',1),(20,'2016_01_11_210908_add_external_auth_to_users',1),(21,'2016_02_25_184030_add_slug_to_revisions',1),(22,'2016_02_27_120329_update_permissions_and_roles',1),(23,'2016_02_28_084200_add_entity_access_controls',1),(24,'2016_03_09_203143_add_page_revision_types',1),(25,'2016_03_13_082138_add_page_drafts',1),(26,'2016_03_25_123157_add_markdown_support',1),(27,'2016_04_09_100730_add_view_permissions_to_roles',1),(28,'2016_04_20_192649_create_joint_permissions_table',1),(29,'2016_05_06_185215_create_tags_table',1),(30,'2016_07_07_181521_add_summary_to_page_revisions',1),(31,'2016_09_29_101449_remove_hidden_roles',1),(32,'2016_10_09_142037_create_attachments_table',1),(33,'2017_01_21_163556_create_cache_table',1),(34,'2017_01_21_163602_create_sessions_table',1),(35,'2017_03_19_091553_create_search_index_table',1),(36,'2017_04_20_185112_add_revision_counts',1),(37,'2017_07_02_152834_update_db_encoding_to_ut8mb4',1),(38,'2017_08_01_130541_create_comments_table',1),(39,'2017_08_29_102650_add_cover_image_display',1),(40,'2018_07_15_173514_add_role_external_auth_id',1),(41,'2018_08_04_115700_create_bookshelves_table',1),(42,'2019_07_07_112515_add_template_support',1),(43,'2019_08_17_140214_add_user_invites_table',1),(44,'2019_12_29_120917_add_api_auth',1),(45,'2020_08_04_111754_drop_joint_permissions_id',1),(46,'2020_08_04_131052_remove_role_name_field',1),(47,'2020_09_19_094251_add_activity_indexes',1),(48,'2020_09_27_210059_add_entity_soft_deletes',1),(49,'2020_09_27_210528_create_deletions_table',1),(50,'2020_11_07_232321_simplify_activities_table',1),(51,'2020_12_30_173528_add_owned_by_field_to_entities',1),(52,'2021_01_30_225441_add_settings_type_column',1),(53,'2021_03_08_215138_add_user_slug',1),(54,'2021_05_15_173110_create_favourites_table',1),(55,'2021_06_30_173111_create_mfa_values_table',1),(56,'2021_07_03_085038_add_mfa_enforced_to_roles_table',1),(57,'2021_08_28_161743_add_export_role_permission',1),(58,'2021_09_26_044614_add_activities_ip_column',1),(59,'2021_11_26_070438_add_index_for_user_ip',1),(60,'2021_12_07_111343_create_webhooks_table',1),(61,'2021_12_13_152024_create_jobs_table',1),(62,'2021_12_13_152120_create_failed_jobs_table',1),(63,'2022_01_03_154041_add_webhooks_timeout_error_columns',1),(64,'2022_04_17_101741_add_editor_change_field_and_permission',1),(65,'2022_04_25_140741_update_polymorphic_types',1),(66,'2022_07_16_170051_drop_joint_permission_type',2),(67,'2022_08_17_092941_create_references_table',2),(68,'2022_09_02_082910_fix_shelf_cover_image_types',2),(69,'2022_10_07_091406_flatten_entity_permissions_table',2),(70,'2022_10_08_104202_drop_entity_restricted_field',2),(71,'2023_01_24_104625_refactor_joint_permissions_storage',2),(72,'2023_01_28_141230_copy_color_settings_for_dark_mode',2),(73,'2023_02_20_093655_increase_attachments_path_length',2),(74,'2023_02_23_200227_add_updated_at_index_to_pages',2),(75,'2023_06_10_071823_remove_guest_user_secondary_roles',2),(76,'2023_06_25_181952_remove_bookshelf_create_entity_permissions',2),(77,'2023_07_25_124945_add_receive_notifications_role_permissions',2),(78,'2023_07_31_104430_create_watches_table',2),(79,'2023_08_21_174248_increase_cache_size',2),(80,'2023_12_02_104541_add_default_template_to_books',2),(81,'2023_12_17_140913_add_description_html_to_entities',2),(82,'2024_01_01_104542_add_default_template_to_chapters',2),(83,'2024_02_04_141358_add_views_updated_index',2),(84,'2024_05_04_154409_rename_activity_relation_columns',2),(85,'2024_09_29_140340_ensure_editor_value_set',2),(86,'2024_10_29_114420_add_import_role_permission',2),(87,'2024_11_02_160700_create_imports_table',2),(88,'2024_11_27_171039_add_instance_id_setting',2),(89,'2025_01_29_180933_create_sort_rules_table',2),(90,'2025_02_05_150842_add_sort_rule_id_to_books',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_revisions`
--

DROP TABLE IF EXISTS `page_revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_revisions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `html` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'version',
  `markdown` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revision_number` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `page_revisions_page_id_index` (`page_id`),
  KEY `page_revisions_slug_index` (`slug`),
  KEY `page_revisions_book_slug_index` (`book_slug`),
  KEY `page_revisions_type_index` (`type`),
  KEY `page_revisions_revision_number_index` (`revision_number`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_revisions`
--

LOCK TABLES `page_revisions` WRITE;
/*!40000 ALTER TABLE `page_revisions` DISABLE KEYS */;
INSERT INTO `page_revisions` VALUES (1,1,'Medidas pantalón','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confeccionar un pantalón</strong></h2>','Toma de medidas para confeccionar un pantalón',1,'2025-05-22 21:13:17','2025-05-22 21:13:17','medidas-pantalon','confeccion','version','','Initial publish',1),(2,2,'Medidas chaqueta','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confección de chaquetas</strong></h2>','Toma de medidas para confección de chaquetas',1,'2025-05-22 21:14:42','2025-05-22 21:14:42','medidas-chaqueta','confeccion','version','','Initial publish',1),(3,3,'Medidas chaleco','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confección de chaleco</strong></h2>','Toma de medidas para confección de chaleco',1,'2025-05-22 21:15:26','2025-05-22 21:15:26','medidas-chaleco','confeccion','version','','Initial publish',1),(4,4,'Medidas camisa','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confección de camisas</strong></h2>','Toma de medidas para confección de camisas',1,'2025-05-22 21:17:00','2025-05-22 21:17:00','medidas-camisa','confeccion','version','','Initial publish',1),(6,1,'Medidas pantalón','<h2 id=\"bkmrk-toma-de-medidas-para\" class=\"align-center\"><strong><span style=\"color: #e03e2d;\">Toma de medidas para confeccionar un pantalón</span><br></strong></h2>\r\n<h5 id=\"bkmrk-herramientas-necesar\"><strong>Herramientas necesarias: Metro flexible</strong></h5>\r\n<p id=\"bkmrk-para-obtener-un-pant\">Para obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.<br><br>Preparación: El cliente debe estar de pie, con los pies ligeramente separados y en posición natural. Es recomendable que use ropa ligera (no pantalones cortos) para evitar distorsiones en las medidas.<strong><br></strong></p>\r\n<ul id=\"bkmrk-medida-de-la-cintura\"><li data-start=\"603\" data-end=\"902\">\r\n<p data-start=\"606\" data-end=\"902\"><strong data-start=\"606\" data-end=\"631\">Medida de la cintura:</strong><br data-start=\"631\" data-end=\"634\">Coloca la cinta métrica alrededor de la cintura natural del cliente o preguntar el punto en el cual el cliente se faja el pantalón, generalmente se encuentra justo arriba del ombligo, asegurándote de que la cinta esté nivelada y no demasiado ajustada ni floja. Esta medida es fundamental para el ajuste del pantalón en la parte superior.<br></p>\r\n</li>\r\n<li data-start=\"904\" data-end=\"1128\">\r\n<p data-start=\"907\" data-end=\"1128\"><strong data-start=\"907\" data-end=\"931\">Medida de la cadera:</strong><br data-start=\"931\" data-end=\"934\">Mide alrededor de la parte más ancha de las caderas y glúteos, asegurando que la cinta esté paralela al suelo y no se tuerza. Esta medida es clave para el ajuste en la zona baja del pantalón.</p>\r\n</li>\r\n<li data-start=\"1130\" data-end=\"1416\">\r\n<p data-start=\"1133\" data-end=\"1416\"><strong data-start=\"1133\" data-end=\"1166\">Medida del largo de pantalón:</strong><br data-start=\"1166\" data-end=\"1169\">Mide desde la cintura natural hasta el largo deseado, que puede ser hasta el tobillo o un poco más corto, dependiendo del estilo del pantalón. Para mayor precisión, el cliente puede estar calzado con el tipo de zapato que usará con el pantalón.<br></p>\r\n</li>\r\n<li data-start=\"1655\" data-end=\"1870\">\r\n<p data-start=\"1658\" data-end=\"1870\"><strong data-start=\"1658\" data-end=\"1678\">Medida del tiro:</strong><br data-start=\"1678\" data-end=\"1681\">Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna, hasta la entrepierna. Esta medida es esencial para que el pantalón tenga el ajuste correcto en la zona frontal y trasera.</p>\r\n</li>\r\n<li data-start=\"1872\" data-end=\"2012\">\r\n<p data-start=\"1875\" data-end=\"2012\"><strong data-start=\"1875\" data-end=\"1906\">Medida del ancho de pierna:</strong><br data-start=\"1906\" data-end=\"1909\">Mide alrededor de la parte más ancha del muslo, asegurándote de que la cinta esté nivelada y cómoda.</p>\r\n</li>\r\n<li data-start=\"1872\" data-end=\"2012\"><strong>Medida de la base: <span style=\"font-weight: 400;\">Tomar medida desde la rodilla hasta la longitud que desee el cliente</span></strong></li>\r\n<li data-start=\"1872\" data-end=\"2012\"><strong>Medida de la bota: <span style=\"font-weight: 400;\">Preguntar al cliente o usar pantalón de referencia dado</span></strong></li>\r\n</ul><p id=\"bkmrk-%C2%A0\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-0\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-1\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-2\">&nbsp;</p>\r\n<h5 id=\"bkmrk-\"><br></h5>\r\n<p id=\"bkmrk-%C2%A0-3\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-4\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-5\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-6\">&nbsp;</p>\r\n<p id=\"bkmrk-%C2%A0-7\">&nbsp;</p>','Toma de medidas para confeccionar un pantalón\r\nHerramientas necesarias: Metro flexible\r\nPara obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.Preparación: El cliente debe estar de pie, con los pies ligeramente separados y en posición natural. Es recomendable que use ropa ligera (no pantalones cortos) para evitar distorsiones en las medidas.\r\n\r\nMedida de la cintura:Coloca la cinta métrica alrededor de la cintura natural del cliente o preguntar el punto en el cual el cliente se faja el pantalón, generalmente se encuentra justo arriba del ombligo, asegurándote de que la cinta esté nivelada y no demasiado ajustada ni floja. Esta medida es fundamental para el ajuste del pantalón en la parte superior.\r\n\r\n\r\nMedida de la cadera:Mide alrededor de la parte más ancha de las caderas y glúteos, asegurando que la cinta esté paralela al suelo y no se tuerza. Esta medida es clave para el ajuste en la zona baja del pantalón.\r\n\r\n\r\nMedida del largo de pantalón:Mide desde la cintura natural hasta el largo deseado, que puede ser hasta el tobillo o un poco más corto, dependiendo del estilo del pantalón. Para mayor precisión, el cliente puede estar calzado con el tipo de zapato que usará con el pantalón.\r\n\r\n\r\nMedida del tiro:Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna, hasta la entrepierna. Esta medida es esencial para que el pantalón tenga el ajuste correcto en la zona frontal y trasera.\r\n\r\n\r\nMedida del ancho de pierna:Mide alrededor de la parte más ancha del muslo, asegurándote de que la cinta esté nivelada y cómoda.\r\n\r\nMedida de la base: Tomar medida desde la rodilla hasta la longitud que desee el cliente\r\nMedida de la bota: Preguntar al cliente o usar pantalón de referencia dado\r\n \r\n \r\n \r\n \r\n\r\n \r\n \r\n \r\n \r\n ',1,'2025-05-22 21:58:58','2025-05-22 21:58:58','medidas-pantalon','confeccion','version','','',2),(8,1,'Medidas pantalón','<h2 id=\"bkmrk-toma-de-medidas-para\" class=\"align-center\"><strong><span style=\"color: #e03e2d;\">Toma de medidas para confeccionar un pantalón</span><br></strong></h2>\r\n<h5 id=\"bkmrk-herramientas-necesar\"><strong>Herramientas necesarias: Metro flexible</strong></h5>\r\n<p id=\"bkmrk-para-obtener-un-pant\">Para obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.<strong><br></strong></p>\r\n<p data-start=\"197\" data-end=\"781\" id=\"bkmrk-1.-medida-de-la-cint\"><strong data-start=\"197\" data-end=\"224\">1. Medida de la cintura</strong><br data-start=\"224\" data-end=\"227\">Coloca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable <strong data-start=\"370\" data-end=\"434\">preguntar al cliente en qué punto prefiere fajar su pantalón</strong>, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.<br data-start=\"618\" data-end=\"621\"><em data-start=\"624\" data-end=\"781\"><strong>Función: </strong>Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.</em></p>\r\n<p data-start=\"788\" data-end=\"1215\" id=\"bkmrk-2.-medida-de-la-cade\"><strong data-start=\"788\" data-end=\"814\">2. Medida de la cadera</strong><br data-start=\"814\" data-end=\"817\">Mide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.<br data-start=\"1049\" data-end=\"1052\"><em data-start=\"1055\" data-end=\"1215\"><strong>Función: </strong>Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.</em></p>\r\n<p data-start=\"1222\" data-end=\"1782\" id=\"bkmrk-3.-medida-del-largo-\"><strong data-start=\"1222\" data-end=\"1258\">3. Medida del largo del pantalón</strong><br data-start=\"1258\" data-end=\"1261\">Coloca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar <strong data-start=\"1587\" data-end=\"1667\">de pie y calzado con el tipo de zapato que normalmente usará con el pantalón</strong>.<br data-start=\"1668\" data-end=\"1671\"><em data-start=\"1674\" data-end=\"1782\"><strong>Función: </strong>Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.</em></p>\r\n<p data-start=\"1789\" data-end=\"2283\" id=\"bkmrk-4.-medida-del-tiro-%28\"><strong data-start=\"1789\" data-end=\"1824\">4. Medida del tiro (tiro total)</strong><br data-start=\"1824\" data-end=\"1827\">Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.<br data-start=\"2091\" data-end=\"2094\"><em data-start=\"2097\" data-end=\"2283\"><strong>Función: </strong>Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.</em></p>\r\n<p data-start=\"2290\" data-end=\"2656\" id=\"bkmrk-5.-medida-del-ancho-\"><strong data-start=\"2290\" data-end=\"2331\">5. Medida del ancho de pierna (muslo)</strong><br data-start=\"2331\" data-end=\"2334\">Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.<br data-start=\"2497\" data-end=\"2500\"><em data-start=\"2503\" data-end=\"2656\"><strong>Función: </strong>Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.</em></p>\r\n<p data-start=\"2663\" data-end=\"2986\" id=\"bkmrk-6.-medida-de-la-base\"><strong data-start=\"2663\" data-end=\"2717\">6. Medida de la base (desde rodilla hasta el bajo)</strong><br data-start=\"2717\" data-end=\"2720\">Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.<br data-start=\"2837\" data-end=\"2840\"><em data-start=\"2843\" data-end=\"2986\"><strong>Función: </strong>Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.</em></p>\r\n<p data-start=\"2993\" data-end=\"3404\" id=\"bkmrk-7.-medida-de-la-bota\"><strong data-start=\"2993\" data-end=\"3037\">7. Medida de la bota (boca del pantalón)</strong><br data-start=\"3037\" data-end=\"3040\">Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.<br data-start=\"3213\" data-end=\"3216\"><em data-start=\"3219\" data-end=\"3404\"><strong>Función: </strong>Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.</em></p>\r\n<p id=\"bkmrk-%C2%A0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-1\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-2\"><br></p>\r\n<h5 id=\"bkmrk-\"><br></h5>\r\n<p id=\"bkmrk-%C2%A0-3\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-4\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-5\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-6\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-7\"><br></p>','Toma de medidas para confeccionar un pantalón\r\nHerramientas necesarias: Metro flexible\r\nPara obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.\r\n1. Medida de la cinturaColoca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable preguntar al cliente en qué punto prefiere fajar su pantalón, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.Función: Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.\r\n2. Medida de la caderaMide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.Función: Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.\r\n3. Medida del largo del pantalónColoca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar de pie y calzado con el tipo de zapato que normalmente usará con el pantalón.Función: Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.\r\n4. Medida del tiro (tiro total)Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.Función: Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.\r\n5. Medida del ancho de pierna (muslo)Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.Función: Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.\r\n6. Medida de la base (desde rodilla hasta el bajo)Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.Función: Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.\r\n7. Medida de la bota (boca del pantalón)Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.Función: Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n',1,'2025-05-22 22:11:39','2025-05-22 22:11:39','medidas-pantalon','confeccion','version','','',3),(10,1,'Medidas pantalón','<h2 id=\"bkmrk-toma-de-medidas-para\" class=\"align-center\"><strong><span style=\"color: #000000;\">Toma de medidas para confeccionar un pantalón</span><br></strong></h2>\r\n<h5 id=\"bkmrk-herramientas-necesar\"><strong>Herramientas necesarias: Metro flexible</strong></h5>\r\n<p id=\"bkmrk-para-obtener-un-pant\">Para obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.<strong><br></strong></p>\r\n<p id=\"bkmrk-1.-medida-de-la-cint\" data-start=\"197\" data-end=\"781\"><strong data-start=\"197\" data-end=\"224\">1. Medida de la cintura</strong><br data-start=\"224\" data-end=\"227\">Coloca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable <strong data-start=\"370\" data-end=\"434\">preguntar al cliente en qué punto prefiere fajar su pantalón</strong>, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.<br data-start=\"618\" data-end=\"621\"><em data-start=\"624\" data-end=\"781\"><strong>Función: </strong>Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.</em></p>\r\n<p id=\"bkmrk-2.-medida-de-la-cade\" data-start=\"788\" data-end=\"1215\"><strong data-start=\"788\" data-end=\"814\">2. Medida de la cadera</strong><br data-start=\"814\" data-end=\"817\">Mide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.<br data-start=\"1049\" data-end=\"1052\"><em data-start=\"1055\" data-end=\"1215\"><strong>Función: </strong>Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.</em></p>\r\n<p id=\"bkmrk-3.-medida-del-largo-\" data-start=\"1222\" data-end=\"1782\"><strong data-start=\"1222\" data-end=\"1258\">3. Medida del largo del pantalón</strong><br data-start=\"1258\" data-end=\"1261\">Coloca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar <strong data-start=\"1587\" data-end=\"1667\">de pie y calzado con el tipo de zapato que normalmente usará con el pantalón</strong>.<br data-start=\"1668\" data-end=\"1671\"><em data-start=\"1674\" data-end=\"1782\"><strong>Función: </strong>Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.</em></p>\r\n<p id=\"bkmrk-4.-medida-del-tiro-%28\" data-start=\"1789\" data-end=\"2283\"><strong data-start=\"1789\" data-end=\"1824\">4. Medida del tiro (tiro total)</strong><br data-start=\"1824\" data-end=\"1827\">Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.<br data-start=\"2091\" data-end=\"2094\"><em data-start=\"2097\" data-end=\"2283\"><strong>Función: </strong>Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.</em></p>\r\n<p id=\"bkmrk-5.-medida-del-ancho-\" data-start=\"2290\" data-end=\"2656\"><strong data-start=\"2290\" data-end=\"2331\">5. Medida del ancho de pierna (muslo)</strong><br data-start=\"2331\" data-end=\"2334\">Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.<br data-start=\"2497\" data-end=\"2500\"><em data-start=\"2503\" data-end=\"2656\"><strong>Función: </strong>Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.</em></p>\r\n<p id=\"bkmrk-6.-medida-de-la-base\" data-start=\"2663\" data-end=\"2986\"><strong data-start=\"2663\" data-end=\"2717\">6. Medida de la base (desde rodilla hasta el bajo)</strong><br data-start=\"2717\" data-end=\"2720\">Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.<br data-start=\"2837\" data-end=\"2840\"><em data-start=\"2843\" data-end=\"2986\"><strong>Función: </strong>Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.</em></p>\r\n<p id=\"bkmrk-7.-medida-de-la-bota\" data-start=\"2993\" data-end=\"3404\"><strong data-start=\"2993\" data-end=\"3037\">7. Medida de la bota (boca del pantalón)</strong><br data-start=\"3037\" data-end=\"3040\">Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.<br data-start=\"3213\" data-end=\"3216\"><em data-start=\"3219\" data-end=\"3404\"><strong>Función: </strong>Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.</em></p>\r\n<p id=\"bkmrk-%C2%A0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-1\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-2\"><br></p>\r\n<h5 id=\"bkmrk-\"><br></h5>\r\n<p id=\"bkmrk-%C2%A0-3\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-4\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-5\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-6\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-7\"><br></p>','Toma de medidas para confeccionar un pantalón\r\nHerramientas necesarias: Metro flexible\r\nPara obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.\r\n1. Medida de la cinturaColoca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable preguntar al cliente en qué punto prefiere fajar su pantalón, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.Función: Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.\r\n2. Medida de la caderaMide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.Función: Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.\r\n3. Medida del largo del pantalónColoca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar de pie y calzado con el tipo de zapato que normalmente usará con el pantalón.Función: Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.\r\n4. Medida del tiro (tiro total)Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.Función: Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.\r\n5. Medida del ancho de pierna (muslo)Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.Función: Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.\r\n6. Medida de la base (desde rodilla hasta el bajo)Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.Función: Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.\r\n7. Medida de la bota (boca del pantalón)Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.Función: Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n',1,'2025-05-22 23:20:16','2025-05-22 23:20:16','medidas-pantalon','confeccion','version','','',4),(11,5,'Trazado pantalón','','',1,'2025-05-24 00:18:14','2025-05-24 00:18:14','trazado-pantalon','confeccion','version','','Initial publish',1),(12,6,'Trazado chaqueta','','',1,'2025-05-24 00:18:59','2025-05-24 00:18:59','trazado-chaqueta','confeccion','version','','Initial publish',1),(13,7,'Trazado camisa','','',1,'2025-05-24 00:19:17','2025-05-24 00:19:17','trazado-camisa','confeccion','version','','Initial publish',1),(14,8,'Trazado chaleco','','',1,'2025-05-24 00:19:32','2025-05-24 00:19:32','trazado-chaleco','confeccion','version','','Initial publish',1),(15,1,'Medidas pantalón','<h2 id=\"bkmrk-toma-de-medidas-para\" class=\"align-center\"><strong><span style=\"color: rgb(255, 255, 255);\">Toma de medidas para confeccionar un pantalón</span><br></strong></h2>\r\n<h5 id=\"bkmrk-herramientas-necesar\"><strong>Herramientas necesarias: Metro flexible</strong></h5>\r\n<p id=\"bkmrk-para-obtener-un-pant\">Para obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.<strong><br></strong></p>\r\n<p id=\"bkmrk-1.-medida-de-la-cint\" data-start=\"197\" data-end=\"781\"><strong data-start=\"197\" data-end=\"224\">1. Medida de la cintura</strong><br data-start=\"224\" data-end=\"227\">Coloca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable <strong data-start=\"370\" data-end=\"434\">preguntar al cliente en qué punto prefiere fajar su pantalón</strong>, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.<br data-start=\"618\" data-end=\"621\"><em data-start=\"624\" data-end=\"781\"><strong>Función: </strong>Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.</em></p>\r\n<p id=\"bkmrk-2.-medida-de-la-cade\" data-start=\"788\" data-end=\"1215\"><strong data-start=\"788\" data-end=\"814\">2. Medida de la cadera</strong><br data-start=\"814\" data-end=\"817\">Mide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.<br data-start=\"1049\" data-end=\"1052\"><em data-start=\"1055\" data-end=\"1215\"><strong>Función: </strong>Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.</em></p>\r\n<p id=\"bkmrk-3.-medida-del-largo-\" data-start=\"1222\" data-end=\"1782\"><strong data-start=\"1222\" data-end=\"1258\">3. Medida del largo del pantalón</strong><br data-start=\"1258\" data-end=\"1261\">Coloca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar <strong data-start=\"1587\" data-end=\"1667\">de pie y calzado con el tipo de zapato que normalmente usará con el pantalón</strong>.<br data-start=\"1668\" data-end=\"1671\"><em data-start=\"1674\" data-end=\"1782\"><strong>Función: </strong>Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.</em></p>\r\n<p id=\"bkmrk-4.-medida-del-tiro-%28\" data-start=\"1789\" data-end=\"2283\"><strong data-start=\"1789\" data-end=\"1824\">4. Medida del tiro (tiro total)</strong><br data-start=\"1824\" data-end=\"1827\">Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.<br data-start=\"2091\" data-end=\"2094\"><em data-start=\"2097\" data-end=\"2283\"><strong>Función: </strong>Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.</em></p>\r\n<p id=\"bkmrk-5.-medida-del-ancho-\" data-start=\"2290\" data-end=\"2656\"><strong data-start=\"2290\" data-end=\"2331\">5. Medida del ancho de pierna (muslo)</strong><br data-start=\"2331\" data-end=\"2334\">Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.<br data-start=\"2497\" data-end=\"2500\"><em data-start=\"2503\" data-end=\"2656\"><strong>Función: </strong>Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.</em></p>\r\n<p id=\"bkmrk-6.-medida-de-la-base\" data-start=\"2663\" data-end=\"2986\"><strong data-start=\"2663\" data-end=\"2717\">6. Medida de la base (desde rodilla hasta el bajo)</strong><br data-start=\"2717\" data-end=\"2720\">Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.<br data-start=\"2837\" data-end=\"2840\"><em data-start=\"2843\" data-end=\"2986\"><strong>Función: </strong>Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.</em></p>\r\n<p id=\"bkmrk-7.-medida-de-la-bota\" data-start=\"2993\" data-end=\"3404\"><strong data-start=\"2993\" data-end=\"3037\">7. Medida de la bota (boca del pantalón)</strong><br data-start=\"3037\" data-end=\"3040\">Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.<br data-start=\"3213\" data-end=\"3216\"><em data-start=\"3219\" data-end=\"3404\"><strong>Función: </strong>Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.</em></p>\r\n<p id=\"bkmrk-%C2%A0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-1\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-2\"><br></p>\r\n<h5 id=\"bkmrk-\"><br></h5>\r\n<p id=\"bkmrk-%C2%A0-3\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-4\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-5\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-6\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-7\"><br></p>','Toma de medidas para confeccionar un pantalón\r\nHerramientas necesarias: Metro flexible\r\nPara obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.\r\n1. Medida de la cinturaColoca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable preguntar al cliente en qué punto prefiere fajar su pantalón, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.Función: Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.\r\n2. Medida de la caderaMide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.Función: Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.\r\n3. Medida del largo del pantalónColoca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar de pie y calzado con el tipo de zapato que normalmente usará con el pantalón.Función: Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.\r\n4. Medida del tiro (tiro total)Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.Función: Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.\r\n5. Medida del ancho de pierna (muslo)Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.Función: Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.\r\n6. Medida de la base (desde rodilla hasta el bajo)Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.Función: Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.\r\n7. Medida de la bota (boca del pantalón)Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.Función: Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n',1,'2025-05-24 00:45:49','2025-05-24 00:45:49','medidas-pantalon','confeccion','version','','',5),(16,9,'Confección de pantalones','','',1,'2025-06-02 00:34:50','2025-06-02 00:34:50','confeccion-de-pantalones','confeccion','version','','Publicación inicial',1),(17,10,'Confección de sacos','','',1,'2025-06-02 00:35:16','2025-06-02 00:35:16','confeccion-de-sacos','confeccion','version','','Publicación inicial',1),(18,11,'Confección de chaquetas','','',1,'2025-06-02 00:35:43','2025-06-02 00:35:43','confeccion-de-chaquetas','confeccion','version','','Publicación inicial',1),(19,12,'Confección de camisas','','',1,'2025-06-02 00:36:23','2025-06-02 00:36:23','confeccion-de-camisas','confeccion','version','','Publicación inicial',1);
/*!40000 ALTER TABLE `page_revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `html` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `draft` tinyint(1) NOT NULL DEFAULT '0',
  `markdown` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `revision_count` int(11) NOT NULL,
  `template` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `owned_by` int(10) unsigned NOT NULL,
  `editor` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `pages_slug_index` (`slug`),
  KEY `pages_book_id_index` (`book_id`),
  KEY `pages_chapter_id_index` (`chapter_id`),
  KEY `pages_priority_index` (`priority`),
  KEY `pages_created_by_index` (`created_by`),
  KEY `pages_updated_by_index` (`updated_by`),
  KEY `pages_draft_index` (`draft`),
  KEY `pages_template_index` (`template`),
  KEY `pages_owned_by_index` (`owned_by`),
  KEY `pages_updated_at_index` (`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,1,1,'Medidas pantalón','medidas-pantalon','<h2 id=\"bkmrk-toma-de-medidas-para\" class=\"align-center\"><strong><span style=\"color: rgb(255, 255, 255);\">Toma de medidas para confeccionar un pantalón</span><br></strong></h2>\r\n<h5 id=\"bkmrk-herramientas-necesar\"><strong>Herramientas necesarias: Metro flexible</strong></h5>\r\n<p id=\"bkmrk-para-obtener-un-pant\">Para obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.<strong><br></strong></p>\r\n<p id=\"bkmrk-1.-medida-de-la-cint\" data-start=\"197\" data-end=\"781\"><strong data-start=\"197\" data-end=\"224\">1. Medida de la cintura</strong><br data-start=\"224\" data-end=\"227\">Coloca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable <strong data-start=\"370\" data-end=\"434\">preguntar al cliente en qué punto prefiere fajar su pantalón</strong>, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.<br data-start=\"618\" data-end=\"621\"><em data-start=\"624\" data-end=\"781\"><strong>Función: </strong>Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.</em></p>\r\n<p id=\"bkmrk-2.-medida-de-la-cade\" data-start=\"788\" data-end=\"1215\"><strong data-start=\"788\" data-end=\"814\">2. Medida de la cadera</strong><br data-start=\"814\" data-end=\"817\">Mide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.<br data-start=\"1049\" data-end=\"1052\"><em data-start=\"1055\" data-end=\"1215\"><strong>Función: </strong>Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.</em></p>\r\n<p id=\"bkmrk-3.-medida-del-largo-\" data-start=\"1222\" data-end=\"1782\"><strong data-start=\"1222\" data-end=\"1258\">3. Medida del largo del pantalón</strong><br data-start=\"1258\" data-end=\"1261\">Coloca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar <strong data-start=\"1587\" data-end=\"1667\">de pie y calzado con el tipo de zapato que normalmente usará con el pantalón</strong>.<br data-start=\"1668\" data-end=\"1671\"><em data-start=\"1674\" data-end=\"1782\"><strong>Función: </strong>Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.</em></p>\r\n<p id=\"bkmrk-4.-medida-del-tiro-%28\" data-start=\"1789\" data-end=\"2283\"><strong data-start=\"1789\" data-end=\"1824\">4. Medida del tiro (tiro total)</strong><br data-start=\"1824\" data-end=\"1827\">Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.<br data-start=\"2091\" data-end=\"2094\"><em data-start=\"2097\" data-end=\"2283\"><strong>Función: </strong>Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.</em></p>\r\n<p id=\"bkmrk-5.-medida-del-ancho-\" data-start=\"2290\" data-end=\"2656\"><strong data-start=\"2290\" data-end=\"2331\">5. Medida del ancho de pierna (muslo)</strong><br data-start=\"2331\" data-end=\"2334\">Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.<br data-start=\"2497\" data-end=\"2500\"><em data-start=\"2503\" data-end=\"2656\"><strong>Función: </strong>Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.</em></p>\r\n<p id=\"bkmrk-6.-medida-de-la-base\" data-start=\"2663\" data-end=\"2986\"><strong data-start=\"2663\" data-end=\"2717\">6. Medida de la base (desde rodilla hasta el bajo)</strong><br data-start=\"2717\" data-end=\"2720\">Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.<br data-start=\"2837\" data-end=\"2840\"><em data-start=\"2843\" data-end=\"2986\"><strong>Función: </strong>Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.</em></p>\r\n<p id=\"bkmrk-7.-medida-de-la-bota\" data-start=\"2993\" data-end=\"3404\"><strong data-start=\"2993\" data-end=\"3037\">7. Medida de la bota (boca del pantalón)</strong><br data-start=\"3037\" data-end=\"3040\">Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.<br data-start=\"3213\" data-end=\"3216\"><em data-start=\"3219\" data-end=\"3404\"><strong>Función: </strong>Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.</em></p>\r\n<p id=\"bkmrk-%C2%A0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-0\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-1\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-2\"><br></p>\r\n<h5 id=\"bkmrk-\"><br></h5>\r\n<p id=\"bkmrk-%C2%A0-3\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-4\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-5\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-6\"><br></p>\r\n<p id=\"bkmrk-%C2%A0-7\"><br></p>','Toma de medidas para confeccionar un pantalón\r\nHerramientas necesarias: Metro flexible\r\nPara obtener un pantalón que se ajuste perfectamente, es esencial tomar las medidas correctas con precisión. A continuación, se describen los pasos para medir al cliente de manera adecuada.\r\n1. Medida de la cinturaColoca la cinta métrica alrededor de la cintura natural del cliente, que suele ubicarse justo arriba del ombligo. Sin embargo, es recomendable preguntar al cliente en qué punto prefiere fajar su pantalón, ya que puede variar según su comodidad o estilo personal (a la cintura, más baja o más alta). Asegúrate de que la cinta esté nivelada en todo el contorno, sin apretar ni dejar flojo.Función: Esta medida define el contorno superior del pantalón y es crucial para evitar que quede suelto o demasiado ajustado en la parte más importante de sujeción.\r\n2. Medida de la caderaMide alrededor de la parte más ancha de las caderas y glúteos, normalmente ubicada entre 18 y 22 cm por debajo de la cintura, dependiendo del cuerpo del cliente. La cinta debe estar completamente horizontal y ajustada sin comprimir.Función: Esta medida asegura que el pantalón tenga suficiente espacio en la parte inferior del torso, evitando que tire o se abra cuando el cliente se siente o camine.\r\n3. Medida del largo del pantalónColoca el inicio de la cinta métrica en la cintura natural (o en el punto acordado con el cliente) y mide verticalmente hasta el largo deseado, que puede ser hasta el tobillo, ligeramente por encima o hasta el empeine, dependiendo del diseño (clásico, tipo pitillo, cropped, etc.). Para mayor precisión, el cliente debe estar de pie y calzado con el tipo de zapato que normalmente usará con el pantalón.Función: Esta medida determina el largo completo del pantalón y su relación con el estilo y la postura del cliente.\r\n4. Medida del tiro (tiro total)Mide desde la cintura delantera (justo debajo del ombligo), pasando por la entrepierna y hasta la cintura trasera, siguiendo el contorno del cuerpo. Es recomendable que el cliente esté sentado o que la cinta se deslice con cuidado por la entrepierna sin estirarse.Función: Esta medida permite definir la profundidad del pantalón (altura de la entrepierna) y es clave para garantizar que el pantalón no quede tirante al sentarse ni forme bolsas innecesarias.\r\n5. Medida del ancho de pierna (muslo)Mide alrededor de la parte más ancha del muslo, justo debajo de la entrepierna. La cinta debe mantenerse horizontal y ligeramente ceñida, sin comprimir el músculo.Función: Esta medida es importante para definir el corte del pantalón en la parte superior de la pierna, especialmente si se busca un ajuste entallado o suelto.\r\n6. Medida de la base (desde rodilla hasta el bajo)Con la cinta métrica, toma la distancia desde el punto medio de la rodilla hasta el largo total deseado del pantalón.Función: Sirve para definir la caída del pantalón desde la rodilla hasta la bota, lo cual influye en sí el pantalón será recto, acampanado o entubado.\r\n7. Medida de la bota (boca del pantalón)Consulta al cliente sobre el ancho deseado de la bota o usa un pantalón de referencia. Alternativamente, mide alrededor del tobillo o del punto final del largo del pantalón.Función: Esta medida define el ancho del extremo inferior de cada pierna del pantalón, impactando directamente en el estilo: puede ser ajustado (skinny), recto, amplio (palazzo) o con campana.\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n',1,'2025-05-22 21:12:37','2025-05-24 00:45:49',1,1,0,'',5,0,NULL,1,'wysiwyg'),(2,1,1,'Medidas chaqueta','medidas-chaqueta','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confección de chaquetas</strong></h2>','Toma de medidas para confección de chaquetas',2,'2025-05-22 21:14:12','2025-05-22 21:14:42',1,1,0,'',1,0,NULL,1,'wysiwyg'),(3,1,1,'Medidas chaleco','medidas-chaleco','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confección de chaleco</strong></h2>','Toma de medidas para confección de chaleco',3,'2025-05-22 21:15:00','2025-05-22 21:15:26',1,1,0,'',1,0,NULL,1,'wysiwyg'),(4,1,1,'Medidas camisa','medidas-camisa','<h2 id=\"bkmrk-toma-de-medidas-para\"><strong>Toma de medidas para confección de camisas</strong></h2>','Toma de medidas para confección de camisas',4,'2025-05-22 21:15:41','2025-05-22 21:17:00',1,1,0,'',1,0,NULL,1,'wysiwyg'),(5,1,2,'Trazado pantalón','trazado-pantalon','','',1,'2025-05-24 00:17:54','2025-05-24 00:18:14',1,1,0,'',1,0,NULL,1,'wysiwyg'),(6,1,2,'Trazado chaqueta','trazado-chaqueta','','',2,'2025-05-24 00:18:43','2025-05-24 00:18:59',1,1,0,'',1,0,NULL,1,'wysiwyg'),(7,1,2,'Trazado camisa','trazado-camisa','','',3,'2025-05-24 00:19:07','2025-05-24 00:19:17',1,1,0,'',1,0,NULL,1,'wysiwyg'),(8,1,2,'Trazado chaleco','trazado-chaleco','','',4,'2025-05-24 00:19:25','2025-05-24 00:19:32',1,1,0,'',1,0,NULL,1,'wysiwyg'),(9,1,4,'Confección de pantalones','confeccion-de-pantalones','','',1,'2025-06-02 00:34:37','2025-06-02 00:34:50',1,1,0,'',1,0,NULL,1,'wysiwyg'),(10,1,4,'Confección de sacos','confeccion-de-sacos','','',2,'2025-06-02 00:34:57','2025-06-02 00:35:16',1,1,0,'',1,0,NULL,1,'wysiwyg'),(11,1,4,'Confección de chaquetas','confeccion-de-chaquetas','','',3,'2025-06-02 00:35:29','2025-06-02 00:35:43',1,1,0,'',1,0,NULL,1,'wysiwyg'),(12,1,4,'Confección de camisas','confeccion-de-camisas','','',4,'2025-06-02 00:36:01','2025-06-02 00:36:23',1,1,0,'',1,0,NULL,1,'wysiwyg');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `role_permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(41,1),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(48,1),(49,1),(50,1),(51,1),(52,1),(53,1),(54,1),(55,1),(56,1),(57,1),(58,1),(59,1),(60,1),(61,1),(62,1),(63,1),(64,1),(65,1),(66,1),(67,1),(68,1),(69,1),(70,1),(71,1),(72,1),(73,1),(74,1),(75,1),(76,1),(77,1),(78,1),(79,1),(24,2),(25,2),(26,2),(27,2),(28,2),(29,2),(30,2),(31,2),(32,2),(33,2),(34,2),(35,2),(36,2),(37,2),(38,2),(39,2),(40,2),(41,2),(42,2),(43,2),(44,2),(45,2),(46,2),(47,2),(48,2),(49,2),(50,2),(51,2),(52,2),(53,2),(66,2),(67,2),(68,2),(69,2),(70,2),(71,2),(72,2),(73,2),(76,2),(48,3),(49,3),(50,3),(51,3),(52,3),(53,3),(66,3),(67,3),(76,3),(48,4),(49,4),(50,4),(51,4),(52,4),(53,4),(66,4),(67,4),(76,4);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `references`
--

DROP TABLE IF EXISTS `references`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `references` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(10) unsigned NOT NULL,
  `from_type` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_id` int(10) unsigned NOT NULL,
  `to_type` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `references_from_id_index` (`from_id`),
  KEY `references_from_type_index` (`from_type`),
  KEY `references_to_id_index` (`to_id`),
  KEY `references_to_type_index` (`to_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `references`
--

LOCK TABLES `references` WRITE;
/*!40000 ALTER TABLE `references` DISABLE KEYS */;
/*!40000 ALTER TABLE `references` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (19,'settings-manage','Manage Settings',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(20,'users-manage','Manage Users',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(21,'user-roles-manage','Manage Roles & Permissions',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(22,'restrictions-manage-all','Manage All Entity Permissions',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(23,'restrictions-manage-own','Manage Entity Permissions On Own Content',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(24,'book-create-all','Create All Books',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(25,'book-create-own','Create Own Books',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(26,'book-update-all','Update All Books',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(27,'book-update-own','Update Own Books',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(28,'book-delete-all','Delete All Books',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(29,'book-delete-own','Delete Own Books',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(30,'page-create-all','Create All Pages',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(31,'page-create-own','Create Own Pages',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(32,'page-update-all','Update All Pages',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(33,'page-update-own','Update Own Pages',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(34,'page-delete-all','Delete All Pages',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(35,'page-delete-own','Delete Own Pages',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(36,'chapter-create-all','Create All Chapters',NULL,'2025-05-22 18:55:10','2025-05-22 18:55:10'),(37,'chapter-create-own','Create Own Chapters',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(38,'chapter-update-all','Update All Chapters',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(39,'chapter-update-own','Update Own Chapters',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(40,'chapter-delete-all','Delete All Chapters',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(41,'chapter-delete-own','Delete Own Chapters',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(42,'image-create-all','Create All Images',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(43,'image-create-own','Create Own Images',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(44,'image-update-all','Update All Images',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(45,'image-update-own','Update Own Images',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(46,'image-delete-all','Delete All Images',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(47,'image-delete-own','Delete Own Images',NULL,'2025-05-22 18:55:11','2025-05-22 18:55:11'),(48,'book-view-all','View All Books',NULL,'2025-05-22 18:55:16','2025-05-22 18:55:16'),(49,'book-view-own','View Own Books',NULL,'2025-05-22 18:55:16','2025-05-22 18:55:16'),(50,'page-view-all','View All Pages',NULL,'2025-05-22 18:55:16','2025-05-22 18:55:16'),(51,'page-view-own','View Own Pages',NULL,'2025-05-22 18:55:16','2025-05-22 18:55:16'),(52,'chapter-view-all','View All Chapters',NULL,'2025-05-22 18:55:16','2025-05-22 18:55:16'),(53,'chapter-view-own','View Own Chapters',NULL,'2025-05-22 18:55:16','2025-05-22 18:55:16'),(54,'attachment-create-all','Create All Attachments',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20'),(55,'attachment-create-own','Create Own Attachments',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20'),(56,'attachment-update-all','Update All Attachments',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20'),(57,'attachment-update-own','Update Own Attachments',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20'),(58,'attachment-delete-all','Delete All Attachments',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20'),(59,'attachment-delete-own','Delete Own Attachments',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20'),(60,'comment-create-all','Create All Comments',NULL,'2025-05-22 18:55:29','2025-05-22 18:55:29'),(61,'comment-create-own','Create Own Comments',NULL,'2025-05-22 18:55:29','2025-05-22 18:55:29'),(62,'comment-update-all','Update All Comments',NULL,'2025-05-22 18:55:29','2025-05-22 18:55:29'),(63,'comment-update-own','Update Own Comments',NULL,'2025-05-22 18:55:29','2025-05-22 18:55:29'),(64,'comment-delete-all','Delete All Comments',NULL,'2025-05-22 18:55:29','2025-05-22 18:55:29'),(65,'comment-delete-own','Delete Own Comments',NULL,'2025-05-22 18:55:29','2025-05-22 18:55:29'),(66,'bookshelf-view-all','View All BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(67,'bookshelf-view-own','View Own BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(68,'bookshelf-create-all','Create All BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(69,'bookshelf-create-own','Create Own BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(70,'bookshelf-update-all','Update All BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(71,'bookshelf-update-own','Update Own BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(72,'bookshelf-delete-all','Delete All BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(73,'bookshelf-delete-own','Delete Own BookShelves',NULL,'2025-05-22 18:55:37','2025-05-22 18:55:37'),(74,'templates-manage','Manage Page Templates',NULL,'2025-05-22 18:55:38','2025-05-22 18:55:38'),(75,'access-api','Access system API',NULL,'2025-05-22 18:55:39','2025-05-22 18:55:39'),(76,'content-export','Export Content',NULL,'2025-05-22 18:55:50','2025-05-22 18:55:50'),(77,'editor-change','Change page editor',NULL,'2025-05-22 18:55:58','2025-05-22 18:55:58'),(78,'receive-notifications','Receive & Manage Notifications',NULL,'2025-05-23 23:31:11','2025-05-23 23:31:11'),(79,'content-import','Import Content',NULL,'2025-05-23 23:31:14','2025-05-23 23:31:14');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(3,3),(2,4);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `system_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `external_auth_id` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `mfa_enforced` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_system_name_index` (`system_name`),
  KEY `roles_external_auth_id_index` (`external_auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','Administrator of the whole application','2025-05-22 18:54:59','2025-05-22 18:54:59','admin','',0),(2,'Editor','User can edit Books, Chapters & Pages','2025-05-22 18:54:59','2025-05-22 18:54:59','','',0),(3,'Viewer','User can view books & their content behind authentication','2025-05-22 18:54:59','2025-05-22 18:54:59','','',0),(4,'Public','The role given to public visitors if allowed','2025-05-22 18:55:18','2025-05-22 18:55:18','public','',0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_terms`
--

DROP TABLE IF EXISTS `search_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `search_terms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `term` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `search_terms_term_index` (`term`),
  KEY `search_terms_entity_type_index` (`entity_type`),
  KEY `search_terms_entity_type_entity_id_index` (`entity_type`,`entity_id`),
  KEY `search_terms_score_index` (`score`)
) ENGINE=InnoDB AUTO_INCREMENT=1195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_terms`
--

LOCK TABLES `search_terms` WRITE;
/*!40000 ALTER TABLE `search_terms` DISABLE KEYS */;
INSERT INTO `search_terms` VALUES (34,'Medidas','page',2,40),(35,'chaqueta','page',2,40),(36,'Toma','page',2,5),(37,'de','page',2,10),(38,'medidas','page',2,5),(39,'para','page',2,5),(40,'confección','page',2,5),(41,'chaquetas','page',2,5),(49,'Medidas','page',3,40),(50,'chaleco','page',3,45),(51,'Toma','page',3,5),(52,'de','page',3,10),(53,'medidas','page',3,5),(54,'para','page',3,5),(55,'confección','page',3,5),(64,'Medidas','page',4,40),(65,'camisa','page',4,40),(66,'Toma','page',4,5),(67,'de','page',4,10),(68,'medidas','page',4,5),(69,'para','page',4,5),(70,'confección','page',4,5),(71,'camisas','page',4,5),(72,'Trazado','chapter',2,48),(73,'En','chapter',2,1),(74,'este','chapter',2,1),(75,'capítulo','chapter',2,1),(76,'se','chapter',2,1),(77,'llevará','chapter',2,1),(78,'a','chapter',2,1),(79,'cabo','chapter',2,1),(80,'el','chapter',2,1),(81,'trazado','chapter',2,1),(82,'de','chapter',2,2),(83,'patrones','chapter',2,1),(84,'corte','chapter',2,1),(85,'sobre','chapter',2,1),(86,'la','chapter',2,1),(87,'tela','chapter',2,1),(179,'Toma','chapter',1,48),(180,'de','chapter',1,53),(181,'medidas','chapter',1,53),(182,'La','chapter',1,1),(183,'toma','chapter',1,2),(184,'es','chapter',1,1),(185,'una','chapter',1,1),(186,'etapa','chapter',1,1),(187,'fundamental','chapter',1,1),(188,'en','chapter',1,2),(189,'el','chapter',1,2),(190,'proceso','chapter',1,1),(191,'confección','chapter',1,1),(192,'ya','chapter',1,1),(193,'que','chapter',1,4),(194,'garantiza','chapter',1,1),(195,'las','chapter',1,4),(196,'prendas','chapter',1,2),(197,'se','chapter',1,2),(198,'ajusten','chapter',1,1),(199,'perfectamente','chapter',1,1),(200,'al','chapter',1,1),(201,'cuerpo','chapter',1,2),(202,'del','chapter',1,4),(203,'cliente','chapter',1,3),(204,'proporcionando','chapter',1,1),(205,'comodidad','chapter',1,1),(206,'y','chapter',1,8),(207,'un','chapter',1,1),(208,'acabado','chapter',1,1),(209,'profesional','chapter',1,1),(210,'Este','chapter',1,1),(211,'capítulo','chapter',1,1),(212,'describe','chapter',1,1),(213,'detalladamente','chapter',1,1),(214,'los','chapter',1,1),(215,'pasos','chapter',1,1),(216,'técnicas','chapter',1,1),(217,'herramientas','chapter',1,1),(218,'necesarias','chapter',1,1),(219,'para','chapter',1,4),(220,'obtener','chapter',1,1),(221,'precisas','chapter',1,1),(222,'confiables','chapter',1,1),(223,'\r','chapter',1,4),(224,'Se','chapter',1,1),(225,'incluyen','chapter',1,1),(226,'indicaciones','chapter',1,1),(227,'medir','chapter',1,1),(228,'diferentes','chapter',1,1),(229,'partes','chapter',1,1),(230,'además','chapter',1,1),(231,'recomendaciones','chapter',1,1),(232,'tomar','chapter',1,1),(233,'distintas','chapter',1,1),(234,'posturas','chapter',1,1),(235,'condiciones','chapter',1,1),(236,'También','chapter',1,1),(237,'destacan','chapter',1,1),(238,'aspectos','chapter',1,1),(239,'importantes','chapter',1,1),(240,'evitar','chapter',1,1),(241,'errores','chapter',1,1),(242,'comunes','chapter',1,1),(243,'asegurar','chapter',1,1),(244,'reflejen','chapter',1,1),(245,'con','chapter',1,2),(246,'exactitud','chapter',1,1),(247,'proporciones','chapter',1,1),(248,'Al','chapter',1,1),(249,'dominar','chapter',1,1),(250,'la','chapter',1,2),(251,'sastre','chapter',1,1),(252,'podrá','chapter',1,1),(253,'diseñar','chapter',1,1),(254,'confeccionar','chapter',1,1),(255,'personalizadas','chapter',1,1),(256,'realcen','chapter',1,1),(257,'figura','chapter',1,1),(258,'cumplan','chapter',1,1),(259,'sus','chapter',1,1),(260,'expectativas','chapter',1,1),(261,'estilo','chapter',1,1),(262,'funcionalidad','chapter',1,1),(877,'Trazado','page',5,40),(878,'pantalón','page',5,40),(879,'Trazado','page',6,40),(880,'chaqueta','page',6,40),(881,'Trazado','page',7,40),(882,'camisa','page',7,40),(883,'Trazado','page',8,40),(884,'chaleco','page',8,40),(900,'Confección','book',1,48),(901,'Guía','book',1,1),(902,'para','book',1,1),(903,'el','book',1,1),(904,'proceso','book',1,1),(905,'de','book',1,1),(906,'confección','book',1,1),(907,'pasos','book',1,1),(908,'detallados','book',1,1),(909,'con','book',1,1),(910,'ejemplos','book',1,1),(911,'en','book',1,1),(912,'imágenes','book',1,1),(913,'y','book',1,1),(914,'video','book',1,1),(915,'Medidas','page',1,40),(916,'pantalón','page',1,61),(917,'Toma','page',1,5),(918,'de','page',1,28),(919,'medidas','page',1,6),(920,'para','page',1,10),(921,'confeccionar','page',1,5),(922,'un','page',1,8),(923,'Herramientas','page',1,2),(924,'necesarias','page',1,2),(925,'Metro','page',1,2),(926,'flexible','page',1,2),(927,'Para','page',1,2),(928,'obtener','page',1,1),(929,'que','page',1,12),(930,'se','page',1,6),(931,'ajuste','page',1,2),(932,'perfectamente','page',1,1),(933,'es','page',1,5),(934,'esencial','page',1,1),(935,'tomar','page',1,1),(936,'las','page',1,2),(937,'correctas','page',1,1),(938,'con','page',1,7),(939,'precisión','page',1,2),(940,'A','page',1,1),(941,'continuación','page',1,1),(942,'describen','page',1,1),(943,'los','page',1,1),(944,'pasos','page',1,1),(945,'medir','page',1,1),(946,'al','page',1,4),(947,'cliente','page',1,10),(948,'manera','page',1,1),(949,'adecuada','page',1,1),(950,'1','page',1,1),(951,'Medida','page',1,7),(952,'la','page',1,33),(953,'cinturaColoca','page',1,1),(954,'cinta','page',1,7),(955,'métrica','page',1,3),(956,'alrededor','page',1,4),(957,'cintura','page',1,6),(958,'natural','page',1,2),(959,'del','page',1,27),(960,'suele','page',1,1),(961,'ubicarse','page',1,1),(962,'justo','page',1,3),(963,'arriba','page',1,1),(964,'ombligo','page',1,2),(965,'Sin','page',1,1),(966,'embargo','page',1,1),(967,'recomendable','page',1,2),(968,'preguntar','page',1,1),(969,'en','page',1,9),(970,'qué','page',1,1),(971,'punto','page',1,4),(972,'prefiere','page',1,1),(973,'fajar','page',1,1),(974,'su','page',1,3),(975,'ya','page',1,1),(976,'puede','page',1,3),(977,'variar','page',1,1),(978,'según','page',1,1),(979,'comodidad','page',1,1),(980,'o','page',1,13),(981,'estilo','page',1,3),(982,'personal','page',1,1),(983,'a','page',1,1),(984,'más','page',1,5),(985,'baja','page',1,1),(986,'alta','page',1,1),(987,'Asegúrate','page',1,1),(988,'esté','page',1,2),(989,'nivelada','page',1,1),(990,'todo','page',1,1),(991,'el','page',1,27),(992,'contorno','page',1,3),(993,'sin','page',1,4),(994,'apretar','page',1,1),(995,'ni','page',1,2),(996,'dejar','page',1,1),(997,'flojo','page',1,1),(998,'Función','page',1,7),(999,'flojo.Función','page',1,1),(1000,'Esta','page',1,6),(1001,'medida','page',1,6),(1002,'define','page',1,2),(1003,'superior','page',1,2),(1004,'y','page',1,11),(1005,'crucial','page',1,1),(1006,'evitar','page',1,1),(1007,'quede','page',1,2),(1008,'suelto','page',1,2),(1009,'demasiado','page',1,1),(1010,'ajustado','page',1,2),(1011,'parte','page',1,5),(1012,'importante','page',1,2),(1013,'sujeción','page',1,1),(1014,'2','page',1,1),(1015,'caderaMide','page',1,1),(1016,'ancha','page',1,2),(1017,'caderas','page',1,1),(1018,'glúteos','page',1,1),(1019,'normalmente','page',1,2),(1020,'ubicada','page',1,1),(1021,'entre','page',1,1),(1022,'18','page',1,1),(1023,'22','page',1,1),(1024,'cm','page',1,1),(1025,'por','page',1,4),(1026,'debajo','page',1,3),(1027,'dependiendo','page',1,2),(1028,'cuerpo','page',1,2),(1029,'La','page',1,2),(1030,'debe','page',1,3),(1031,'estar','page',1,2),(1032,'completamente','page',1,1),(1033,'horizontal','page',1,2),(1034,'ajustada','page',1,1),(1035,'comprimir','page',1,2),(1036,'comprimir.Función','page',1,1),(1037,'asegura','page',1,1),(1038,'tenga','page',1,1),(1039,'suficiente','page',1,1),(1040,'espacio','page',1,1),(1041,'inferior','page',1,2),(1042,'torso','page',1,1),(1043,'evitando','page',1,1),(1044,'tire','page',1,1),(1045,'abra','page',1,1),(1046,'cuando','page',1,1),(1047,'siente','page',1,1),(1048,'camine','page',1,1),(1049,'3','page',1,1),(1050,'largo','page',1,5),(1051,'pantalónColoca','page',1,1),(1052,'inicio','page',1,1),(1053,'acordado','page',1,1),(1054,'mide','page',1,2),(1055,'verticalmente','page',1,1),(1056,'hasta','page',1,7),(1057,'deseado','page',1,3),(1058,'ser','page',1,2),(1059,'tobillo','page',1,2),(1060,'ligeramente','page',1,2),(1061,'encima','page',1,1),(1062,'empeine','page',1,1),(1063,'diseño','page',1,1),(1064,'clásico','page',1,1),(1065,'tipo','page',1,2),(1066,'pitillo','page',1,1),(1067,'cropped','page',1,1),(1068,'etc','page',1,1),(1069,'mayor','page',1,1),(1070,'pie','page',1,1),(1071,'calzado','page',1,1),(1072,'zapato','page',1,1),(1073,'usará','page',1,1),(1074,'pantalón.Función','page',1,3),(1075,'determina','page',1,1),(1076,'completo','page',1,1),(1077,'relación','page',1,1),(1078,'postura','page',1,1),(1079,'4','page',1,1),(1080,'tiro','page',1,2),(1081,'total','page',1,2),(1082,'Mide','page',1,2),(1083,'desde','page',1,4),(1084,'delantera','page',1,1),(1085,'pasando','page',1,1),(1086,'entrepierna','page',1,4),(1087,'trasera','page',1,1),(1088,'siguiendo','page',1,1),(1089,'Es','page',1,1),(1090,'sentado','page',1,1),(1091,'deslice','page',1,1),(1092,'cuidado','page',1,1),(1093,'estirarse','page',1,1),(1094,'estirarse.Función','page',1,1),(1095,'permite','page',1,1),(1096,'definir','page',1,3),(1097,'profundidad','page',1,1),(1098,'altura','page',1,1),(1099,'clave','page',1,1),(1100,'garantizar','page',1,1),(1101,'no','page',1,1),(1102,'tirante','page',1,1),(1103,'sentarse','page',1,1),(1104,'forme','page',1,1),(1105,'bolsas','page',1,1),(1106,'innecesarias','page',1,1),(1107,'5','page',1,1),(1108,'ancho','page',1,3),(1109,'pierna','page',1,3),(1110,'muslo','page',1,2),(1111,'mantenerse','page',1,1),(1112,'ceñida','page',1,1),(1113,'músculo','page',1,1),(1114,'músculo.Función','page',1,1),(1115,'corte','page',1,1),(1116,'especialmente','page',1,1),(1117,'si','page',1,1),(1118,'busca','page',1,1),(1119,'entallado','page',1,1),(1120,'6','page',1,1),(1121,'base','page',1,1),(1122,'rodilla','page',1,3),(1123,'bajo','page',1,1),(1124,'Con','page',1,1),(1125,'toma','page',1,1),(1126,'distancia','page',1,1),(1127,'medio','page',1,1),(1128,'Sirve','page',1,1),(1129,'caída','page',1,1),(1130,'bota','page',1,3),(1131,'lo','page',1,1),(1132,'cual','page',1,1),(1133,'influye','page',1,1),(1134,'sí','page',1,1),(1135,'será','page',1,1),(1136,'recto','page',1,2),(1137,'acampanado','page',1,1),(1138,'entubado','page',1,1),(1139,'7','page',1,1),(1140,'boca','page',1,1),(1141,'Consulta','page',1,1),(1142,'sobre','page',1,1),(1143,'usa','page',1,1),(1144,'referencia','page',1,1),(1145,'Alternativamente','page',1,1),(1146,'final','page',1,1),(1147,'extremo','page',1,1),(1148,'cada','page',1,1),(1149,'impactando','page',1,1),(1150,'directamente','page',1,1),(1151,'skinny','page',1,1),(1152,'amplio','page',1,1),(1153,'palazzo','page',1,1),(1154,'campana','page',1,1),(1155,'Uso','book',2,48),(1156,'de','book',2,51),(1157,'herramientas','book',2,49),(1158,'Modo','book',2,1),(1159,'empleo','book',2,1),(1160,'las','book',2,1),(1161,'diferentes','book',2,1),(1162,'requeridas','book',2,1),(1163,'para','book',2,1),(1164,'el','book',2,1),(1165,'proceso','book',2,1),(1166,'confección','book',2,1),(1167,'Corte','chapter',3,48),(1168,'Proceso','chapter',3,1),(1169,'de','chapter',3,1),(1170,'corte','chapter',3,1),(1171,'Confección','chapter',4,48),(1172,'Proceso','chapter',4,1),(1173,'de','chapter',4,1),(1174,'confección','chapter',4,1),(1175,'Confección','page',9,40),(1176,'de','page',9,40),(1177,'pantalones','page',9,40),(1178,'Confección','page',10,40),(1179,'de','page',10,40),(1180,'sacos','page',10,40),(1181,'Confección','page',11,40),(1182,'de','page',11,40),(1183,'chaquetas','page',11,40),(1184,'Confección','page',12,40),(1185,'de','page',12,40),(1186,'camisas','page',12,40),(1187,'Máquina','chapter',5,48),(1188,'de','chapter',5,48),(1189,'coser','chapter',5,48),(1190,'eléctrica','chapter',5,48),(1191,'Máquina','chapter',6,48),(1192,'de','chapter',6,48),(1193,'coser','chapter',6,48),(1194,'pedal','chapter',6,48);
/*!40000 ALTER TABLE `search_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `setting_key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'string',
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('app-color','#206ea7','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-color-dark','#195785','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-color-light','rgba(32,110,167,0.15)','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-color-light-dark','rgba(32,110,167,0.15)','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-custom-head','','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-disable-comments','false','2025-05-23 22:33:46','2025-05-23 22:33:46','string'),('app-editor','wysiwyg','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-footer-links','[]','2025-05-24 00:37:36','2025-05-24 00:37:36','array'),('app-homepage','','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-homepage-type','books','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-name','SGC Sastrería Franco','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-name-header','true','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('app-public','false','2025-05-23 22:33:46','2025-05-23 23:03:24','string'),('app-secure-images','false','2025-05-23 22:33:46','2025-05-23 22:33:46','string'),('book-color','#077b70','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('book-color-dark','#389f60','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('bookshelf-color','#a94747','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('bookshelf-color-dark','#ff5454','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('chapter-color','#af4d0d','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('chapter-color-dark','#ee7a2d','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('instance-id','43823313-30d9-46b0-89fb-4e58c6384909','2025-05-23 23:31:15','2025-05-23 23:31:15','string'),('link-color','#206ea7','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('link-color-dark','#429fe3','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('page-color','#206ea7','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('page-color-dark','#429fe3','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('page-draft-color','#7e50b1','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('page-draft-color-dark','#a66ce8','2025-05-24 00:37:36','2025-05-24 00:37:36','string'),('user:1:dark-mode-enabled','true','2025-05-22 20:42:02','2025-05-24 00:40:10','string'),('user:1:language','es','2025-05-24 00:38:27','2025-05-24 00:38:27','string'),('user:1:section_expansion#home-details','false','2025-05-22 20:42:00','2025-05-22 20:42:01','string'),('user:3:books_view_type','list','2025-05-22 21:24:23','2025-05-22 21:24:23','string'),('user:3:dark-mode-enabled','true','2025-05-22 21:24:13','2025-05-24 00:38:53','string'),('user:3:language','es','2025-05-22 21:23:36','2025-05-22 21:23:36','string'),('user:3:section_expansion#home-details','false','2025-05-22 21:24:42','2025-05-22 21:24:44','string');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_accounts`
--

DROP TABLE IF EXISTS `social_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `driver` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driver_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `social_accounts_user_id_index` (`user_id`),
  KEY `social_accounts_driver_index` (`driver`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_accounts`
--

LOCK TABLES `social_accounts` WRITE;
/*!40000 ALTER TABLE `social_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sort_rules`
--

DROP TABLE IF EXISTS `sort_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sort_rules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sequence` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sort_rules`
--

LOCK TABLES `sort_rules` WRITE;
/*!40000 ALTER TABLE `sort_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `sort_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(11) NOT NULL,
  `entity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tags_name_index` (`name`),
  KEY `tags_value_index` (`value`),
  KEY `tags_order_index` (`order`),
  KEY `tags_entity_id_entity_type_index` (`entity_id`,`entity_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_invites`
--

DROP TABLE IF EXISTS `user_invites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_invites` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_invites_user_id_index` (`user_id`),
  KEY `user_invites_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_invites`
--

LOCK TABLES `user_invites` WRITE;
/*!40000 ALTER TABLE `user_invites` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_invites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_confirmed` tinyint(1) NOT NULL DEFAULT '1',
  `image_id` int(11) NOT NULL DEFAULT '0',
  `external_auth_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `system_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_slug_unique` (`slug`),
  KEY `users_external_auth_id_index` (`external_auth_id`),
  KEY `users_system_name_index` (`system_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@admin.com','$2y$12$xadFz/XgW8JS4oxQt4xnFeLR/bo6FCi76IHPQus2ZJ.dV6QiOJpbe',NULL,'2025-05-22 18:54:55','2025-05-23 23:39:06',1,0,'',NULL,'admin'),(2,'Guest','guest@example.com','',NULL,'2025-05-22 18:55:20','2025-05-22 18:55:20',1,0,'','public','guest'),(3,'Carlos Córdoba','carlosc17@udenar.edu.co','$2y$12$i0OtOqgR1Rw59MkEBbVsPeua2zR6YNaPY5OFerFGeCQ7t8oJhe1X.',NULL,'2025-05-22 21:23:36','2025-05-23 23:37:49',1,1,'',NULL,'carlos-cordoba');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `views` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `viewable_id` int(11) NOT NULL,
  `viewable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `views_user_id_index` (`user_id`),
  KEY `views_viewable_id_index` (`viewable_id`),
  KEY `views_updated_at_index` (`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (1,1,1,'book',31,'2025-05-22 20:40:49','2025-06-02 00:43:32'),(2,1,1,'chapter',10,'2025-05-22 21:12:27','2025-05-24 00:44:22'),(3,1,1,'page',17,'2025-05-22 21:13:17','2025-05-24 00:51:36'),(4,1,2,'page',1,'2025-05-22 21:14:43','2025-05-22 21:14:43'),(5,1,3,'page',1,'2025-05-22 21:15:27','2025-05-22 21:15:27'),(6,1,4,'page',1,'2025-05-22 21:17:00','2025-05-22 21:17:00'),(7,1,2,'chapter',5,'2025-05-22 21:19:20','2025-05-24 00:19:23'),(8,3,2,'chapter',2,'2025-05-22 21:25:10','2025-05-24 00:16:40'),(9,3,1,'book',7,'2025-05-22 21:25:24','2025-05-24 00:28:15'),(10,3,1,'chapter',2,'2025-05-22 21:25:31','2025-05-24 00:15:37'),(11,3,1,'page',2,'2025-05-24 00:15:43','2025-05-24 00:15:49'),(12,1,5,'page',1,'2025-05-24 00:18:14','2025-05-24 00:18:14'),(13,1,6,'page',1,'2025-05-24 00:18:59','2025-05-24 00:18:59'),(14,1,7,'page',1,'2025-05-24 00:19:17','2025-05-24 00:19:17'),(15,1,8,'page',1,'2025-05-24 00:19:32','2025-05-24 00:19:32'),(16,1,2,'book',4,'2025-06-02 00:32:55','2025-06-02 00:43:29'),(17,1,3,'chapter',1,'2025-06-02 00:33:40','2025-06-02 00:33:40'),(18,1,4,'chapter',5,'2025-06-02 00:34:20','2025-06-02 00:35:57'),(19,1,9,'page',1,'2025-06-02 00:34:50','2025-06-02 00:34:50'),(20,1,10,'page',1,'2025-06-02 00:35:16','2025-06-02 00:35:16'),(21,1,11,'page',1,'2025-06-02 00:35:43','2025-06-02 00:35:43'),(22,1,12,'page',1,'2025-06-02 00:36:23','2025-06-02 00:36:23'),(23,1,5,'chapter',1,'2025-06-02 00:42:44','2025-06-02 00:42:44'),(24,1,6,'chapter',1,'2025-06-02 00:43:07','2025-06-02 00:43:07');
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watches`
--

DROP TABLE IF EXISTS `watches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `watchable_id` int(11) NOT NULL,
  `watchable_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` tinyint(3) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `watchable_index` (`watchable_id`,`watchable_type`),
  KEY `watches_user_id_index` (`user_id`),
  KEY `watches_level_index` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watches`
--

LOCK TABLES `watches` WRITE;
/*!40000 ALTER TABLE `watches` DISABLE KEYS */;
/*!40000 ALTER TABLE `watches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webhook_tracked_events`
--

DROP TABLE IF EXISTS `webhook_tracked_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webhook_tracked_events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `webhook_id` int(11) NOT NULL,
  `event` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `webhook_tracked_events_event_index` (`event`),
  KEY `webhook_tracked_events_webhook_id_index` (`webhook_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webhook_tracked_events`
--

LOCK TABLES `webhook_tracked_events` WRITE;
/*!40000 ALTER TABLE `webhook_tracked_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `webhook_tracked_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webhooks`
--

DROP TABLE IF EXISTS `webhooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `endpoint` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `timeout` int(10) unsigned NOT NULL DEFAULT '3',
  `last_error` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_called_at` timestamp NULL DEFAULT NULL,
  `last_errored_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `webhooks_name_index` (`name`),
  KEY `webhooks_active_index` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webhooks`
--

LOCK TABLES `webhooks` WRITE;
/*!40000 ALTER TABLE `webhooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `webhooks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-02  0:47:25
