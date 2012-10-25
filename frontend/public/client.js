(function(){
    // Rauschen
    if(typeof window.performance === "undefined") return;
    if(typeof document.addEventListener === "undefined") return;

    var sendPerformanceData = function(){
        var xhr = new XMLHttpRequest();
        //@TODO find a way to make this domain dynamic
        xhr.open("POST", "http://localhost:3000", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(window.performance));
    };

    if(document.readyState === 'complete'||document.readyState == "loaded"){
        sendPerformanceData();
    } else {
        window.addEventListener("load", sendPerformanceData);
    }
}).call();
