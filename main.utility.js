/**
 * Created by hao on 16-11-7.
 */
var controlFuncs = (function(){
    function HttpRequestForTemplate(target, templatePath) {
        var httpRequest = null;
        if(window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
        }
        httpRequest.onreadystatechange = function() {
            if(httpRequest.readyState === XMLHttpRequest.DONE) {
                if(httpRequest.status === 200) {
                    appendHTML(target,httpRequest.responseText);
                } else {
                    console.log("There is a problem with the request.");
                }
            }
        };
        httpRequest.open('GET',templatePath,true);
        httpRequest.send(null);
    }
    function appendHTML(target, strng) {
        var div = document.createElement('div');
        div.innerHTML = strng;
        while (div.children.length > 0) {
            target.appendChild(div.children[0]);
        }
    }

    return {
        HttpRequestForTemplate: HttpRequestForTemplate,
        appendHTML: appendHTML
    }
})();
