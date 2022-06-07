let connection = new signalR.HubConnectionBuilder().withUrl("/mediahub").build();
let mediaUrls = [];
let mediaUrl = "";
let category = document.getElementById("selectposttype");
let mediaSearchName = document.getElementById("mediaSearchName");
let addMeta = document.getElementById("addMeta");
let file = document.getElementById("Files");
let fileSize = 0;
let mediaService = {
    //Html Container For Main Post
    htmlContainer: function (medias, url) {
        $("#main").html('');
        if (medias.length > 0) {
            $.each(medias, function (index, media) {


                let container = "<div class='media shadow-sm align-content-center pt-2 postBody mt-3'>" +
                    "<div class='d-block'>" +
                    "<div class='main-check'>" +
                    "<input type='checkbox' class='custom-checkbox post-checkbox' />" +
                    " </div>" +
                    "<div class='main-img'>" +
                    "<p>" + media.fileFirstLetterName + "</p>" +
                    " </div>" +
                    "</div>" +
                    "<div class='media-body'>" +
                    "<div class='main-body'>" +
                    "<a href='#' class='title-link mb-2'>" +
                    "<p class='main-title'style='font-size:18px;'>" + media.name + "</p>" +
                    " </a>" +
                    "<span class='text-muted mb-2' style='font-size: 12px;'>" + media.size + "</span>" +
                  
                    "<div class='media main-btn justify-content-between mt-1'>" +
                    "<div class='media-body'>" +
                    "<i class='text-muted'>" + media.metaData + "</i>" +
                    "<i class='ml-3 text-muted'>" + media.formattedDate + "</i>" +
                       
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='main-drop ml-auto'>" +
                    "<i class='fa fa-copy text-success main-drop-icon' style='cursor: pointer'" + "onclick = 'copyUrl(" + "\"" + url + media.fileName + "\"" + ")'" + "Title='Copy'" +"></i>" +
                    "</div>" +
                   
                    "<input type='hidden' class='mediaUrl' value=" + "\""  + url + media.fileName + "\"" + "/>" +
                    "</div>";
                $("#main").append(container);

            });
        }
        else {
            $("#main").html("<p class='text-center mt-5'> No Media Found </h3>");
        }
    },
    getFileByCategory: function (category) {
        connection.invoke("GetFileByCategory", category);
    },
    getFileByName: function (name, category) {
        connection.invoke("GetFileByName", name, category);
    },
    deleteMedia: function (url) {
        connection.invoke("DeleteFile", url);
    },
    deleteMedias: function (urls) {
        connection.invoke("DeleteFiles", urls);
    }


}

//Copy Specified Url To Clipboard 
function copyUrl(url) {
    navigator.clipboard.writeText(url);
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

function upload(htmlElement) {
    const formData = new FormData(htmlElement);
    var xhr = xhttpRequest();
    $(".spinner").css("display", "block");
    try {
        if (fileSize > 2147483647) {

            error.innerText = "file too big. the maximum size of a file to be uploaded is 2GB";
            file.value = "";
        }
        else {
            if (xhr != null) {

                htmlElement.addMediaSubmit.disabled = true;
                htmlElement.addMediaSubmit.value = "Uploading..";
                xhr.onreadystatechange = function () {
                    error.innerText = "please wait while your file is uploading.....";
                    if (this.status == 200 && this.readyState == 4) {

                        var uploadResult = this.responseText;
                        if (uploadResult == "success") {
                            $("#progress").css("display", "none");
                            $("#progressbar").html("0%").css("width", "0%").attr("aria-valuenow", "0");
                            error.innerText = "media uploaded successfully";
                            file.value = "";

                        }
                        else {
                            error.innerText = uploadResult;
                        }
                        htmlElement.addMediaSubmit.disabled = false;
                        htmlElement.addMediaSubmit.value = "Upload";
                    }
                    $(".spinner").css("display", "none");
                }
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var complete = Math.round((e.loaded) / (e.total) * 100);
                        $("#progress").css("display", "block");
                        $("#progressbar").html(complete + "%").css("width", complete + "%").attr("aria-valuenow", complete);
                    }
                });
                xhr.open("POST", htmlElement.action);
                xhr.send(formData);
            }
            $(".spinner").css("display", "none");
        }
        }
    catch (error) {
            $(".spinner").css("display", "none");
            window.alert(error);

        }
    
}


