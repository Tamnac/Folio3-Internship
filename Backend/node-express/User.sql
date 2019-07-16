BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
	"fname"	varchar(255),
	"lname"	varchar(255),
	"email"	varchar(255),
	"Field4"	INTEGER
);
COMMIT;
