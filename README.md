Node deployment automation - sandbox
====

This repo showcases ways to deploy a node web service. Target platforms currently includes

* Local developer box
* Modulus 

ToDo:

* Travis-CI
* Smoke test

Prerequisites
----

    npm install


Local development
----

    npm start
    http://localhost:1719/users


Decrypting secrets
----

Environment variable

* `PASSPHRASE`: your secret passphrase

    npm run cryptex:key


Production
----

* `NODE_ENV`: `production`

    npm start
    http://localhost:1719/users


Modulus
----

* `NODE_ENV`: `production`

    npm run modulus:deploy

