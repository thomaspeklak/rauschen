request = require "supertest"
app = require "../frontend/server.js"

describe "Frontend", ->
  it "should respond with 204 when valid statistics are posted", (done) ->
    request(app)
      .post("/")
      .send(
        "body" :
          "memory":
            "jsHeapSizeLimit" : 0
            "usedJSHeapSize"  : 0
            "totalJSHeapSize" : 0
          "timing":
            "loadEventEnd"               : 1343077373652
            "loadEventStart"             : 1343077373646
            "domComplete"                : 1343077373646
            "domContentLoadedEventEnd"   : 1343077372673
            "domContentLoadedEventStart" : 1343077372628
            "domInteractive"             : 1343077372584
            "domLoading"                 : 1343077372373
            "responseEnd"                : 1343077372361
            "responseStart"              : 1343077372360
            "requestStart"               : 1343077371869
            "secureConnectionStart"      : 1343077371551
            "connectEnd"                 : 1343077371869
            "connectStart"               : 1343077371060
            "domainLookupEnd"            : 1343077371055
            "domainLookupStart"          : 1343077371055
            "fetchStart"                 : 1343077371055
            "redirectEnd"                : 0
            "redirectStart"              : 0
            "unloadEventEnd"             : 0
            "unloadEventStart"           : 0
            "navigationStart"            : 1343077371053
          "navigation":
            "redirectCount" : 0
            "type"          : 0
      )
      .expect(204, done)
