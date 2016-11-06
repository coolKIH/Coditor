(function() {
    function supportsImports() {
        return 'import' in document.createElement('link');
    }
    var content = document.querySelector('link[rel="import"]').import;
    var divs = content.querySelectorAll("div");
    divs.forEach(function(div){
        document.body.appendChild(div.cloneNode(true));
    })
})();