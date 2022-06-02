DROP TABLE IF EXISTS charactersheet CASCADE;

CREATE TABLE charactersheet (
	id INT AUTO_INCREMENT,
	forename VARCHAR(255) NOT NULL,
	surname VARCHAR(255),
	level INT NOT NULL,
	char_class VARCHAR(255) NOT NULL,
	race VARCHAR(255) NOT NULL,
	alignment VARCHAR(255) NOT NULL,
	background VARCHAR(255) NOT NULL,
	gender VARCHAR(255) NOT NULL,
	char_image VARCHAR(255),
	PRIMARY KEY(id)
);	