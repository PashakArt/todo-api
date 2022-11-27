# API for todo list

## Functional:
* User registration/authorization. During authorization, the user on the client receives a JWT from which you can get the user id.
* An authorized user has access to CRUD endpoints for the todo entity (there must be a middleware in which there will be a valid token check)
* Getting todo is available both all at once and page by page. Filters possible

## Technology stack:
* NodeJS
* Express
* MongoDB/Mongoose (mongoDb Atlas)
* JWT
* bcrypt (for password hashing)

### Install

    npm i
    
### Run

    npm start
