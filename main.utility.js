/**
 * Created by hao on 16-11-7.
 */
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
                var response = httpRequest.responseText;
                target.innerHTML = response;
            } else {
                console.log("There is a problem with the request.");
            }
        }
    };
    httpRequest.open('GET',templatePath,true);
    httpRequest.send(null);
}