var connection = new signalR.HubConnectionBuilder().withUrl("/commentHub").build();
let postIds = [];
let commentIds = [];
let commentService ={
    htmlContainer: function (comments) {
        $("#main").html('');
        if (comments.length > 0) {
            $.each(comments, function (index, comment) {

                var container = "<div class='media border shadow-sm mb-3 comment-body'>" +
                    "<input type ='checkbox' class='custom-control comment-checkbox' />" +
                    "<div class='comment-img'>" +
                    "<p>" + comment.nameFirstLetter + "</p>" +
                    "</div>" +
                    "<div class='media-body'>" +
                    "<div class='input-group align-items-baseline'>" +
                    "<p class='mr-2'>" + comment.name + "</p>" +
                    "<p class='text-muted mr-2'> Commented On</p>" +
                    "<a href='" + encodeURI("/" + encodeURIComponent(comment.label) + "/" + encodeURIComponent(comment.titleLink) + "/" + encodeURIComponent(comment.postId)) + "' class='nav-link'>" + comment.postTitle + "</a>" +
                    "</div>" +
                    "<i class='comment-date'>" + comment.formattedDate  + "</i>" +
                    "<div class='comment-text'>" +
                    "<p>" + comment.message + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<input type='hidden' class='postId' value=" + comment.postId + " />" +
                    "<input type='hidden' class='commentId' value=" + comment.commentId + " />" +
                    "</div>";
                $("#main").append(container);

            });
        }
        else {
            $("#main").html("<p class='text-center mt-5'> No Comments </h3>");
        }
    }
    ,
    clientHtmlContainer: function (comments) {
      
        var containerHeader = "<h5 class='comment-text'>Our Comments</h5>";
        $("#maincomment").html('');
        $("#maincomment").append(containerHeader);
            $.each(comments, function (index, comment) {

              var container = "<div class='media mb-4 border-danger'>"+
                    "  <h6 class='comment-img'>"+
                        comment.nameFirstLetter
                              +"</h6 >"+
                        "<div class='media-body comment-media'>"+
                            "<h6>" +comment.name + "</h6>"+
                    "<p>" +comment.content +"</p>" +
                  "<i>" + comment.formattedDate  + "</i>" + "</div>" + "</div >";
                $("#maincomment").append(container);

            });
       
      
    },
    deleteAll: function () {
        if (postIds.length > 0 && commentIds.length > 0) {
            connection.invoke("DeleteAll", postIds, commentIds).catch((error) => {
                alert(error);
                $(".spinner").css("display", "none");

            });
        }
        else {
            alert("No Post Selected");
             $(".spinner").css("display", "none");
        }
    },
    searchByDate: function () {
        connection.invoke("SearchByDate", $("#commentDate").val()).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    getComments: function () {
        connection.invoke("GetComments").catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    addComment: function () {
        connection.invoke("AddComment", $("#postId").val(), $("#fullName").val(), $("#message").val()).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    }
};
connection.on("result", function (isDone, comments,error) {
    $(".spinner").css("display", "none");
    var checkbox = document.getElementById("comment-checkboxes");
    checkbox.checked = false;
    var selectedItem = document.getElementById("selectedItem");
    selectedItem.style.display = "none";
    $(".comment-body").each(function (index, htmlElement) {

        var postCheckbox = htmlElement.querySelector(".comment-checkbox");
        postCheckbox.checked = false;
        postCheckbox.style.display = "none";
    });
    if (isDone) {
        commentService.htmlContainer(comments);
    }
    else {
        window.alert(error);
    }
    commentIds.splice(0, commentIds.length);
    postIds.splice(0, postIds.length);
});
connection.on("searchResult", function (comments,error) {
    $(".spinner").css("display", "none");
    if (error == "") {
        commentService.htmlContainer(comments);
        var checkbox = document.getElementById("comment-checkboxes");
        checkbox.checked = false;
        var selectedItem = document.getElementById("selectedItem");
        selectedItem.style.display = "none";
   
    }
    else {
        alert(error);
    }
    commentIds.splice(0, commentIds.length);
    postIds.splice(0, postIds.length);
});
connection.on("clientResult", function (isDone, comments) {
    if (isDone) {
        commentService.clientHtmlContainer(comments);
        $("#fullName").val('');
        $("#message").val('');
    }

});
connection.start().then(function () {
    try {
        $(".spinner").css("display", "block");
        commentService.getComments();
        $("#comment-checkboxes").on("click", function () {

            var selectedItem = document.getElementById("selectedItem");
            var checkbox = document.getElementById("comment-checkboxes");

            if (checkbox.checked) {
                selectedItem.style.display = "block";

                $(".comment-body").each(function (index, htmlElement) {

                    var postCheckbox = htmlElement.querySelector(".comment-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "block";
                    
                    postCheckbox.addEventListener("click", function () {
                        let postId = htmlElement.querySelector(".postId").value;
                        let commentId = htmlElement.querySelector(".commentId").value;

                        let postIndex = postIds.indexOf(postId);
                        let commentIndex = commentIds.indexOf(commentId);
                        if (postCheckbox.checked) {
                            if (commentIndex == -1) {
                                postIds.push(postId);
                                commentIds.push(commentId);
                            }
                            
                            $("#selected").text(postIds.length + " " + "Selected");

                        }
                        else {
                            if (commentIndex !== -1) {
                                postIds.splice(postIndex, 1);
                                commentIds.splice(commentIndex, 1);
                            }
                            
                            $("#selected").text(postIds.length + " " + "Selected");
                        }
                    });


                });
                $("#selected").text(postIds.length + " " + "Selected");

            }
            else {

                selectedItem.style.display = "none";
                $(".comment-body").each(function (index, htmlElement) {

                    var postCheckbox = htmlElement.querySelector(".comment-checkbox");
                    postCheckbox.checked = false;
                    postCheckbox.style.display = "none";
                });


                commentIds.splice(0, commentIds.length);
                postIds.splice(0, postIds.length);
            }
        });
        $("#selectedItemIClose").on("click", function () {
            var selectedItem = document.getElementById("selectedItem");
            var checkbox = document.getElementById("comment-checkboxes");
            checkbox.checked = false;
            selectedItem.style.display = "none";
            $(".comment-body").each(function (index, htmlElement) {

                var postCheckbox = htmlElement.querySelector(".comment-checkbox");
                postCheckbox.checked = false;

                postCheckbox.style.display = "none";
            });
            commentIds.splice(0, commentIds.length);
            postIds.splice(0, postIds.length);
        });
        $("#delete_all").on("click", function () {
            commentService.deleteAll();
        });
        $("#commentDate").on("change", function () {
            commentService.searchByDate();
        });
        $("#addComment").on("click", function () {

            if ($("#fullName").val() != "" && $("#message").val() != "") {

                commentService.addComment();

            }
        });
    }
    catch (error) {
        alert(error);
    }
}).catch(function (error) {
    alert(error);
});