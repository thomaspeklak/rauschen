var useragent = require('useragent');

module.exports = function(UA, cb){
    process.nextTick(function(){
        cb(null,  useragent.parse(UA));
    });
};
