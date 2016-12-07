/**
 * Created by hao on 16-12-6.
 */
(function() {
    document.querySelectorAll("div.tinyVisualCode").forEach(function(tinyVisualCode) {
        var myId = tinyVisualCode.id;
            var myDocument = tinyVisualCode.querySelector("iframe").contentWindow.document;
            myDocument.open()
            myDocument.write('' +
                '<html>' +
                '<head>' +
                '<title></title>' +
                '<meta charset="utf-8"/> ' +
                '<style id="myStyle"></style>' +
                '</head>' +
                '<body>' +
                '<script id="myJsCode"></script>' +
                '</body>' +
                '</html>' +
                '');
            var httpRequest = new XMLHttpRequest()
            if(!httpRequest) {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
            }
            httpRequest.onreadystatechange = function() {
                if(httpRequest.readyState == XMLHttpRequest.DONE) {
                    if(httpRequest.status == 200) {
                        var response = httpRequest.response;
                        var codeSet = JSON.parse(response)
                        myDocument.head.querySelector("style#myStyle").innerText = codeSet["cssCode"]
                        myDocument.body.insertAdjacentHTML("afterbegin", codeSet["htmlCode"])
                        //Disabled js
                        // myDocument.body.querySelector("script#myJsCode").innerText = codeSet["jsCode"]
                        myDocument.close()
                    }
                }
            }
            httpRequest.open("POST", "httpResponse/getCode.php", true)
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            httpRequest.send("projId=" + myId)
    })
})()