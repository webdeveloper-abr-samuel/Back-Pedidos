const helper = {};
const CryptoJS = require("crypto-js");


helper.crypt = (value) => CryptoJS.AES.encrypt(value.toString(), 'secret key 123').toString();
helper.Descryp = (value) => CryptoJS.AES.decrypt(value, 'secret key 123').toString(CryptoJS.enc.Utf8);


module.exports = helper;