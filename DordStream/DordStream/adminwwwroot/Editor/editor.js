
const editorInstance = new FroalaEditor('#content', {
    // Set maximum number of characters.
    fontSizeDefaultSelection: '16',
    events: {
        'image.beforeUpload': function (files) {
            const editor = this;
            let token = document.getElementById("token");
            if (files.length > 0) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("File", files[0]);
                formData.append("__DordStreamRequestVerificationToken", token.value);
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var fileModel = JSON.parse(this.responseText);
                        editor.image.insert(fileModel.filePath, null, null, editor.image.get());

                    }
                }

                xhr.open("POST", "/admin/upload");
                xhr.send(formData);


            }
            return false
        },
        "image.removed": function ($img) {
            try {

                let token = document.getElementById("token");
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("FileName", $img.attr('src'));
                formData.append("__DordStreamRequestVerificationToken", token.value);
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {

                        var result = this.response;
                        if (!result) {
                            return false;
                        }

                    }




                }
                xhr.open("POST", "/admin/remove");
                xhr.send(formData);

            }
            catch (error) {
                alert(error);
            }
            return false
        },
        'video.beforeUpload': function (files) {
            const editor = this;
            if (files.length) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("File", files[0]);

                formData.append("__DordStreamRequestVerificationToken", token.value);
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var fileModel = JSON.parse(this.responseText);

                        var videoElment = "<video width='320' height='240' controls><source src=" + "\"" + fileModel.filePath + "\"" + " " + "type=" + "\"" + "video/" + fileModel.extension + "\"" + " " + "> Your browser does not support the video tag </video> ";
                        editor.video.insert(videoElment);
                    }
                }

                xhr.open("POST", "/admin/upload");
                xhr.send(formData);


            }
            return false;
        },
        "video.removed": function ($video) {
            try {
                $video.children().each(function () {
                    let videoSrc = $(this).attr('src');
                    let token = document.getElementById("token");
                    var xhr = new XMLHttpRequest();
                    var formData = new FormData();
                    formData.append("FileName", videoSrc);
                    formData.append("__DordStreamRequestVerificationToken", token.value);
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {

                            var result = this.response;
                            if (!result) {
                                return false;
                            }

                        }




                    }
                    xhr.open("POST", "/admin/remove");
                    xhr.send(formData);

                });

            }
            catch (error) {
                alert(error);
            }
            return false
        },
        'file.beforeUpload': function (files) {
            const editor = this;
            if (files.length) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("File", files[0]);

                formData.append("__DordStreamRequestVerificationToken", token.value);
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var fileModel = JSON.parse(this.responseText);
                        switch (fileModel.type) {
                            case "Audio":
                                var audioElment = "<audio width='320' height='240' controls><source src=" + "\"" + fileModel.filePath + "\"" + " " + "type=" + "\"" + "audio/" + fileModel.extension + "\"" + " " + "> Your browser does not support the audio tag </audio> ";
                                editor.video.insert(audioElment);
                                break;
                            case "Document":
                                editor.file.insert(fileModel.filePath, fileModel.fileName, { link: fileModel.filePath });
                                break;
                            default:
                                break;
                        }

                    }
                }

                xhr.open("POST", "/admin/upload");
                xhr.send(formData);


            }
            return false;
        }
    }

});