var connection = new signalR.HubConnectionBuilder().withUrl("/messagehub").build();
let subscriber = document.getElementById("subscriber");
let messageService ={

    htmlContainer: function (messages) {
        $("#messageList").html('');
        if (messages.length > 0) {
            let i = messages.length;
            $.each(messages, function (index, message) {

                    var list = "<li class='input-group justify-content-between shadow-sm pl-2 pr-2 message-li mb-3'>" +
                        "<a href = /admin/readmail/" + message.type + "/" + i + "  class='list-group-item-action media-body input-group justify-content-between mt-2 p-2' >" +
                        "<p>" + message.fromName + "</p>" +
                        "<p>" + message.title + "</p>" +
                        "<p class='font-italic text-muted'>" + message.formattedDate + "</p>" +
                        "</a>" +
                        "</li>";
                    $("#messageList").append(list);
                    i--;
                
            });
        }
        else {
            $("#messageList").html("<p class='text-center mt-5'> No Messages </h3>");
        }
    },
    searchByDate: function () {
        connection.invoke("SearchByDate", $("#messageDate").val(), $("#mailTypeSelect").val()).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    searchByLabel: function (mailType) {
        connection.invoke("SearchByLabel", mailType).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    saveMessage: function () {
        connection.invoke("Save", $("#From").val(), $("#Subject").val(), $("#content").val()).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    },
    sendMessage: function () {
       
        connection.invoke("Send", $("#From").val(), $("#Subject").val(), $("#content").val(), subscriber.checked).catch((error) => {
            alert(error);
            $(".spinner").css("display", "none");

        });
    }
};
connection.on("messages", function (messages,error) {
    $(".spinner").css("display", "none");
    if (error == "") {
        messageService.htmlContainer(messages);
    }
    else {
        alert(error);
    }

});
connection.on("result", function (isDone,error) {
    $(".spinner").css("display", "none");
    if (isDone) {
        window.location.href = "/admin/messages";
    }
    else {
        window.alert(error);
    }
});
connection.start().then(function () {
    try {
        if (navigator.onLine) {
            if ($("#messages").val() == "messages") {
                $(".spinner").css("display", "block");
                messageService.searchByLabel("Inbox");
            }


            $("#messageDate").on("change", function () {


                $(".spinner").css("display", "block");
                messageService.searchByDate();
            });
            $("#mailTypeSelect").on("change", function () {

                $(".spinner").css("display", "block");
                messageService.searchByLabel($("#mailTypeSelect").val());

            });
            //Back Arrow
            $("#backarrow").on("click", function () {

                window.location.href = window.location.href = "/admin/messages";

            });
            $("#saveBtn").on("click", function () {
                $(".spinner").css("display", "block");
                messageService.saveMessage();
            });
            $("#sendBtn").on("click", function () {
                $(".spinner").css("display", "block");
                messageService.sendMessage();
            });
        }
        else {
            $(".spinner").css("display", "none");
            $("#main").html("<p class='text-center'> No Internet Connection <p>");
        }
    }
    catch (error) {
        alert(error);
    }
}).catch(function (error) {
    alert(error);
});