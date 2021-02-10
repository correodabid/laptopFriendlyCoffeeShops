# Content table

- [Revision](#revision)
- [Resume](#resume)
- [Requirements](#requirements)
- [Installation](#installation)
- [Test](#test)
- [API Endpoints](#api-endpoints)

# Revision

- Author: David Rodríguez Delgado
- Date: 02/10/2020 (MM/dd/yyyy)
- Revisión: 0
- Cambios:

# Resume

This API project was made in order to accomplish with MMGs ["Node backend developers test"](https://github.com/medlabmg/developers-tests/tree/master/backend/node) project requirements.

[Content Table](#content-table)

# Requirements

- Nodejs v12.18.1
- Mongodb v4.2.2

[Content Table](#content-table)

# Installation

    git clone
    cd
    npm install
    npm start

[Content Table](#content-table)

# Test

To launch all the tests:

    npm run test

To launch each test separately:

    npm run test:auth
    npm run test:coffeeShops
    npm run test:comments
    npm run test:users

[Content Table](#content-table)

# API Endpoints

**_You got a Postman File in doc folder._**

Login:

    curl --location --request POST 'http://localhost:7070/api/v1/auth' \
    --header 'Content-Type: application/json' \
    --data-raw '{"username":"admin", "password":"1234"}'

Create User:

    curl --location --request POST 'http://localhost:7070/api/v1/users' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI0OWM0OGZlOTk3YmYzOTY2MDRhZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MTI4NjI5ODF9.WNyaeOXQWDKXCoCN9PDR7ttrFQuLhEoeImhHMVFJTqo' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "type": "user",
        "username": "pepe",
        "password": "1234"
    }'

List Coffee Shops:

    curl --location --request GET 'http://localhost:7070/api/v1/coffeeShops' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI0OWM0OGZlOTk3YmYzOTY2MDRhZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MTI4NjI5ODF9.WNyaeOXQWDKXCoCN9PDR7ttrFQuLhEoeImhHMVFJTqo'

List Paginated Coffee Shops:

    curl --location --request GET 'http://localhost:7070/api/v1/coffeeShops/paginated?page=1&limit=5' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI0OWM0OGZlOTk3YmYzOTY2MDRhZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MTI4NjI5ODF9.WNyaeOXQWDKXCoCN9PDR7ttrFQuLhEoeImhHMVFJTqo'

Create Coffee Shop:

    curl --location --request POST 'http://localhost:7070/api/v1/coffeeShops' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI0OWM0OGZlOTk3YmYzOTY2MDRhZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MTI4NjI5ODF9.WNyaeOXQWDKXCoCN9PDR7ttrFQuLhEoeImhHMVFJTqo' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name":"El bar de la esquina"
    }'

Create Comment:

    curl --location --request POST 'http://localhost:7070/api/v1/comments' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI0OWM0OGZlOTk3YmYzOTY2MDRhZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MTI4NjI5ODF9.WNyaeOXQWDKXCoCN9PDR7ttrFQuLhEoeImhHMVFJTqo' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title":"Test Comment",
        "body":"Body comment",
        "coffeeShop":"6023a15f4ef5dcf23ceb2818"
    }'

[Content Table](#content-table)
