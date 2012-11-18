var request = require('request');

var options = {
    uri: 'http://localhost:3000',
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
        , "Origin": "http://rauschen.info"
        , "Referer": "http://rauschen.info"
        , "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1215.0 Safari/537.2"
    },
    json: {"memory":{"jsHeapSizeLimit":793000000,"usedJSHeapSize":10000000,"totalJSHeapSize":12700000},"timing":{"loadEventEnd":0,"loadEventStart":1351280788933,"domComplete":1351280788933,"domContentLoadedEventEnd":1351280788929,"domContentLoadedEventStart":1351280788907,"domInteractive":1351280788907,"domLoading":1351280788559,"responseEnd":1351280788552,"responseStart":1351280788549,"requestStart":1351280788546,"secureConnectionStart":0,"connectEnd":1351280788542,"connectStart":1351280788542,"domainLookupEnd":1351280788542,"domainLookupStart":1351280788542,"fetchStart":1351280788542,"redirectEnd":0,"redirectStart":0,"unloadEventEnd":1351280788553,"unloadEventStart":1351280788553,"navigationStart":1351280788542},"navigation":{"redirectCount":0,"type":1}}
};

var counter = 0;
function makeRequest(){
    request(options, function (error, response, body) {
        counter += 1;
        makeRequest();
    });
}

makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();


setInterval(function() {
    console.log(counter);
    counter = 0;
}, 1000);
