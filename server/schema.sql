DROP DATABASE IF EXISTS fifa;

CREATE DATABASE fifa;

USE fifa;
CREATE TABLE teams(
  team_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(50) 
);

CREATE TABLE users(
  user_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255),
  password VARCHAR(100) NOT NULL, 
);

CREATE TABLE pools(
  pool_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  poolName VARCHAR(100) NOT NULL UNIQUE,
)

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
INSERT INTO users (name) VALUES ('Jack'),('Erik');
INSERT INTO userBrackets VALUES (1,1,1,2,2,2,2,NULL),(2,1,1,2,2,2,1,NULL),(1,2,3,4,1,0,3,NULL),(2,2,3,4,2,0,3,NULL);
INSERT INTO matches VALUES (DEFAULT,1,2,0,2,2);
INSERT INTO matches VALUES (DEFAULT,3,4,1,2,4);
INSERT INTO matches VALUES (DEFAULT,5,6,2,2,6);
INSERT INTO matches VALUES (DEFAULT,7,8,0,2,8);

select * from userBrackets;
--UPDATE SCORE-------------------------------------------------
UPDATE userBrackets b
INNER JOIN matches m ON b.match_ID = m.match_ID
SET
  b.score = CASE WHEN b.teamA_ID = m.teamA_ID AND b.goals_A = m.goals_A THEN 0.5 ELSE 0 END
WHERE b.match_ID = 2;

UPDATE userBrackets b
INNER JOIN matches m ON b.match_ID = m.match_ID
SET
  b.score = CASE WHEN b.teamB_ID = m.teamB_ID AND b.goals_B = m.goals_B THEN b.score + 0.5 ELSE b.score END
WHERE b.match_ID = 2;

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
WHERE b.match_ID = 2;

SELECT u.*, sum(b.score) as score
FROM users u
  INNER JOIN userBrackets b ON u.user_ID = b.user_ID
GROUP BY u.user_ID;
