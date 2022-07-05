
let dbConnection = new DbConnection()
let dbContext = dbConnection.context;
let  applicantID  = -1;
let studentArray = [];
let dataBaseService = {
    authorDashboardHtml: function(){
        let htmlContent = " <li><a href='dashboardcustom' ><i class='fa fa-dashboard fa-fw nav_icon'></i>Dashboard</a>"
        + "</li>"+ "<li><a href='/coursecustom'><i class='fa fa-laptop nav_icon'></i>Course Reg.</a>"+
        "</li>"+
    "<li>"+
        "<a href='/examresultcustom'><i class='fa fa-indent nav_icon'></i>Exam Result</a>"+
        
   "</li>"+
    "<li>"+
        "<a href='/examcardcustom'><i class='fa fa-indent nav_icon'></i>Exam Card</a>"+
        
    "</li>";
     $("#dashboard_Container").html(htmlContent);
    },
    adminDashboardHtml: function(){
  
        let htmlContent =" <li><a href='/dord/dashboarddord' ><i class='fa fa-dashboard fa-fw nav_icon'></i>Dashboard</a>"
   + "</li>" +
    "<li>"+
        "<a href='/dord/applicantdord'><i class='fa fa-indent nav_icon'></i>Applicants</a>"+
        
   "</li>"+
    "<li>"+
        "<a href='/dord/studentdord'><i class='fa fa-indent nav_icon'></i>Students</a>"+
        
    "</li>"+
    "<li>"+
    "<a href='/dord/facultydord'><i class='fa fa-indent nav_icon'></i>Faculty</a>"+
    
"</li>"+
"<li>"+
"<a href='/dord/departmentdord'><i class='fa fa-indent nav_icon'></i>Department</a>"+

"</li>" +

"<li>"+
"<a href='/dord/coursedord'><i class='fa fa-indent nav_icon'></i>Course</a>"+

"</li>"+
"<li>"+
"<a href='/dord/examdord'><i class='fa fa-indent nav_icon'></i>Exam</a>"+

"</li>";
     $(".dashboard_Container").html(htmlContent);
    },
    applicatantHtmlContainer: function (_applicantArray) {

        _applicantArray.forEach(function (_applicant, index) {
            let container = " <div class='activity-row'>" +
                "<div class='col-xs-2 activity-img'><img src='/images/5.png' class='img-responsive' alt=''/></div>" +
                "<div class='col-xs-8 activity-desc'>" +
                "<h5><a href='#' data-toggle='modal'  data-target='#applicantModal'  data-id=" + "\"" + _applicant.id + "\"" + ">" + _applicant.name + "</a></h5>" +
                "<p>" + _applicant.name + " Submmited Application </p>" +
                "<h6>" + _applicant.registrationDate + "</h6>" +
                "</div>" +
                "<div class='clearfix'> </div>" +
                "</div>";
            $("#style-2").append(container);

        });
    
    },
    studentTable: function (_studentArray) {
        let _index = 1;
        $("#studentTable").html('');
        _studentArray.forEach(function (_student, index) {

            let container = " <tr  data-toggle='modal' data-target='#studentModal' data-id=" + "\"" + _student.id + "\"" + ">" +
                "<th scope='row'>" + _index + "</th>" +
                "<td>" + _student.firstName + " " +_student.lastName + "</td>" +
                "<td>" + _student.registrationNumber + "</td>" +
                "<td>" + _student.registeredDate + "</td>" +
                "</tr>";
            $("#studentTable").append(container);
            _index++;

        });
      
       


    },
    applicantModalData: function (_datas) {
   _datas.forEach((_data)=>
   {
        $("#Name").val(_data.name);
        $("#Email").val(_data.email);
        $("#Phone").val(_data.phone);
        $("#Code").val(_data.code);
        $("#Country").val(_data.country);
        $("#CourseType").val(_data.courseType);
        $("#Department").val(_data.department);

        $("#Result").val(_data.result);

    });
},
removeApplicant: function (id) {
    let query = "delete from Applicants where ID=@1";
    dbConnection.open(function () {

        dbContext.executeQuery(query, id, (done, error) => {
            if (done) {
                alert("Applicant has been rejected");
            }
            else {
                alert(error);
            }
        })

    });
},
generateRegistration: function(_courseType,_departmentType){
    let registrationData ={
       courseType: function(_courseType)
       {
           let course = "";
           const _Date = new Date();
        switch(_courseType){
            case "Diploma":
                course = _Date.getFullYear().toString().replace("20","D");
            break;
            case "Distance Learning":
                course = _Date.getFullYear().toString().replace("20","DL");
                break;
                case "Part Time":
                    course = _Date.getFullYear().toString().replace("20","PT");
                    break;
                    case "Bachelor Degree":
                        course = _Date.getFullYear().toString().replace("20","U");
                        break;
                        case "PG":
                            course = _Date.getFullYear().toString().replace("20","PG");
                            break;
                            default:
                                break;
        };
        return course;
       },
       departmentType: function(department){
           let _department = "";
           switch(department){
               case "Civil Engineering":
                   _department ="CV";
                   break;
                   case "Electrical Engineering":
                       _department = "EE";
                       break;
                       case "Mechanical Engineering":
                           _department = "ME";
                           break;
                           case "Computer Engineering":
                               _department ="CE";
                               break;
                               case "Chemical Engineering":
                                   _department = "CH";
                                   break;
                                   default : 
                                   break;
           };
           return _department;
       }
    };
    let filterDepartment = studentArray.filter(x => x.Department == _departmentType);
    let newNumber = filterDepartment.length + 1;

    let newregistrationNumber = registrationData.courseType(_courseType) + registrationData.departmentType(_departmentType) + (newNumber < 10 ? "100" + newNumber : (newNumber > 10 || newNumber < 99) ? "10" + newNumber : "1" + newNumber);

    return newregistrationNumber;
   

      
},
registerStudent: function (htmlElement) {

    try {

        var xmlhttpRequest = xhttpRequest();
        const formData = new FormData(htmlElement);
         let name=  $("#Name").val();
          let email = $("#Email").val();
          let phone = $("#Phone").val();
           let code = $("#Code").val();
           let country =$("#Country").val();
           let courseType=$("#CourseType").val();
            let departmentType =$("#Department").val();
            let token =$("#__DordStreamRequestVerificationToken").val();
           let firstName ="";
           let lastName="";
        let isFullName = name.includes(" ");
        let registrationNumber = dataBaseService.generateRegistration(courseType,departmentType);
        if(isFullName)
        {
        let names = name.split(" ");
        firstName = names[0];
        formData.set("FirstName", names[0]);
        lastName = names[1];
        formData.set("LastName", names[1]);
        }
        else
        {
            firstName = names[0];
            formData.set("FirstName", formData.get("Name"));
            lastName = names[1];
            formData.set("LastName", null);

        }
        formData.set("Email",email);
        formData.set("UserName",registrationNumber);
        formData.set("Password", formData.get("Email"));
        formData.set("Verify", false);
        formData.set("__DordStreamRequestVerificationToken",token);
        if(xmlhttpRequest !=null)
        {
            $("#error").text("Please wait applicantion is on progess");
        xmlhttpRequest.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                if (this.responseText == "Successfully") {
                  let query ="add FirstName=@1, LastName=@2, Email=@3, Phone=@4, Country=@5, CourseType=@6,Department=@7, RegistrationNumber=@8, RegisteredDate=@9 into Students";
                  let values =[firstName,lastName,email,phone,country,courseType, departmentType,registrationNumber, new Date().toUTCString()];
                       dbConnection.open(function(){
                         dbContext.executeQuery(query,values,(done,error)=>{
                            if (done) {
                                $("#error").text("Student has been registered don't forget to get across to him/her through provided email");
                                dataBaseService.removeApplicant(applicantID);
                            }
                            else {
                                $("#error").text(error);
              
                            }
                         });
                       });
                   
                }
                else {
                    $("#error").text(this.responseText);
                }
            }
        }

        xmlhttpRequest.open("POST", "/account/registeruser",true);
        xmlhttpRequest.send(formData);
        
    }
    


    }
    catch (error) {
        alert(error);
    }
    return false;
},
acceptApplicant: function(htmlElement){

     
        dataBaseService.registerStudent(htmlElement);
       


},
StudentApplicant: function(){
    dbContext.reader((reader,error,tableName)=>{
     switch(tableName){
         case "Applicants":
             dataBaseService.applicatantHtmlContainer(reader);
 
             $("#no_Appliacant").text(reader.length);
             break;
             case "Students":
                 dataBaseService.studentTable(reader);
                 $("#no_Student").text(reader.length);
                  studentArray= reader.slice(0);
                 break;
                 default:
                     break;
     }
    });
 
 
    dbConnection.open(function(){

        let studentQuery = "select all from Students";
        let applicantQuery = "select all from Applicants";
    dbContext.executeQueryReader(applicantQuery,"Applicants>>");
      dbContext.executeQueryReader(studentQuery, "Students>>");
       
    });
}
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
function acceptApplication(htmlElement){
dataBaseService.acceptApplicant(htmlElement);
}

    window.onload = function () {
      
 dataBaseService.adminDashboardHtml();
    


        $("#searchForm").css("display", "none");
   
      dataBaseService.StudentApplicant();
    }

$("#applicantModal").on('show.bs.modal', function (event) {
  
    var button = $(event.relatedTarget);
    var id = button.data('id');
    applicantID = id;
   
    let query = "select all from Applicants where ID=@1";
    dbConnection.open(function () {

       try{ dbContext.executeQueryReader(query, id, (reader) => {
            dataBaseService.applicantModalData(reader);
        });
    }
    catch(error){
        alert(error);
    }

    });

});
$("#reject").on("click", function (e) {
    let yes = prompt("Are you sure to reject this application. Once you reject , you will loose the information and cannot be retrived");
    if (yes == "yes") {
      
        if (applicantID != -1) {
           
            dataBaseService.removeApplicant(applicantID);
             window.location.reload();
        } else {
            alert("Application Cannot be found");
        }
    }
    else {
        alert("please input yes to procced");
    }

    e.preventDefault();
});