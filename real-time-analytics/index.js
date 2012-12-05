var IpcStream   = require("ipc-stream");


var parentStream = new IpcStream(process);

parentStream.pipe(process.stdout);

