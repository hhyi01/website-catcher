DROP DATABASE IF EXISTS siteData;

CREATE DATABASE siteData;

USE siteData;

CREATE TABLE jobs (
  job_id INT AUTO_INCREMENT NOT NULL,
  url TEXT,
  job_status ENUM('created', 'in progress', 'failed', 'complete') DEFAULT 'created',
  html LONGBLOB,
  mime_type VARCHAR(200),
  job_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_agent TEXT,
  PRIMARY KEY (job_id)
);