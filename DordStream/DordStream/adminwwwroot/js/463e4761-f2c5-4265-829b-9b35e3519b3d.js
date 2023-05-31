let connection = new signalR.HubConnectionBuilder().withUrl("/accounthub").build();
let userIds = [];
let fullname = document.getElementById("fullname");
let date = document.getElementById("date");
let userName = document.getElementById("username");
let email = document.getElementById("email");
let role = document.getElementById("role");
let verify = document.getElementById("verify");
let phoneNumber = document.getElementById("phonenumber");
let usernameSearch = document.getElementById("userSearch");
let deleteUserName = "";
let deleteUserId = "";
let accountService = {
    //Html Container For Main Post
    htmlContainer: function (users) {
        $("#main").html('');
        if (users.length > 0) {
            $.each(users, function (index, user) {


                let container = "<div class='media shadow-sm mt-3 align-content-center pt-3 postBody'>"+
                   "<div class='d-block'>"+
                "<div class='main-check'>"+
                    "<input type='checkbox' class='custom-checkbox post-checkbox' />"+
               " </div>"+
                    "<div class='main-img'>" +
                    "<p>" + user.firstLetter +"</p>"+
                "</div>"+
            "</div>"+
           " <div class='media-body'>"+
                    "<div class='main-body'>" +
                    " <a href='#'' data-toggle='modal' data-target='#userContainer' class='title-link' data-userid=" + user.id +">" +
                    "<h5 class='text-dark'>" + user.userName + "</h5>" +
                    "</a>" +
                    "<span class='text-muted mb-2' style='font-size: 12px;'>" + user.role +"</span>"+
                    "<div class='media main-btn justify-content-between mt-2''>"+
                    " <div class='media-body'>" +
                    "<i class='text-muted'>" + user.formatedDate   + "</i>" +
                    "</div>" +
                "</div>"+
                  "</div>"+
              "</div>"+
           " <div class='main-drop ml-auto'>"+
                "<div class='dropdown'>"+
                   " <i class='fa fa-grip-vertical main-drop-icon' data-toggle='dropdown'></i>"+
                   "<ul class='dropdown-menu'>"+
                        "<li class='dropdown-item'>"+
                    "<a href='#' class='dropdown-item-text media detelePost align-items-baseline' data-toggle='modal' data-target='#deleteUserModal' data-userid=" + user.id + "  data-username=" + user.userName + ">" +
                                "<i class='fa fa-trash text-success'></i>"+
                                "<p class='ml-2'>Delete</p>"+
                           " </a>"+
                        "</li>"+
                    "</ul>" +
                "</div>"+
                    "</div>" +
                    "<input type='hidden' class='userId' value=" + user.id +" " + "/>"
                       "</div>"+
                     "<div class='clearfix'></div>";
                $("#main").append(container);

            });
        }
        else {
            $("#main").html("<p class='text-center mt-5'> No Users </h3>");
        }
    },
    getUsers: function () {
        connection.invoke("GetUsers").catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    getUser: function (_userId) {
        connection.invoke("GetUser", _userId).catch((error) => {
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
    removerUsers: function () {
        connection.invoke("Removes", userIds).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    searchUser: function (_username) {
        connection.invoke("SearchUser", _username).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    }

};
connection.on("GetUsers", function (userIdentities,userCount,error) {
    $(".spinner").css("display", "none");
    if (error == "") {
        $("#total").text("All  " + "(" + userCount + ")");
        $("#deleteUserModal").modal('hide');
        accountService.htmlContainer(userIdentities);
        var selectedItem = document.getElementById("selectedItem");
        selectedItem.style.display = "none";
        var checkbox = document.getElementById("allcheck");
        checkbox.checked = false;
       
       
        userIds.length = 0;
    }
    else {
        alert(error);
    }
});
connection.on("GetUser", function (userIdentity,error) {
    $(".spinner").css("display", "none");
    if (error == "") {

        fullname.value = userIdentity.names;
        userName.value = userIdentity.userName;
        role.value = userIdentity.role;
        email.value = userIdentity.email;
        date.value = userIdentity.registeredDate;
        phoneNumber.value = userIdentity.phoneNumber;
        verify.value = userIdentity.emailConfirmed == true ? "Verified" : "Not Verified";
        var selectedItem = document.getElementById("selectedItem");
        selectedItem.style.display = "none";
        var checkbox = document.getElementById("allcheck");
        checkbox.checked = false;
      
        userIds.length = 0;
    }
    else {
        alert(error);
    }
});
connection.on("result", function (isDone, _error) {
    $(".spinner").css("display", "none");
    if (isDone) {
        accountService.getUsers();
    }
    else {
        alert(_error);
    }
});
connection.start().then(function () {
    try {
        $(".spinner").css("display", "block");
        accountService.getUsers();
        $("#allcheck").on("click", function () {

            var selectedItem = document.getElementById("selectedItem");
            var checkbox = document.getElementById("allcheck");

            if (checkbox.checked) {
                selectedItem.style.display = "block";

                $(".postBody").each(function (index, htmlElement) {
                    var postCheckbox = htmlElement.querySelector(".post-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "block";


                    postCheckbox.addEventListener("click", function () {

                        let userId = htmlElement.querySelector(".userId").value;
                        let userIndex = userIds.indexOf(userId);
                        if (postCheckbox.checked) {
                            if (userIndex == -1) {

                                userIds.push(userId);
                            }
                            $("#selected").text(userIds.length + " " + "Selected");
                        }
                        else {
                            if (userIndex !== -1) {
                                userIds.splice(userIndex, 1);
                            }

                            $("#selected").text(userIds.length + " " + "Selected");
                        }
                    });

                  


                });
                $("#selected").text(userIds.length + " " + "Selected");

            }
            else {

                selectedItem.style.display = "none";
                $(".postBody").each(function (index, htmlElement) {

                    var postCheckbox = htmlElement.querySelector(".post-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "none";
                });


                userIds.length = 0;
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
            userIds.length = 0;
        });
        $("#delete_all").on("click", function () {
            $(".spinner").css("display", "block");
            accountService.removerUsers();
        });

        $("#deleteUserModal").on("show.bs.modal", function (e) {
            var button = $(e.relatedTarget);
            deleteUserId = button.data("userid");
            deleteUserName = button.data("username").replace("_", " ");
            $("#deleteUsetext").text("Are you sure to delete " + deleteUserName + " " + "from your account" + "\n" + "Once your delete " + deleteUserName + " " + "wont have the access to the website");
        });
        $("#userContainer").on("show.bs.modal", function (e) {
            var button = $(e.relatedTarget);
            let getUserId = button.data("userid");
            $(".spinner").css("display", "block");
            accountService.getUser(getUserId);
        });
        $("#deleteUserYes").on("click", function () {
            $(".spinner").css("display", "block");
            accountService.removerUser();
        });
        $("#userSearch").on("keypress", function (e) {
            if (usernameSearch.value != '') {
                accountService.searchUser(usernameSearch.value);
            }
        });
        $("#userSearch").on("keydown", function (e) {
            var key = e.keyCode || e.charCode;
            if (key == 8 || key == 46) {
                if (usernameSearch.value == '') {
                    accountService.getUsers();
                }
                else {
                    
                    accountService.searchUser(usernameSearch.value);
                }
            }
        });
    }
    catch (error) {
        window.alert(error);
    }
}).catch(function (error) {
    window.alert(error);
});