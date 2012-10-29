var useragent = require('useragent');

module.exports = function(UA, cb){
    cb(null,  useragent.parse(UA));
};
