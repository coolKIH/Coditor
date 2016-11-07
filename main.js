(function() {
    var visualCodeWrapper = document.body.querySelector("div#visualCodeWrapper");

    if('import' in document.createElement('link')) {
        var content = document.querySelector('link[rel="import"]').import;
        var divs = content.querySelectorAll("div");
        divs.forEach(function(div){
            visualCodeWrapper.appendChild(div.cloneNode(true));
        })
    } else {
        console.log("link import not supported");
        HttpRequestForTemplate(visualCodeWrapper,"visual-code/visual.code.html");
    }

})();