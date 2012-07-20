(function(){
	if(typeof window.performance === 'undefined') return;
	if(typeof document.addEventListener === 'undefined') return;

	var sendPerformanceData = function(){
		var xhr = new XMLHttpRequest();
		//@TODO find a way to make this domain dynamic
		xhr.open('POST', 'http://performance.com', true);
		xhr.send(window.performance);
	}

	document.addEventListener('load', sendPerformanceData);
}).call();
