let HttpRequest = function () {

    HttpRequest.prototype.send = function (formData, method, url, callback, progresscallback) {
        sendFormRequest(formData, method, url, callback, progresscallback);
    }
}






function xhttpRequest() {
    xhr = null;
    try {
        xhr = new XMLHttpRequest();
    }
    catch (e) {

        try {
            //Internet Explorer Browser
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {

            try {

                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your Browser does not has XMLHTTPREQUEST Installed");
            }
        }
    }
    return xhr;
}
function sendFormRequest(formData, method, url, callback, progresscallback) {
    var xhr = xhttpRequest();
    try {
        if (xhr != null) {
            xhr.onreadystatechange = function () {
                if (this.status == 200 && this.readyState == 4) {

                    let result = JSON.parse(this.response);
                    callback(result);
                }
            }
            if (progresscallback != null || progresscallback != undefined) {
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var complete = Math.round((e.loaded) / (e.total) * 100);
                        progresscallback(complete);
                    }
                });
            }
            xhr.open(method, url);
            xhr.send(formData);
        }
    }
    catch (error) {
        $("#favicoError").text(error);
    }
}