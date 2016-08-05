console.log("Remove YouTube Recommendations - Hello there.");

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function pluginRemoveRecommendedVideos() {
    console.log("Remove YouTube Recommendations - removing garbage.");
    Array.prototype.forEach.call(document.querySelectorAll(".video-list-item.related-list-item"), function(el, i){
        var elSpan = el.querySelector("span.stat.view-count");
        if(elSpan != null) {
            //console.log(elSpan.innerText + " " + /^.*[0-9].*$/.test(elSpan.innerText));
            if(!(/^.*[0-9].*$/.test(elSpan.innerText))) {
               el.parentNode.removeChild(el);
            }
        }
    });
}

ready(function() {
    console.log("Remove YouTube Recommendations - ready!");
    
    pluginRemoveRecommendedVideos();

    var target = document.getElementById("watch-more-related");
    var observer = new MutationObserver(function(mutations) {
        pluginRemoveRecommendedVideos();
        //observer.disconnect();
    });
    var config = { childList: true };
    observer.observe(target, config);
});
