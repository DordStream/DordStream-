let url = window.location.href;
let subscriberError = document.getElementById("error567");
let contactError = document.getElementById("error456");
function sendSubscriber(htmlElement) {
    var xhr = new XMLHttpRequest();
    const formData = new FormData(htmlElement);

    try {
        xhr.onreadystatechange = function () {
            subscriberError.innerText = "Processing...... please wait";
                if (this.status == 200 && this.readyState == 4) {

                    var uploadResult = this.responseText;
                    if (uploadResult == "success") {

                        window.location.href = url + "#error567";
                        subscriberError.innerText = "thanks for subscribing to our newsletter we'll be updating you through the mail provided";
                        subscriberError.value = '';
                       
                    }
                    else {
                       
                        window.location.href = url + "#error567";
                        subscriberError.innerText = uploadResult;
                    }

                }
            }
          
            xhr.open("POST", htmlElement.action);
            xhr.send(formData);
    }
    catch (error) {
    }
}
function contactUs(htmlElement) {
    var xhr = new XMLHttpRequest();
    const formData = new FormData(htmlElement);

    try {
        xhr.onreadystatechange = function () {
            contactError.innerText = "processing...... please wait ";
                if (this.status == 200 && this.readyState == 4) {

                    var uploadResult = this.responseText;
                    if (uploadResult == "success") {
                        window.location.href = url + "#error456";
                        contactError.innerText = "thanks for contacting us we'll get back to you through the mail provided";
                        contactError.value = '';
                       
                    }
                    else {
                        window.location.href = url + "#error456";
                        contactError.innerText = uploadResult;
                    }

                }
            }
          
            xhr.open("POST", htmlElement.action);
            xhr.send(formData);
    }
    catch (error) {
    }
}