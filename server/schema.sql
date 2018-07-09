DROP DATABASE IF EXISTS fifa;

CREATE DATABASE fifa;

USE fifa;

CREATE TABLE users (
  user_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
  msg_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_ID INTEGER NOT NULL,
  message VARCHAR(280) NOT NULL
);

CREATE TABLE todos(
  todo_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(280) 
);

CREATE TABLE teams(
  team_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(50) 
);

CREATE TABLE players(
  user_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) 
);

CREATE TABLE matches(
  match_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  teamA_ID INTEGER NOT NULL,
  teamB_ID INTEGER NOT NULL,
  goals_A INTEGER NOT NULL,
  goals_B INTEGER NOT NULL,
  winner_ID INTEGER NOT NULL
);

CREATE TABLE userBrackets(
  user_ID INTEGER NOT NULL,
  match_ID INTEGER NOT NULL,
  teamA_ID INTEGER NOT NULL,
  teamB_ID INTEGER NOT NULL,
  goals_A INTEGER NOT NULL,
  goals_B INTEGER NOT NULL,
  winner_ID INTEGER NOT NULL,
  score DOUBLE 
);

INSERT INTO teams (country) VALUES ('Uruguay'),('France'),('Brazil'),('Belgium'),('Russia'),('Croatia'),('Sweden'),('England');
INSERT INTO players (name) VALUES ('Jack'),('Erik');
INSERT INTO userBrackets VALUES (1,1,1,2,2,2,2,NULL),(2,1,1,2,2,2,1,NULL),(1,2,3,4,1,0,3,NULL),(2,2,3,4,2,0,3,NULL);
INSERT INTO matches VALUES (DEFAULT,1,2,0,2,2);

--UPDATE SCORE-------------------------------------------------
UPDATE userBrackets b
INNER JOIN matches m ON b.match_ID = m.match_ID
SET
  b.score = CASE WHEN b.teamA_ID = m.teamA_ID AND b.goals_A = m.goals_A THEN 0.5 ELSE 0 END
WHERE b.match_ID = 1;

UPDATE userBrackets b
INNER JOIN matches m ON b.match_ID = m.match_ID
SET
  b.score = CASE WHEN b.teamB_ID = m.teamB_ID AND b.goals_B = m.goals_B THEN b.score + 0.5 END
WHERE b.match_ID = 1;

UPDATE userBrackets b
INNER JOIN matches m ON b.match_ID = m.match_ID
SET
  b.score = CASE WHEN b.winner_ID = m.winner_ID THEN
  CASE 
    WHEN b.match_ID <=4 THEN b.score + 1 
    WHEN b.match_ID IN (5,6) THEN b.score + 2
    WHEN b.match_ID = 7 THEN b.score + 4
  END
  ELSE b.score
END
WHERE b.match_ID = 1;

