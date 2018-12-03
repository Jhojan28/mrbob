const crypto = require('crypto')
const cryptoConfig = {
    algorithm: process.env.ALGORITHM || 'aes-256-ctr',
    password: process.env.ALG_PASS || 'd6F3Efeq'
}
module.exports = {
	endpoint: process.env.API_ENDPOINT || 'http://localhost:3000',
	serverHost: process.env.SERVER_HOST || 'http://locahost:8080',
	encrypt: function encrypt(text){
		var cipher = crypto.createCipher(cryptoConfig.algorithm,cryptoConfig.password)
		var crypted = cipher.update(text,'utf8','hex')
		crypted += cipher.final('hex');
		return crypted;
	},	   
	decrypt: function decrypt(text){
		var decipher = crypto.createDecipher(cryptoConfig.algorithm,cryptoConfig.password)
		var dec = decipher.update(text.toString(),'hex','utf8')
		dec += decipher.final('utf8');
		return dec;
	}
}