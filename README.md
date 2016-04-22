Node deployment automation - sandbox
====

This repo showcases ways to deploy a node web service. Target platforms currently includes

* Local developer box
* Modulus 

ToDo:

* Travis-CI
* decrypt config
* Smoke test

Prerequisites
----

    npm install


Local development
----

    npm start
    http://localhost:1719/users


Production
----

Environment variable

* `PASSPHRASE`: your single secret deployment passphrase
* `CRYPTEX_ENV`: `production`

    npm run cryptex:key
    npm start
    http://localhost:1719/users


Modulus
----

    npm run modulus:deploy

