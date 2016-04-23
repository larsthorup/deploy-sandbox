var crypto = require('crypto');
var fs = require('fs');

var key = crypto.pbkdf2Sync(process.env.PASSPHRASE, 'whatever salt', 32, 32).toString('base64');
fs.writeFileSync('cryptex.key', key);