connection.on("files", function (fileModel, url,error) {
    $(".spinner").css("display", "none");
    if (error == "") {
        mediaService.htmlContainer(fileModel, url);
        var selectedItem = document.getElementById("selectedItem");
        selectedItem.style.display = "none";
        var checkbox = document.getElementById("allcheck");
        checkbox.checked = false;
        mediaUrls.length = 0;
    }
    else {
        alert(error);
    }
    
  


});
connection.on("delete", function (isDeleted,error) {
    $(".spinner").css("display", "none");
    var selectedItem = document.getElementById("selectedItem");
   
    var checkbox = document.getElementById("allcheck");
    selectedItem.style.display = "none";
    checkbox.checked = false;
   
    if (isDeleted) {
        mediaService.getFileByCategory(category.value);
      
    }
    else {
        alert(error);
    }
   
    mediaUrls.length = 0;
   
});






connection.start().then(function () {
    try {
        if ($("#media").val() == "media") {
            $(".spinner").css("display", "block");
            mediaService.getFileByCategory(category.value);

        }

        //Select Post Type DropDown
        $("#selectposttype").on("change", function () {
            $(".spinner").css("display", "block");
            if ($(this).val() == "Image") {

                mediaService.getFileByCategory("Image");
                $(this).val("Image");
            }
            else if ($(this).val() == "Audio") {

                mediaService.getFileByCategory("Audio");
                $(this).val("Audio");
            }
            else if ($(this).val() == "Video") {

                mediaService.getFileByCategory("Video");
                $(this).val("Video");
            }
            else {
                mediaService.getFileByCategory("File");
                $(this).val("File");
            }
        });

        $("#allcheck").on("click", function () {

            var selectedItem = document.getElementById("selectedItem");
            var checkbox = document.getElementById("allcheck");

            if (checkbox.checked) {
                selectedItem.style.display = "block";

                $(".postBody").each(function (index, htmlElement) {
                    var postCheckbox = htmlElement.querySelector(".post-checkbox");
                    postCheckbox.checked = true;
                    postCheckbox.style.display = "block";
                    let media = htmlElement.querySelector(".mediaUrl").value;
                    mediaUrls.push(media);
                    postCheckbox.addEventListener("click", function () {

                        if (postCheckbox.checked) {
                            media = htmlElement.querySelector(".mediaUrl").value;
                            mediaUrls.push(media);
                            $("#selected").text(mediaUrls.length + " " + "Selected");
                        }
                        else {
                            postIndex = mediaUrls.indexOf(media);
                            mediaUrls.splice(postIndex, 1);

                            $("#selected").text(mediaUrls.length + " " + "Selected");
                        }
                    });


                });
                $("#selected").text(mediaUrls.length + " " + "Selected");

            }
            else {

                selectedItem.style.display = "none";
                $(".postBody").each(function (index, htmlElement) {

                    var postCheckbox = htmlElement.querySelector(".post-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "none";
                });


                mediaUrls.length = 0;
            }
        });
        $("#selectedItemIClose").on("click", function () {
            var selectedItem = document.getElementById("selectedItem");
            var checkbox = document.getElementById("allcheck");
            checkbox.checked = false;
            selectedItem.style.display = "none";
            $(".postBody").each(function (index, htmlElement) {

                var postCheckbox = htmlElement.querySelector(".post-checkbox");
                postCheckbox.checked = false;

                postCheckbox.style.display = "none";
            });
            mediaUrls.length = 0;
        });
        $("#delete_all").on("click", function () {
            $(".spinner").css("display", "block");
            mediaService.deleteMedias(mediaUrls);
        });
        //Get Media By Post Name
        $("#mediaSearchName").on("keypress", function (e) {
            if (mediaSearchName.value != '') {
                mediaService.getFileByName(mediaSearchName.value, category.value);
            }
        });
        $("#mediaSearchName").on("keydown", function (e) {
            var key = e.keyCode || e.charCode;
            if (key == 8 || key == 46) {
                if (mediaSearchName.value == '') {
                    mediaService.getFileByCategory(category.value);
                }
                else {

                    mediaService.getFileByName(mediaSearchName.value, category.value);
                }
            }
        });
        $("#Files").on("change", function () {

            for (let i = 0; i < file.files.length; i++) {

                fileSize += file.files[i].size;

            }
        });
        $("#File").on("change", function () {

            if (file.files[0].length > file.files[0].length) {
                error.innerText = "file too big. the maximum size of a file to be uploaded is 2GB";
                file.value = "";
            }
           
        });
        $("#addMeta").on("change", function () {
            if (addMeta.checked) {
                $("#meta").css("display", "block");
            }
            else {
                $("#meta").css("display", "none");
            }
        });
    }
    catch (error) {
        alert(error);
    }
   
}).catch(function (err) {
    alert(err);
})