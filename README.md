Node deployment automation - sandbox
====

This repo showcases ways to deploy a node web service. Target platforms currently includes

* Local developer box
* Modulus 

ToDo:

* Travis-CI
* decrypt config
* Smoke test


General environment variables
----

* `POSTGRESQL_CONNECTION_STRING` refers to a running Postgresql database with schema from [postgresql-deploy-sandbox](github.com/larsthorup/postgresql-deploy-sandbox)
* `PORT` is where the service will listen for requests

Local
----

    npm install
    npm start
    http://localhost:PORT/users

Modulus
----

Environment variables in addition to the general variables mentioned above

* `MODULUS_USERNAME`
* `MODULUS_PASSWORD`
* `MODULUS_PROJECT_NAME`


    npm run modulus:deploy

    