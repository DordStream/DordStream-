let connection = new signalR.HubConnectionBuilder().withUrl("/pagehub").build();
let pageIds = [];
let content = document.getElementById("content");
let title = document.getElementById("title");
let id = document.getElementById("id");
let pageNameSearch = document.getElementById("pageNameSearch");
let pageService = {
    //Html Container For Main Post
    htmlContainer: function (pages) {
        $("#main").html('');
        if (pages.length > 0) {
            $.each(pages, function (index, page) {


                let container = "<div class='media shadow-sm mt-3 align-content-center pt-3 postBody'>" +
                    "<div class='d-block'>" +
                    "<div class='main-check'>" +
                    "<input type='checkbox' class='custom-checkbox post-checkbox' />" +
                    " </div>" +
                    "<div class='main-img'>" +
                    "<p>" + page.titleFirstLetter + "</p>" +
                    " </div>" +
                    "</div>" +
                    "<div class='media-body'>" +
                    "<div class='main-body'>" +
                    "<a href='" + encodeURI("/admin/updatepage/" + encodeURIComponent(page.titleLink) + "/" + page.pageId) + "' class='title-link'>" +
                    "<p class='main-title' style='font-size:20px'>" + page.pageName + "</p>" +
                    " </a>" +
                    "<div class='media main-btn justify-content-between'>" +
                    "<div class='media-body'>" +
                    "<i class='text-muted'>" + page.type + "</i>" +
                    "<i class='ml-3 text-muted'>" + page.formattedDate + "</i>" +
                    "</div>" +
                    "<div class='media justify-content-between'>" +
                    "<div class='dropdown share-dropdown'>" +
                    "<i class='fa fa-share mr-3' data-toggle='dropdown'></i>" +
                    "<ul class='dropdown-menu'>" +
                    "<li class='dropdown-item'>" +
                    "<a href='#' class='dropdown-item-text media'>" +
                    "<i class='fa fa-facebook-f mr-2'></i>" +
                    "<p>Facebook</p>" +
                    "</a>" +
                    "</li>" +
                    "<li class='dropdown-item'>" +
                    "<a href='#' class='dropdown-item-text media'>" +
                    "<i class='fa fa-google-plus-g mr-2'></i>" +
                    "<p>Google PLus</p>" +
                    "</a>" +
                    "</li>" +
                    "<li class='dropdown-item'>" +
                    "<a href='#' class='dropdown-item-text media'>" +
                    "<i class='fa fa-twitter-square mr-2'></i>" +
                    "<p>Twitter</p>" +
                    "</a>" +
                    "</li>" +
                    "</ul>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='main-drop ml-auto'>" +
                    "<div class='dropdown'>" +
                    "<i class='fa fa-grip-vertical main-drop-icon' data-toggle='dropdown'></i>" +
                    "<ul class='dropdown-menu'>" +
                    "<li class='dropdown-item'>" +
                    "<a href='#' class='dropdown-item-text media align-items-baseline'" + "onclick='deletePage(" + "\"" + page.pageId + "\"" + ")'" + ">" +
                    " <i class='fa fa-trash text-success'></i>" +
                    "<p class='ml-2'>Delete</p>" +
                    "</a>" +
                    " </li>" +
                    "<li class='dropdown-item'>" +
                    " <a href='#' class='dropdown-item-text media align-items-baseline'" + "onclick='unpublishPage(" + "\"" + page.pageId + "\"" + ")'" + ">" +
                    " <i class='fa fa-trash-restore text-success'></i>" +
                    "<p class='ml-2'>Unpublish</p>" +
                    "</a>" +
                    "</li>" +
                    "<li class='dropdown-item'>" +
                    " </li>" +
                    "</ul>" +
                    "</div>" +
                    "</div>" +
                    "<input type='hidden' class='pageId' value=" + page.pageId + " " + "/>" +
                    "</div>" +
                    "<div class='clearfix'></div>";
                $("#main").append(container);

            });
        }
        else {
            $("#main").html("<p class='text-center mt-5'> No Pages </h3>");
        }
    },
    publish: function () {
        connection.invoke("Publish", title.value, content.value);
    },
    //Save Page From Server
    save: function () {
        connection.invoke("Save", title.value, content.value);
    },
    //Update publish Page
    updatePublish: function () {
        connection.invoke("UpdatePublish", id.value, title.value, content.value);
    },
    // Update Save Post From Server
    updateSave: function () {
        connection.invoke("UpdateSave", id.value, title.value, content.value);
    },
    // Get Published Page From Server
    getPublishPages: function () {
        connection.invoke("GetPublishPages");
    },
    // Get Draft Page From Server
    getDraftPages: function () {
        connection.invoke("GetDraftPages");
    },
    //Get All Pages From Server
    getAllPages: function () {
        connection.invoke("GetAllPages");
    },
   //Get Page By Name
    getPagesByName: function (pageName) {

        connection.invoke("GetPagesByName", pageName);
    },
    // Delete All Page From Server
    deleteAll: function () {
        if (pageIds.length > 0) {
            connection.invoke("DeleteAll", pageIds);
        }
        else {
            alert("No Page Selected");
            $(".spinner").css("display", "none");
        }
    },
    // Unpublish Selected Page From Server
    unpublishAll: function () {
        if (pageIds.length > 0) {
            connection.invoke("UnpublishPages", pageIds);
        }
        else {
        alert("No Page Selected");
            $(".spinner").css("display", "none");
    }
    },
    //Delete Page From Server

    deletePage: function (pageId) {
        if (pageId != '') {
            connection.invoke("Delete", pageId);
        }
        else {
            alert("No Page Selected");
            $(".spinner").css("display", "none");
        }
    },
    //Unpublish Single Page
    unpublish: function (pageId) {
        if (pageId != '') {
            connection.invoke("UnpublishPage", pageId);
        }
        else {
            alert("No Page Selected");
            $(".spinner").css("display", "none");
        }
    },
};

