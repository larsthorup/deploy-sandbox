Node deployment automation - sandbox
====

This repo showcases ways to deploy a node web service. Target platforms currently includes

* Modulus 

ToDo:

* SSL (Let's encrypt?)
* Outdated check: package.json/engines
* Pure JavaScript check (no binary dependencies)
* Deploy what was tested: no npm install on prod server
* Rollback

Prerequisites
----

    npm install

    # set PASSPHRASE environment variable to your secret passphrase
    npm run cryptex:key



Encrypting secrets
----

* Modulus signup 
* Modulus API token generation
* Modulus custom domain configuration ("lars4711.mod.biz")
* Modulus SSL certificate upload
* PostgreSQL hosting, e.g. elephantsql.com


    npm run modulus login
    # enter your modulus user name and password
    
    npm run modulus:token
    npm run cryptex:encrypt -- <modulus-token>
    # paste encrypted token into cryptex.json
    
    npm run cryptex:encrypt -- <postgresql-connection-string>
    # paste encrypted token into cryptex.json


Deploy
----

* `NODE_ENV`: `production`


    npm run modulus:deploy



Travis-CI
----

* `PASSPHRASE`: your secret passphrase
* `NODE_ENV`: `production`


    npm run travis:deploy

