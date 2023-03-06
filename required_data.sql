INSERT INTO crm_role (name) VALUES
	 ('Admin'),
	 ('Moderator'),
	 ('User');

INSERT INTO crm_brand (name) VALUES
	 ('NULL');

INSERT INTO crm_user (name,surname,dateOfBirth,login,password,isDeleted,roleId_id) VALUES
	 ('Jan','Kowalski','1900-01-01','admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',0,1);