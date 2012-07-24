valid_timings =
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

clone = (obj) ->
  if not obj? or typeof obj isnt 'object'
    return obj
  newInstance = {}
  for key of obj
    newInstance[key] = clone obj[key]
  newInstance

module.exports =
  valid: ->
    clone valid_timings
  invalid: ->
    invalid_timings = clone valid_timings
    invalid_timings.timing.navigationStart = valid_timings.timing.responseEnd
    invalid_timings