//Delet Page By Specified PostId
function deletePage(pageId) {
    if (pageId != '') {
        $(".spinner").css("display", "block");
        pageService.deletePage(pageId);
    }
        else {
    alert("No Page Selected");
    $(".spinner").css("display", "none");
}
}
//Unpublish Page by Specified PostId
function unpublishPage(pageId) {
    if (pageId != '') {
        $(".spinner").css("display", "block");
        pageService.unpublish(pageId);
    }
    else {
        alert("No Page Selected");
        $(".spinner").css("display", "none");
    }
}
// Get Result From Client 
connection.on("result", function (isDone,error) {
    $(".spinner").css("display", "none");
    if (isDone == true) {

        window.location.href = "/admin/pages";

    }
    else {
        window.alert(error);
    }
});
// Get All Posts From Client
connection.on("pages", function (pages, totalDraft, totalPublish, totalPage,error) {
    $(".spinner").css("display", "none");
    if (error == "") {
        $("#total").text("All  " + "(" + totalPage + ")");
        $("#totalpublish").text("Publish  " + "(" + totalPublish + ")")
        $("#totaldraft").text("Draft  " + "(" + totalDraft + ")");
        pageService.htmlContainer(pages);
        $(".allcheck").checked = false;
       
    }
    else {
        alert(error);
    }
    pageIds.splice(0, pageIds.length);
});
connection.on("pageResult", function (isDeleted, pages, totalDraft, totalPublish, totalPage,error) {
    $(".spinner").css("display", "none");
    var selectedItem = document.getElementById("selectedItem");
    selectedItem.style.display = "none";
    var checkbox = document.getElementById("allcheck");
    checkbox.checked = false;
    if (isDeleted) {
     
       
        $("#total").text("All  " + "(" + totalPage + ")");
        $("#totalpublish").text("Publish  " + "(" + totalPublish + ")")
        $("#totaldraft").text("Draft  " + "(" + totalDraft + ")");
        pageService.htmlContainer(pages);

        $("#labelContainer").modal("hide");
        $("#singleLabelContainer").modal("hide");

    }
    else {
        alert(error);
    }

    pageIds.splice(0, pageIds.length);
});
connection.start().then(function () {
    try {
        if ($("#pages").val() == "pages") {
            $(".spinner").css("display", "block");
            pageService.getAllPages();
        }
        //Publish Button
        $("#publishBtn").on("click", function () {
            $(".spinner").css("display", "block");
            pageService.publish();
        });
        //Save Buttton
        $("#saveBtn").on("click", function () {
            $(".spinner").css("display", "block");
            pageService.save();
        });
        $("#publishUpdateBtn").on("click", function () {
            $(".spinner").css("display", "block");
            pageService.updatePublish();
        });
        $("#saveUpdateBtn").on("click", function () {
            $(".spinner").css("display", "block");
            pageService.updateSave();
        });
        //Back Arrow
        $("#backarrow").on("click", function () {

            window.location.href = window.location.href = "/admin/pages";

        });

        //Select Page Type DropDown
        $("#selectposttype").on("change", function () {
            $(".spinner").css("display", "block");
            if ($(this).val() == "all") {

                pageService.getAllPages();
                $(this).val("all");
            }
            else if ($(this).val() == "publish") {

                pageService.getPublishPages();
                $(this).val("publish");
            }
            else {

                pageService.getDraftPages();
                $(this).val("draft");
            }
        });
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
                        let pageId = htmlElement.querySelector(".pageId").value;
                        let pageIndex = pageIds.indexOf(pageId);
                        if (postCheckbox.checked) {
                            if (pageIndex == -1) {
                                pageIds.push(pageId);
                            }
                            $("#selected").text(pageIds.length + " " + "Selected");
                        }
                        else {
                            if (pageIndex !== -1) {
                                pageIds.splice(pageIndex, 1);
                            }
                            $("#selected").text(pageIds.length + " " + "Selected");
                        }
                    });


                });
                $("#selected").text(pageIds.length + " " + "Selected");

            }
            else {

                selectedItem.style.display = "none";
                $(".postBody").each(function (index, htmlElement) {

                    var postCheckbox = htmlElement.querySelector(".post-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "none";
                });


                pageIds.splice(0, pageIds.length);
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
            pageIds.splice(0, pageIds.length);
        });
        $("#delete_all").on("click", function () {
            $(".spinner").css("display", "block");
            pageService.deleteAll();
        });
        $("#unpublish_all").on("click", function () {
            pageService.unpublishAll();
        });
        $("#pageNameSearch").on("keypress", function () {
            if (pageNameSearch.value != '') {
                pageService.getPagesByName(pageNameSearch.value);
            }
        });
        $("#pageNameSearch").on("keydown", function (e) {
            var keyCode = e.keyCode || e.charCode;
            if (keyCode == 8 || keyCode == 46) {
                if (pageNameSearch.value != '') {
                    pageService.getPagesByName(pageNameSearch.value);
                }
                else {
                    pageService.getAllPages();
                }

            }
        });
    }
    catch (error) {
        alert(error);
    }
}).catch(function (error) {
    alert(error);
});