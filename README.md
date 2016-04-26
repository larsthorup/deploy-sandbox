Node deployment automation - sandbox
====

This repo showcases ways to deploy a node web service. Target platforms currently includes

* Local developer box
* Modulus 

ToDo:

* Smoke test
* SSL (Let's encrypt?)
* Outdated check: package.json/engines
* Pure JavaScript check (no binary dependencies)
* Deploy what was tested: no npm install on prod server
* Rollback


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


Travis-CI
----

* `PASSPHRASE`: your secret passphrase
* `NODE_ENV`: `production`


    npm run travis:deploy

