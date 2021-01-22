# django-react-todo
Django Rest API + React for learning


## Requirements

-   Python3
-   Pipenv

## Get started

Clone the project through ssh to your machine  
```sh
$ git clone https://github.com/lifeeric/django-react-todo
```
Navigate into the diretory  
```sh 
$ cd django-todo-react
```
Source the virtual environment  
```sh 
$ pipenv shell
```
Install the dependencies  
```sh
$ pipenv install
```
Navigate into the frontend directory  
```sh 
$ cd frontend
```
Install the dependencies  
```
$ yarn
# or npm
$ npm install 
```

## Run Local Server

go to the root directory of your project and run the below command, make sure you have installed python3.9 and pip

```sh
$ python manage.py runserver
```

change directory to `frontend/`:
```
$ cd frontend/
$ yarn start
```

backend is running on `http://localhost:8000` and frontend is on `http://localhost:3000`
