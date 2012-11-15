curl \
  -H "Host:localhost:3000" \
  -H "Content-Type:application/json;charset=UTF-8" \
  -H "Origin:http://rauschen.info"\
  -H "Referer:http://rauschen.info"\
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1215.0 Safari/537.2"\
  -d '{"memory":{"jsHeapSizeLimit":793000000,"usedJSHeapSize":10000000,"totalJSHeapSize":12700000},"timing":{"loadEventEnd":0,"loadEventStart":1351280788933,"domComplete":1351280788933,"domContentLoadedEventEnd":1351280788929,"domContentLoadedEventStart":1351280788907,"domInteractive":1351280788907,"domLoading":1351280788559,"responseEnd":1351280788552,"responseStart":1351280788549,"requestStart":1351280788546,"secureConnectionStart":0,"connectEnd":1351280788542,"connectStart":1351280788542,"domainLookupEnd":1351280788542,"domainLookupStart":1351280788542,"fetchStart":1351280788542,"redirectEnd":0,"redirectStart":0,"unloadEventEnd":1351280788553,"unloadEventStart":1351280788553,"navigationStart":1351280788542},"navigation":{"redirectCount":0,"type":1}}' \
  http://localhost:3000
