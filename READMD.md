# Flask-React Book Library

A book library application built with flask and react.

## Main Features

- CRUD
- Authentication
- Pagination
- State management

## Setup

#### Backend

```bash
# setup virtual environment
$ python -m venv venv

# activate virtual environment
$ . venv/bin/activate # or venv\Scripts\activate on windows

# install dependencies
$ pip install -r requirements.txt

# run tests
$ python -m py.test -x

# setup database
$ python manage.py db upgrade

# seed the database with some records
$ python manage.py seed

# run application
$ python manage.py runserver # http://localhost:5000
```

**Note**: You change the port number for the backend in case of a conflict by running `python manage.py runserver --port 5555`, but when you do, you will have to change the base URL in the file `ui/src/services/http.js`.

#### Frontend

```bash
$ cd ui

# install dependencies
$ npm install

# run and test in the browser
$ npm run start # http://localhost:8080
```

#### Demo

You can check it out [here](https://flask-react-book-library.herokuapp.com/).
