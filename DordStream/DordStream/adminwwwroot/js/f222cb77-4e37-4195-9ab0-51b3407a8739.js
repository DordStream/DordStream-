
let connection = new signalR.HubConnectionBuilder().withUrl("/posthub").build();
let postIds = [];
let labelPostId = "";
let content = document.getElementById("content");          
let title = document.getElementById("title");                     
let label = document.getElementById("label");                  
let id = document.getElementById("id");
let postNameSearch = document.getElementById("postNameSearch");
let dateSearch = document.getElementById("dateSearch");
let labelsInput = document.getElementById("LabelsInput");
let labelInput = document.getElementById("LabelInput");
let searchText = "";
let postService = {
    //Html Container For Main Post
    htmlContainer: function (posts,url) {
        $("#main").html('');
        if (posts.length > 0) {
            $.each(posts, function (index, post) {


                let container = "<div class='media shadow-sm align-content-center pt-2 postBody mt-3'>" +
                    "<div class='d-block'>" +
                    "<div class='main-check'>" +
                    "<input type='checkbox' class='custom-checkbox post-checkbox' />" +
                    " </div>" +
                    "<div class='main-img'>" +
                    "<p>" + post.titleFirstLetter + "</p>" +
                    " </div>" +
                    "</div>" +
                    "<div class='media-body'>" +
                    "<div class='main-body'>" +
                    "<a href='" + encodeURI("/admin/updatepost/" + encodeURIComponent(post.titleLink) + "/" + post.postId) + "' class='title-link mb-2'>" +
                    "<p class='main-title'style='font-size:18px;'>" + post.title  + "</p>" +
                    " </a>" +
                    "<span class='text-muted mb-2' style='font-size: 12px;'>" +post.name +"</span>"+
                    "<div class='media main-btn justify-content-between mt-1'>" +
                    "<div class='media-body'>" +
                    "<i class='text-muted'>" + post.type + "</i>" +
                    "<i class='ml-3 text-muted'>" + post.formattedDate  + "</i>" +
                    "</div>" +
                    "<div class='media justify-content-between'>" +
                    "<div class='dropdown dropdown-share'>" +
                    "<i class='fa fa-share mr-3 text-success' data-toggle='dropdown'></i>" +
                    "<ul class='dropdown-menu'>" +
                    "<li class='dropdown-item'>" +
                    "<a href='https://www.facebook.com/sharer.php?u=" + url + encodeURI("post/" + encodeURIComponent(post.titleLink) + "/" + encodeURIComponent(post.postId)) + "' class='dropdown-item-text media'>" +
                    "<i class='fa fa-facebook mr-2'></i>" +
                    "<p>Facebook</p>" +
                    "</a>" +
                    "</li>" +
                    "<li class='dropdown-item'>" +
                    "<a href='https://plus.google.com/share?url=" + url + encodeURI(+"post/" + encodeURIComponent(post.titleLink) + "/" + encodeURIComponent(post.postId)) + "' class='dropdown-item-text media'>" +
                    "<i class='fa fa-google-plus mr-2'></i>" +
                    "<p>Google PLus</p>" +
                    "</a>" +
                    "</li>" +
                    "<li class='dropdown-item'>" +
                    "<a href='https://twitter.com/intent/tweet?url=" + url + encodeURI("post/" + encodeURIComponent(post.titleLink) + "/" + encodeURIComponent(post.postId))+ "' class='dropdown-item-text media'>" +
                    "<i class='fa fa-twitter mr-2'></i>" +
                    "<p>Twitter</p>" +
                    "</a>" +
                    "</li>" +
                    "</ul>" +
                    "</div>" +
                    "<a href=" + encodeURI("/post/" + encodeURIComponent(post.titleLink) + "/" + encodeURIComponent(post.postId)) +"    target ='_blank'  "+ " class='media ml-2 justify-content-center align-items-baseline'>" +
                    "<p>" + post.comments + "</p>" +
                    "<i class='fa fa-comment'></i>" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='main-drop ml-auto'>" +
                    "<div class='dropdown'>" +
                    "<i class='fa fa-grip-vertical main-drop-icon' data-toggle='dropdown'></i>" +
                    "<ul class='dropdown-menu'>" +
                    "<li class='dropdown-item'>" +
                    "<a href='#' class='dropdown-item-text media align-items-baseline'" + "onclick='deletePost(" + "\"" + post.postId + "\"" + ")'" + ">" +
                    " <i class='fa fa-trash text-success'></i>" +
                    "<p class='ml-2'>Delete</p>" +
                    "</a>" +
                    " </li>" +
                    "<li class='dropdown-item'>" +
                    " <a href='#' class='dropdown-item-text media align-items-baseline'" + "onclick='unpublishPost(" + "\"" + post.postId + "\"" + ")'" + ">" +
                    " <i class='fa fa-trash-restore text-success'></i>" +
                    "<p class='ml-2'>Unpublish</p>" +
                    "</a>" +
                    "</li>" +
                    "<li class='dropdown-item'>" +
                    "<a href='#' class='dropdown-item-text media align-items-baseline' data-toggle='modal' data-target='#singleLabelContainer' data-postid=" + "\"" + post.postId + "\"" + " >" +
                    "<i class='fa fa-tag text-success'></i>" +
                    " <p class='ml-2'>Apply Label</p>" +
                    " </a>" +
                    " </li>" +
                    "</ul>" +
                    "</div>" +
                    "</div>" +
                    "<input type='hidden' class='postId' value=" + post.postId + " " + "/>" +
                    "</div>" +
                    "<div class='clearfix'></div>";
                $("#main").append(container);

            });
        }
        else {
            $("#main").html("<p class='text-center mt-5'> No Posts </h3>");
        }
    },
    publish: function () {
       
            connection.invoke("Publish", title.value, content.value, label.value).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
      
     
    },
    //Save Post From Server
    save: function () {
        
        connection.invoke("Save", title.value, content.value, label.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
      
     
    },
    //Update publish Post
    updatePublish: function () {
      
            connection.invoke("UpdatePublish", id.value, title.value, content.value, label.value).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
       
      
    },
    // Update Save Post From Server
    updateSave: function () {
     
        connection.invoke("UpdateSave", id.value, title.value, content.value, label.value).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
       
      
    },
   
    // Get Published Post From Server
    getPublishPost: function () {
       
            connection.invoke("GetPublishPosts").catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });;
       
    },
    // Get Draft Post From Server
    getDraftPost: function () {
        
        connection.invoke("GetDraftPosts").catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
        
    },
    //Get All Posts From Server
    getAllPosts: function () {
     
            connection.invoke("GetAllPosts").catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
       
    },
    // Get Posts By Date From Server
    getPostByDate: function () {
      
            connection.invoke("GetPostsByDate", dateSearch.value).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
      
    },
    //Get Post By Title
    getPostByTitle: function (title) {
       
        connection.invoke("GetPostsByTitle", title).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
       
    },
    // Delete All Post From Server
    deleteAll: function () {
        if (postIds.length > 0) {
           
            connection.invoke("DeleteAll", postIds).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
           
        }
        else {
            alert("No Post Selected");
            $(".spinner").css("display", "none");

        }
    },
    // Unpublish Selected Post From Server
    unpublishAll: function () {
        if (postIds.length > 0) {
         
                connection.invoke("UnpublishPosts", postIds).catch((error) => {
                    alert(error);
                    $(".spinner").css("display", "none");

                });
           
        }
        else {
            alert("No Post Selected");
            $(".spinner").css("display", "none");

        }
    },
    // Apply Label To Selected Post From Server
    applyLabels: function () {
        if (postIds.length > 0 && labelsInput.value != '') {
            
            connection.invoke("ApplyLabels", postIds, labelsInput.value).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
            
        } else {
            alert("No Post Selected Or Label is Empty");
            $(".spinner").css("display", "none");

        }
    },
    //Delete Post From Server

    deletePost: function (postId) {
        if (postId != '') {
            $(".spinner").css("display", "block");
       
            connection.invoke("Delete", postId).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
          
        }
        else {
            alert("Post Id  Cannot be Empty");
            $(".spinner").css("display", "none");

        }
    },
    // Apply Label To Single Post
    applyLabel: function (postId) {
        if (postId != '') {

            connection.invoke("ApplyLabel", postId, labelInput.value).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
        }
        else {
            alert("Post Id  Cannot be Empty");
            $(".spinner").css("display", "none");

        }
    },
    //Unpublish Single Post
    unpublish: function (postId) {
        if (postId != '') {

            connection.invoke("UnpublishPost", postId).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
        }
        else {
            alert("Post Id  Cannot be Empty");
            $(".spinner").css("display", "none");

        }
    }
};
//Delet Post By Specified PostId
function deletePost(postId) {
    if (postId != '') {
        $(".spinner").css("display", "block");
        postService.deletePost(postId);
    }
    else {
        alert("Post Id  Cannot be Empty");
        $(".spinner").css("display", "none");

    }
}
//Unpublish Post by Specified PostId
function unpublishPost(postId) {
    if (postId != '') {
        $(".spinner").css("display", "block");
        postService.unpublish(postId);
    }
    else {
        alert("Post Id  Cannot be Empty");
        $(".spinner").css("display", "none");

    }
}
// Get Result From Client 
connection.on("result", function (isDone,error) {
    $(".spinner").css("display", "none");
    if (isDone == true) {
       
     
         window.location.href = "/admin/posts";
       
    }
    else {
       
        window.alert(error);
    }
});
// Get All Posts From Client
connection.on("posts", function (posts,totalDraft, totalPublish, totalPost,url,error) {
    $(".spinner").css("display", "none");
    if (error == "") {
        $("#total").text("All  " + "(" + totalPost + ")");
        $("#totalpublish").text("Publish  " + "(" + totalPublish + ")")
        $("#totaldraft").text("Draft  " + "(" + totalDraft + ")");
        $(".allcheck").checked = false;
        labelInput.value = "";
        labelsInput.value = "";
        postService.htmlContainer(posts, url);
    }
    else {
        alert(error);
    }
   
    postIds.splice(0, postIds.length);
});
//Get All Posts Result From Client
connection.on("postresult", function (isDeleted, posts,totalDraft,totalPublish,totalPost,url,error) {

    $(".spinner").css("display", "none");
    var selectedItem = document.getElementById("selectedItem");
    selectedItem.style.display = "none";
    var checkbox = document.getElementById("allcheck");
    checkbox.checked = false;
    if (isDeleted) {
       
        $("#total").text("All  " + "(" + totalPost + ")");
        $("#totalpublish").text("Publish  " + "(" + totalPublish + ")")
        $("#totaldraft").text("Draft  " + "(" + totalDraft + ")");
        postService.htmlContainer(posts, url);
        $("#labelContainer").modal("hide");
        $("#singleLabelContainer").modal("hide");
       
    }
    else {
        alert(error);
    }
    postIds.splice(0, postIds.length);
});
connection.start().then(function () {
    try {
        if ($("#posts").val() == "posts") {
            $(".spinner").css("display", "block");
            postService.getAllPosts();
        }
      
        //Publish Button
        $("#publishBtn").on("click", function () {

            $(".spinner").css("display", "block");

            postService.publish();

        });
        //Save Button

        $("#saveBtn").on("click", function () {

            $(".spinner").css("display", "block");
            postService.save();


        });
        $("#publishUpdateBtn").on("click", function () {
            $(".spinner").css("display", "block");
            postService.updatePublish();
        });
        $("#saveUpdateBtn").on("click", function () {
            $(".spinner").css("display", "block");
            postService.updateSave();
        });
        //Back Arrow
        $("#backarrow").on("click", function () {

            window.location.href = window.location.href = "/admin/posts";

        });
        //Select Post Type DropDown
        $("#selectposttype").on("change", function () {
            $(".spinner").css("display", "block");
            if ($(this).val() == "all") {

                postService.getAllPosts();
                $(this).val("all");
            }
            else if ($(this).val() == "publish") {

                postService.getPublishPost();
                $(this).val("publish");
            }
            else {

                postService.getDraftPost();
                $(this).val("draft");
            }
        });
        //Date Dropdown
        $("#dateSearch").on("change", function () {
            $(".spinner").css("display", "block");
            postService.getPostByDate();
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
                        let postId = htmlElement.querySelector(".postId").value;
                     let  postIndex = postIds.indexOf(postId);
                        if (postCheckbox.checked) {
                            if (postIndex == -1) {
                                postIds.push(postId);
                            }
                            $("#selected").text(postIds.length + " " + "Selected");
                        }
                        else {
                            if (postIndex !== -1) {
                                postIds.splice(postIndex, 1);
                            }

                            $("#selected").text(postIds.length + " " + "Selected");
                        }
                    });

                 
                });
                $("#selected").text(postIds.length + " " + "Selected");

            }
            else {

                selectedItem.style.display = "none";
                $(".postBody").each(function (index, htmlElement) {

                    var postCheckbox = htmlElement.querySelector(".post-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "none";
                });


                postIds.splice(0, postIds.length);
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
            postIds.splice(0, postIds.length);
        });
        $("#delete_all").on("click", function () {
            $(".spinner").css("display", "block");
            postService.deleteAll();
        });
        $("#unpublish_all").on("click", function () {
            $(".spinner").css("display", "block");
           
            postService.unpublishAll();
        });
        $("#applyLabelsBtn").on("click", function () {
            $(".spinner").css("display", "block");
            postService.applyLabels();
            $("#label").val('');
        });
        $("#singleLabelContainer").on("show.bs.modal", function (event) {
            var btn = $(event.relatedTarget);
            var id = btn.data("postid");
            labelPostId = id;
        });
        $("#applyLabelBtn").on("click", function () {
            $(".spinner").css("display", "block");
            postService.applyLabel(labelPostId);
        });
        //Get Post By Title
        $("#postNameSearch").on("keypress", function (e) {
            if (postNameSearch.value != '') {
                postService.getPostByTitle(postNameSearch.value);
            }
        });
        $("#postNameSearch").on("keydown", function (e) {
            var key = e.keyCode || e.charCode;
            if (key == 8 || key == 46) {
                if (postNameSearch.value == '') {
                    postService.getAllPosts();
                }
                else {

                    postService.getPostByTitle(postNameSearch.value);
                }
            }
        });
    }
    catch (error) {
        alert(error);
    }
   
}).catch(function (err) {
    alert(err);
})