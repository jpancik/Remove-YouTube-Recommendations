//console.log("Remove YouTube Recommendations - Hello there.");

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function pluginRemoveRecommendedVideosRun() {
    //console.log("Remove YouTube Recommendations - removing garbage.");
	
	var relatedEl = document.getElementById("related");
	
	if (relatedEl != null) {
		Array.prototype.forEach.call(relatedEl.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0].querySelector("#items").children, function(el, i) {
			if(el.tagName === "YTD-COMPACT-VIDEO-RENDERER") {
				var elSpan = el.querySelector("#metadata-line span");
				if(elSpan != null) {
					if(!(/^.*[0-9].*$/.test(elSpan.innerText))) {
					   console.log("Remove YouTube Recommendations - Removing recommendation.")
					   el.parentNode.removeChild(el);
					}
	        	}
			}
		});
	}
}

function pluginRemoveRecommendedVideosBindToLoadMore() {
    var target = document.getElementById("continuations");
	if (target) {
		var observer = new MutationObserver(function(mutations) {
        	pluginRemoveRecommendedVideosRun();
       	 //observer.disconnect();
    	});
    	var config = { childList: true };
    	observer.observe(target, config);
	}
}

function pluginRemoveRecommendedVideosPageLoad() {
	setTimeout(function() {
		pluginRemoveRecommendedVideosRun();
	}, 1000);
	
	setTimeout(function() {
		pluginRemoveRecommendedVideosRun();
	}, 3000);
	
	setTimeout(function() {
		pluginRemoveRecommendedVideosBindToLoadMore();
	}, 2000);
}

function pluginRemoveRecommendedVideosCheckHref(checkedHref) {	
	if(window.location.href !== checkedHref) {
		pluginRemoveRecommendedVideosPageLoad();	
	}
	
	(function (href) {
		setTimeout(function() {
			pluginRemoveRecommendedVideosCheckHref(href);
		}, 500);
	})(window.location.href);
}

ready(function() {
    //console.log("Remove YouTube Recommendations - ready!");
	pluginRemoveRecommendedVideosPageLoad();
	
	(function (href) {
		setTimeout(function() {
			pluginRemoveRecommendedVideosCheckHref(href);
		}, 500);
	})(window.location.href);
});
