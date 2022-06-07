
let connection = new signalR.HubConnectionBuilder().withUrl("/themeshub").build();
var error = document.getElementById("Themerror");
let file = document.getElementById("File");
let templateType = document.getElementById("templateType");
let themeType = document.getElementById("themeType");
let templateContent = document.getElementById("content");
let themeName = document.getElementById("themeName");
let templateError = document.getElementById("templateError");
let themeService = {

    themeTemplate: function (themes) {
        $("#themeContainer").html('');
        if (themes.length > 0) {
            $.each(themes, function (index, value) {

                let themeHtml = "<div class='col-sm-3 mb-3'>" +
                    "<div class='card border' style='height: 350px'>" +
                    "<div class='card-header p-0 bg-transparent'>" +
                    "<img src=" + value.image + " class='card-img-top' style='width: 100%; height: 150px' />" +
                    "<div class='card-img-overlay h-25 text-left mt-0'>" +
                    "<h1 class='badge text-light bg-danger'>" + value.name + "</h1>" +
                    "</div>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<i class='card-text mt-2 text-dark small ml-1'>" + value.description + "</i>" +
                    "</div>" +
                    "<div class='card-footer p-0 bg-transparent'>" +
                    "<div class='d-block'>" +
                    "<button type='button' class='btn btn-outline-danger w-100'  onclick='applyTheme(" + "\"" + value.name + "\"" + ")'" + " > Apply</button> " +
                    "<a href='" + encodeURI("/admin/viewtheme/" + encodeURIComponent(value.name)) + "' class='btn btn-outline-danger w-100 mt-2'>Edit</a>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +

                    "</div>";
                $("#themeContainer").append(themeHtml);




            });
        }
        else {
            $("#themeContainer").html("<p class='text-center mt-5 ml-5'> No Template </h3>");
        }
    },
    updateTemplate: function () {
        
        connection.invoke("UpdateTemplate", templateType.value, templateContent.value);
    },
    updateTheme: function () {
        connection.invoke("UpdateTheme", themeType.value, themeName.value, templateContent.value);
    },
    getThemes: function () {
        connection.invoke("GetThemes");
    },
    getTemplate: function () {
        connection.invoke("GetTemplate", templateType.value);
    },
    getTheme: function () {
        connection.invoke("GetTheme", themeName.value, themeType.value);
    }

};
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
    var xhr = xhttpRequest();
    const formData = new FormData(htmlElement);
    $(".spinner").css("display", "block");
    try {
        if (xhr != null) {
            htmlElement.newThemeSubmit.disabled = true;
            htmlElement.newThemeSubmit.value = "Uploading..";
            xhr.onreadystatechange = function () {
                error.innerText = "please wait while your file is uploading.....";
                if (this.status == 200 && this.readyState == 4) {
                    var uploadResult = this.responseText;
                    if (uploadResult == "success") {
                        $("#progress").css("display", "none");
                        $("#progressbar").html("0%").css("width", "0%").attr("aria-valuenow", "0");
                        error.innerText = "themes uploaded successfully";
                        $("#File").val('');

                    }
                    else {
                        $("#progressbar").html("0%").css("width", "0%").attr("aria-valuenow", "0");
                        error.innerText = uploadResult;
                    }

                    htmlElement.newThemeSubmit.disabled = false;
                    htmlElement.newThemeSubmit.value = "Upload";
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
    }
    catch (error) {
        window.alert(error);
    }
}
function applyTheme(_themeName) {
    connection.invoke("Apply", _themeName);
}
connection.on("applied", function (isApplied) {
    $(".spinner").css("display", "none");
    if (isApplied) {
      
        window.alert("Themes Applied");
    } else {
        window.alert("error occur while applying the theme. try again");
    }
});
connection.on("theme", function (template) {
    $(".spinner").css("display", "none");
    templateContent.value = template.contents;
})
connection.on("themes", function (themes) {

    $(".spinner").css("display", "none");
    themeService.themeTemplate(themes);
});
connection.on("update", function (isSaved) {
    $(".spinner").css("display", "none");
    if (isSaved) {
        templateError.innerText = "template content update  successfully";
      
    }
    else {
        templateError.innerText = "error occur please retry";
 
    }
});
connection.start().then(function () {
    try {

        if ($("#maintheme").val() == "theme") {
            $(".spinner").css("display", "block");
            themeService.getThemes();
        }
       

        $("#File").on("change", function () {

            if (file.files[0].size > 2147483647) {
                error.innerText = "file too big. the maximum size of a file to be uploaded is 2GB";
                file.value = "";
            }
        });
        $("#savetheme").on("click", function () {
            $(".spinner").css("display", "block");
            themeService.updateTheme();
        });
        $("#savetemplate").on("click", function () {
            $(".spinner").css("display", "block");
            themeService.updateTemplate();

        });
        $("#cancel").on("click", function () {
            window.location.href = "/admin/themes";
        });
        $("#templateType").on("change", function () {
            $(".spinner").css("display", "block");
            themeService.getTemplate();
        });
        $("#themeType").on("change", function () {
            $(".spinner").css("display", "block");
            themeService.getTheme();
        });
    }
    catch (error) {
        alert(error);
    }
 
}).catch(function (error) {
    window.alert(error);
});