/**
 * Created by hao on 16-11-5.
 */
(function(){
    var button = document.body.querySelector("#mybutton");
    button.addEventListener("click",function(e){
        getData()
    });
    function getData() {
        var httpRequest = null;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpRequest.onreadystatechange = function() {

        };
        httpRequest.open('GET','meta/data.json',true);
        httpRequest.setRequestHeader('Content-Type','application/')
        httpRequest.send(null);
    }
})();