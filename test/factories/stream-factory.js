var Stream = require("stream");
var sinon = require("sinon");
Math.e
module.exports = {
    readStream: function(){
        var s = new Stream();
        s.readable = true;
        s.sendData = function(data){
            s.emit('data', data);
        };
        return s;
    },
    writeStream: function(){
        var s = new Stream();
        s.writable = true;
        s.write = sinon.spy();

        return s;
    },
    duplexStream: function(){
        var s = new Stream();
        s.writable = true;
        s.readable = true;
        s.write = sinon.spy();

        return s;
    }
};
