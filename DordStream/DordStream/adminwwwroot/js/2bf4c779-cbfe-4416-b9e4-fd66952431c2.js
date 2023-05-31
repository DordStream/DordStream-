let connection = new signalR.HubConnectionBuilder().withUrl("/settinghub").build();
let userName = document.getElementById("username");
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("useremail");
let role = document.getElementById("role");
let password = document.getElementById("userpassword");
let error = document.getElementById("Error");
let title = document.getElementById("Title");
let keywords = document.getElementById("Keywords");
let description = document.getElementById("Description");
let maxCount = document.getElementById("MaxCount");
let deleteUserName = "";
let deleteUserId = "";
let enableFreeMail = document.getElementById("enableFreeMail");
let enablecachecheckbox = document.getElementById("enablecache");
let allowanonymouscheckbox = document.getElementById("allowanonymous");
let isSmtpSSL = document.getElementById("SmtpSetup_IsSSL");
let isImapSSL = document.getElementById("ImapSetup_IsSSL");
let hostedsetup = document.getElementById("hostedsetup");
let smtpSetup_UserName = document.getElementById("SmtpSetup_UserName");
let smtpSetup_Password = document.getElementById("SmtpSetup_Password");
let smtpSetup_Host = document.getElementById("SmtpSetup_Host");
let smtpSetup_Port = document.getElementById("SmtpSetup_Port");
let imapSetup_Port = document.getElementById("ImapSetup_Port");
let imapSetup_Host = document.getElementById("ImapSetup_Host");
let connectionString = document.getElementById("connectionString");
let settingService = {
     
    addTitle: function () {
       
        connection.invoke("AddTitle", title.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
        
    },
    addKeyword: function () {
        connection.invoke("AddKeyword", keywords.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    adddescription: function () {
        connection.invoke("AddDescription", description.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    addMaxpost: function () {
        connection.invoke("AddMaxPost", maxCount.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    enableCache: function () {

        connection.invoke("EnableCache", enablecachecheckbox.checked).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    allowAnonymous: function () {

        connection.invoke("AllowAnonymous", allowanonymouscheckbox.checked).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    enableFreeMail: function () {
        connection.invoke("EnableFreeMail", enableFreeMail.checked).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    usernameAdded: function () {
        let usernameValue = smtpSetup_UserName.value;
        if (enableFreeMail.checked) {
            if (usernameValue.includes("@outlook.com")) {

                connection.invoke("AddUsername", usernameValue).catch((error) => {
                    alert(error);
                    $(".spinner").css("display", "none");

                });
                $("#usernameError").text('');
            }
            else {
                $("#usernameError").text("Free Mail setup only support outlook account. register your account through www.outlook.com");
                $(".spinner").css("display", "none");
            }
        }
        else {
            connection.invoke("AddUsername", usernameValue).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
        }
       
    },
    passwordAdded: function () {
        connection.invoke("AddPassword", smtpSetup_Password.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    smtpHostAdded: function () {
        connection.invoke("AddSmtpHost", smtpSetup_Host.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    smtpPortAdded: function () {
        connection.invoke("AddSmtpPort", smtpSetup_Port.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    imapPortAdded: function () {
        connection.invoke("AddImapPort", imapSetup_Port.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    imapHostAdded: function () {
        connection.invoke("AddImapHost", imapSetup_Host.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    registerUser: function () {
        connection.invoke("Register", email.value, firstName.value, lastName.value, userName.value, password.value, role.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    getUser: function () {
        connection.invoke("Get").catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    removerUser: function () {
        connection.invoke("Remove", deleteUserId).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    customPageRole: function () {
        connection.invoke("CustomPageRole", customPageRole.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    dordPageRole: function () {
        connection.invoke("DordPageRole", dordPageRole.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    addConnectionString: function () {
        connection.invoke("AddConnectionString", connectionString.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
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
function uploadFavicon(htmlElement) {
    var xhr = xhttpRequest();
    const formData = new FormData(htmlElement);
    try {
        if (xhr != null) {
            htmlElement.uploadSubmit.disabled = true;
            htmlElement.uploadSubmit.value = "Uploading..";

            xhr.onreadystatechange = function () {
                if (this.status == 200 && this.readyState == 4) {
                 
                    if (this.response) {
                        $("#favicoError").text("upload successfully");
                        $("#progress").css("display", "none");
                        $("#progressbar").html("0%").css("width", "0%").attr("aria-valuenow", "0");
                        $("#File").val('');
                       
                    }
                    else {
                        $("#favicoError").text("error occur while uploading the favicon please re-try");
                    }
                    htmlElement.uploadSubmit.disabled = false;
                    htmlElement.uploadSubmit.value = "Upload..";
                }
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
        $("#favicoError").text(error);
    }
}







function installModules(htmlElement) {
    var xhr = xhttpRequest();
    const formData = new FormData(htmlElement);
    try {
        if (xhr != null) {
            $("#versionError").text("please wait while installing the module....");
            htmlElement.installSubmit.disabled = true;
            htmlElement.installSubmit.value = "Installing..";
            xhr.onreadystatechange = function () {
               
                if (this.status == 200 && this.readyState == 4) {
                    
                        $("#Vprogress").css("display", "none");
                        $("#Vprogressbar").html("0%").css("width", "0%").attr("aria-valuenow", "0");
                        $("#VFile").val('');
                   
                      $("#versionError").text(this.responseText);
                   
                }
                htmlElement.installSubmit.disabled = false;
                htmlElement.installSubmit.value = "Install";
            }
            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    var complete = Math.round((e.loaded) / (e.total) * 100);
                    $("#Vprogress").css("display", "block");
                    $("#Vprogressbar").html(complete + "%").css("width", complete + "%").attr("aria-valuenow", complete);
                }
            });
            xhr.open("POST", htmlElement.action);
            xhr.send(formData);
        }
    }
    catch (error) {
        $("versionError").text(error);
    }
}









connection.on("titleAdded", function (isDone) {
    $(".spinner").css("display", "none");
    if (isDone) {
        $("#titleText").text($("#Title").val());
        $("#sitetitle").text($("#Title").val());
        $("title").text("Settings -" + $("#Title").val());
        $("#titleModal").modal("hide");
    }
    else {
        window.alert("Error occur while Adding the title: " + error);
    }
    
});

connection.on("keywordAdded", function (isDone) {
    $(".spinner").css("display", "none");
    if (isDone) {
        $("#keywordText").text($("#Keywords").val());
        $("#keywordModal").modal("hide");
    }
    else {
        window.alert("Error occur while Adding the keyword");
    }
   
});
connection.on("descriptionAdded", function (isDone) {
    $(".spinner").css("display", "none");
    if (isDone) {
        $("#descriptionText").text($("#Description").val());
        $("#descriptionModal").modal("hide");
    }
    else {
        window.alert("Error occur while Adding the Description");
    }
   
});
connection.on("maxPostAdded", function (isDone) {
    $(".spinner").css("display", "none");
    if (isDone) {
       
        $("#maxpostText").text($("#MaxCount").val());
        $("#maxpostModal").modal("hide");
    }
    else {
        window.alert("Error occur while Adding the Max Post");
    }
   
});
connection.on("enabled", function (isEnabled) {
    
    $(".spinner").css("display", "none");
    if (!isEnabled) {
        window.alert("Error occur please try again");
    }
});
connection.on("usernameAdded", function (isDone) {
    $(".spinner").css("display", "none");
        if (isDone) {
            $("#usernameText").text($("#SmtpSetup_UserName").val());
            $("#usernameModal").modal("hide");
        }
        else {
            window.alert("Error occur while Adding the UserName");
        }
    
});
connection.on("passwordAdded", function (isDone) {
    $(".spinner").css("display", "none");
        if (isDone) {
            $("#passwordText").text($("#SmtpSetup_Password").val());
            $("#passwordModal").modal("hide");
        }
        else {
            window.alert("Error occur while Adding the Password");
        }
    
});
connection.on("smtpPortAdded", function (isDone) {
    $(".spinner").css("display", "none");
        if (isDone) {
            $("#smtpPortText").text($("#SmtpSetup_Port").val());
            $("#smtpportModal").modal("hide");
        }
        else {
            window.alert("Error occur while Adding the Smtp Port");
        }
    
}); connection.on("smtpHostAdded", function (isDone) {
    $(".spinner").css("display", "none");
        if (isDone) {
            $("#smtpHostText").text($("#SmtpSetup_Host").val());
            $("#smtphostModal").modal("hide");
        }
        else {
            window.alert("Error occur while Adding the Smtp Host");
        }
    
}); connection.on("imapPortAdded", function (isDone) {
    $(".spinner").css("display", "none");
        if (isDone) {
            $("#imapPortText").text($("#ImapSetup_Port").val());
            $("#imapportModal").modal("hide");
        }
        else {
            window.alert("Error occur while Adding the Imap Port");
        }
    
});
connection.on("imapHostAdded", function (isDone) {
    $(".spinner").css("display", "none");
        if (isDone) {
            $("#imapHostText").text($("#ImapSetup_Host").val());
            $("#imaphostModal").modal("hide");
        }
        else {
            window.alert("Error occur while Adding the Imap Host");
        }
    
});
connection.on("GetUsers", function (userIdentities, firstUserName, userCount,isDone,error) {
    $(".spinner").css("display", "none");
    if (isDone) {
        $("#userValues").text(userIdentities.length == 1 ? firstUserName : firstUserName + " " + "And" + " " + (userCount - 1) + " " + "More");
        $("#showUsers").html('');
        $.each(userIdentities, function (index, value) {
            let verified = value.emailConfirmed == true ? "<small class='text-success'> Verified </small>" : "<small class='text-danger' onclick='ResendConfirmationCode(" + "\"" + value.email + "\"" + "," + "\"" + value.firstName + "\""+ "," + "\"" + value.lastName +"\"" + ")'> Not verified </small>";

            var usersHtml = "<div class='input-group justify-content-around align-items-baseline'>" +
                "<h6>" + value.userName + "</h6>" +
                "<p>" + value.role + "</p>" +
                  verified
                + "<button type='button' data-userid=" + value.id + " data-username=" + value.userName + " data-toggle='modal' data-target='#deleteUserModal'" +
                " class='close'>&times;</button>" +
                " </div>";
            $("#showUsers").append(usersHtml);

        });
    } else { 
        alert(error);
    }
});
connection.on("result", function (isDone, err) {
    $(".spinner").css("display", "none");
   

    if (isDone) {
        $("#addadminandauthor").modal("hide");
        $("#adminandauthor").modal("hide");
        $("#deleteUserModal").modal("hide");
        userName.value='';
        email.value='';
        password.value = '';
        firstName.value = '';
        lastName.value = '';
        
        settingService.getUser();
    }
    else {
        $("#Error").html("<p>"+ err + "</p>");
    }
});
connection.on("ResendCode", function (error) {
    $(".spinner").css("display", "none");
    if (error == '') {
        alert("Email Confirmation Code Has been Sent");
    }
    else {
        alert(error);
    }
});
connection.on("ConnectionStringAdded", function (isDone,error) {
    $(".spinner").css("display", "none");
    if (isDone) {
        $("#connectionError").text("Connection String has successfully added");
        $("#connectionStringModal").modal("hide");
        $("#connectionError").text('');
    }
    else {
        $("#connectionError").text(error);
    }
    connectionString.value = '';
    $(this).attr("disabled", true);
    $(this).val("Uploading...");
   

});
window.onload = function () {
    var password = document.getElementById("userpassword");
    var showPassword = document.getElementById("showPassword");
    showPassword.onclick = function () {
        if (password.type == "text") {
            password.type = "password";
        }
        else {
            password.type = "text";
        }
       
    }
}
function ResendConfirmationCode(email,firstName,lastName) {

    connection.invoke("ResendEmailCode", email, firstName, lastName);
}
connection.start().then(function () {
    try {
        $(".spinner").css("display", "block");
        settingService.getUser();

        if (enableFreeMail.checked) {

            hostedsetup.style.display = "none";
        }
        else {

            $("#setupContainer").html('');
            hostedsetup.style.display = "block";
        }
        $("#SmtpSetup_IsSSL").on("change", function () {
            connection.invoke("IsSmtpSSL", isSmtpSSL.checked);
        });
        $("#ImapSetup_IsSSL").on("change", function () {
            connection.invoke("IsImapSSL", isImapSSL.checked);
        });
        $("#saveTitleBtn").on("click", function () {
           
            $(".spinner").css("display", "block");
            settingService.addTitle();
        });
        $("#saveKeywordBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.addKeyword();
        });
        $("#saveDescriptionBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.adddescription();
        });
        $("#saveMaxPostBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.addMaxpost();
        });
        $("#enablefacebook").on("change", function () {
            $(".spinner").css("display", "block");

            settingService.enablefacebook();
        });
       
        $("#enablecache").on("change", function () {
            settingService.enableCache();
        });
        $("#allowanonymous").on("change", function () {
            settingService.allowAnonymous();
        });
        $("#enableFreeMail").on("change", function () {
            if (enableFreeMail.checked) {

                hostedsetup.style.display = "none";
            }
            else {

                $("#setupContainer").html('');
                hostedsetup.style.display = "block";
            }
            settingService.enableFreeMail();
        });
        $("#saveUsernameBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.usernameAdded();
        });
        $("#savePasswordBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.passwordAdded();
        });
        $("#saveSmtpPort").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.smtpPortAdded();
        });
        $("#saveSmtpHostBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.smtpHostAdded();
        });
        $("#saveImapHostBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.imapHostAdded();
        });
        $("#saveImapPortBtn").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.imapPortAdded();
        });
       
        $("#addUser").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.registerUser();

        });
        $("#deleteUserModal").on("show.bs.modal", function (e) {
            var button = $(e.relatedTarget);
            deleteUserId = button.data("userid");
            deleteUserName = button.data("username").replace("_", " ");
            $("#deleteUsetext").text("Are you sure to delete " + deleteUserName + " " + "from your account" + "\n" + "Once " + deleteUserName + "  was deleted " + "  " + deleteUserName + " won't have the access to the website");
        });
        $("#deleteUserYes").on("click", function () {
            $(".spinner").css("display", "block");
            settingService.removerUser();
        });
        $("#connectionStringBtn").on("click", function (e) {

            $(".spinner").css("display", "block");
            $("#connectionStringBtn").attr("disabled", false);
            $("#connectionStringBtn").val("Upload");
            settingService.addConnectionString();
            e.preventDefault();
        });
       
    }
    catch (error) {
        alert(error);
    }
}).catch(function (error) {
    alert(error);
});