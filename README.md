# exampleCRM

## Description

Basic Customer Relationship Management System (REST + ORM)  
Backend: Django  
Frontend: ReactJS

## Configuration:

1. Download the repository.

2. Create a local MySQL database called "exampleCRM" (or change the details in backend's configuration).

3. Configure the backend in its subdirectory:  
- Django:  
(to change the database settings edit "Main/settings.py")  
run "python ./manage.py makemigrations crm"  
run "python ./manage.py migrate"  


4. Run required_data.sql (or sample_data.sql for more data) as a script for your database.

5. Run the backend:  
- Django:  
run "python ./manage.py runserver"  

6. Configure the frontend in its subdirectory:  
- React:  
run "npm install"  
run "npm start"  

7. To access the frontend connect to "http://localhost:3000".

8. To access the backend Rest API connect to "http://localhost:8000/api".
- Sample logins:  
login: admin, password: admin  
login: mod1, password: mod1  
login: user1, password: user1  
