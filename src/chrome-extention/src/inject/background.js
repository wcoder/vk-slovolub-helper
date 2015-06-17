(function(){

	var jqueryPath = chrome.extension.getURL('/js/jquery/jquery.min.js');
	var injectPath = chrome.extension.getURL('/src/inject/inject.js');

	var addScript = function(src){
		var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.src = src;
        document.getElementsByTagName("head")[0].appendChild(script);
	};

	addScript(jqueryPath);
	addScript(injectPath);
})();