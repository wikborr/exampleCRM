INSERT INTO crm_role (name) VALUES
	 ('Admin'),
	 ('Moderator'),
	 ('User');

INSERT INTO crm_user (name,surname,dateOfBirth,login,password,isDeleted,roleId_id) VALUES
	 ('Jan','Kowalski','1900-01-01','admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',0,1),
	 ('NULL','NULL','0001-01-01','NULL','NULL',1,3),
	 ('Jan','Kowalski','1900-01-02','jk2','b6ad34b0b6b7e38f878a513b3f7927ebeb4cffb01aeb6d9fd9f9ad67fbc76517',0,3),
	 ('Jan','Kowalski','1900-01-03','jk1','b6ad34b0b6b7e38f878a513b3f7927ebeb4cffb01aeb6d9fd9f9ad67fbc76517',0,3),
	 ('Jan','Kowalski','1900-01-04','jk4','9c6d405bba2db24bfbd22fc7ff74b39bd9c5e9c6ce66299c6519be517e6ed7c6',0,3),
	 ('Jan','Kowalski','1900-01-05','jk5','17f80754644d33ac685b0842a402229adbb43fc9312f7bdf36ba24237a1f1ffb',0,3),
	 ('Jan','Kowalski','1900-01-06','jk6','c39e8a31b0b7192e173c5c5314b306c92e4a0fcba695d7883f4936a82e6f2d44',0,3),
	 ('Jan','Kowalski','1900-01-07','mod1','82d4f4cb4d38e5edc3485ac6bf1fcdef0bd211847e63281f2fb42d5151758e5f',0,2),
	 ('Jan','Kowalski','1900-01-08','mod2','b9cb59cc224e16ce251d4b277d51f22ece4106045d51d8c24ef1760cc3d731cd',0,2),
	 ('Jan','Kowalski','1900-01-09','mod3','b9cb59cc224e16ce251d4b277d51f22ece4106045d51d8c24ef1760cc3d731cd',0,2);
INSERT INTO crm_user (name,surname,dateOfBirth,login,password,isDeleted,roleId_id) VALUES
	 ('NULL','NULL','0001-01-01','NULL','NULL',1,3),
	 ('Janusz','Kowalski','1950-01-01','jn1','3a5745a05f87ddee1db68b217dc043bfa206d1c7aaa1dd0a7dd76b852a733597',0,3),
	 ('NULL','NULL','0001-01-01','NULL','NULL',1,3),
	 ('NULL','NULL','0001-01-01','NULL','NULL',1,3),
	 ('NULL','NULL','0001-01-01','NULL','NULL',1,3),
	 ('Jan','Kowalski','1700-01-02','user1','0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90',0,3);

INSERT INTO crm_brand (name) VALUES
	 ('NULL'),
	 ('Food'),
	 ('Beverage'),
	 ('IT'),
	 ('Gaming');

INSERT INTO crm_company (name,nip,address,city,isDeleted,adminId_id,brandId_id) VALUES
	 ('Mięsex','3942259314','Mięsna 1','Poznań',0,8,2),
	 ('Bagietex','8382977429','Pieczywna 1','Warszawa',0,8,2),
	 ('Warzywex','8237131138','Warzywna 15','Kraków',0,8,2),
	 ('Parówex','1220127252','Mięsna 2','Poznań',0,8,2),
	 ('Wodex','5258745393','Wodna 87','Gdańsk',0,9,3),
	 ('Piwex','1170468263','Procentowa 10','Szczecin',0,9,3),
	 ('Komputerex','9325469363','Serwisowa 37','Poznań',0,9,4),
	 ('Internex','1235261755','Łączna 404','Moskwa',0,9,4),
	 ('Hostingex','4161034348','Wolna 500','Wrocław',0,9,4),
	 ('DVDProjektex','9520189675','Robacza 23','Warszawa',0,10,5);
INSERT INTO crm_company (name,nip,address,city,isDeleted,adminId_id,brandId_id) VALUES
	 ('Micrsonex','3383844917','Monopolowa 99','Rzeszów',0,10,5),
	 ('NULL','NULL','NULL','NULL',1,1,1);

INSERT INTO crm_note (content,isDeleted,adminId_id,companyId_id) VALUES
	 ('At to perfectior quamprimum deprehendi. Videtur vel angelum poterit junctas eas sentiam. Et potentiam expendere occasione tractarem im. Dem praestari age apollonio realitate attingere aut. Cum signa vix porro abuti nobis hac reges dubio. Hocque quibus eos perire postea pro tribuo ubi infixa pla. Illarum minimum creatus nec videmur hos sentire.',0,6,1),
	 ('Si sequitur tactiles bonitati si in refutent. Non gnum fert fiat sed hoc cau vice meos. Unam ens eae dei veat tria nova erat. Potuit age quanto mem necdum cum tandem lor nihilo. Fal spem vita eas dici apud uno has apta. Tius rom hae nova mei eae quis. Ingeniosi vos separatum ita aliquando manifeste. Clara gi verae sciam rerum ex. Co re desumptas quantitas objective ea.',0,7,3),
	 ('Omni sae nudi sub ulla vel ego idem sunt. An iterum ei re nullos curant ordine inesse absque. Blandisque quaerantur antedictis apprehendo re objectivus ea dulcedinem. Quanto eos tur loquar contra summam rea sum nullam qualis. Perspicuum voluntates appellatur tum transferre qui parentibus repugnemus. Admonitus incurrant praeclare objective ad ha separatum ac formantur. Prudentiae discrepant commendare eae vis confirmari mea. Sed illud vix venit hac verba aptum nomen. Ii idem ad nunc vi more du luce.',0,12,5),
	 ('Quasi novas ac ut prout re somno. Habeo coeco oculi qua mei vitro manum sae. Ut hinc et ob vice esto. Ingressus ita perfectae dubitarem vereorque his conservet ima. Flexibile co ut facultate desumptas corporeis coloribus ob desinerem. Organa somnio dubias secius deinde vos dat coelum. Hoc mea procul cui auditu hic vocant. Stupor ex ha varias dictis. Apud re gi ipsi ii post eram quia idem. Ignosci movendi non cur ceteris ita.',0,7,2),
	 ('NULL',1,1,1),
	 ('NULL',1,1,1);

INSERT INTO crm_contactperson (name,surname,phone,email,`position`,isDeleted,adminId_id,companyId_id) VALUES
	 ('Jan','Kowalski','092160629','contact@localhost.org','Sekretarz',0,8,1),
	 ('Janczysław','Kowalski','061320466','contact@localhost.org','Sekretarz',0,8,2),
	 ('Janisław','Kowalski','131462749','contact@localhost.org','Sekretarz',0,8,3),
	 ('Januariusz','Kowalski','958025249','contact@localhost.org','Sekretarz',0,8,4),
	 ('January','Kowalski','182233403','contact@localhost.org','Sekretarz',0,8,5),
	 ('Janusz','Kowalski','073332853','contact@localhost.org','Sekretarz',0,9,6),
	 ('Jarogniew','Kowalski','867028300','contact@localhost.org','Sekretarz',0,9,7),
	 ('Jaromir','Kowalski','673695833','contact@localhost.org','Sekretarz',0,9,8),
	 ('Jarostryj','Kowalski','285737984','contact@localhost.org','Sekretarz',0,9,9),
	 ('NULL','NULL','NULL','NULL@NULL.COM','NULL',1,1,1);