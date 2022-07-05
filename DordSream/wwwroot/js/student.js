let dbConnection = new DbConnection();
let context = dbConnection.context;
let studentId = -1;
let studentService = {
    studentTable: function (_studentArray) {
        let _index = 1;
        $("#_studentTable").html('');
        _studentArray.forEach(function (_student, index) {

            let container = " <tr  data-toggle='modal' data-target='#studentModal' data-id=" + "\"" + _student.id + "\"" + ">" +
                "<th scope='row'>" + _index + "</th>" +
                "<td>" + _student.firstName + " " + _student.lastName + "</td>" +
                "<td>" + _student.registrationNumber + "</td>" +
                "<td>" + _student.registeredDate + "</td>" +
                "</tr>";
            $("#_studentTable").append(container);
            _index++;

        });
      
       


    },
    studentModalData: function (_datas) {
_datas.forEach((_data)=>{
        $("#Name").val(_data.firstName + " " + _data.lastName);
        $("#Email").val(_data.email);
        $("#Phone").val(_data.phone);
        $("#RegistrationNumber").val(_data.registrationNumber);
        $("#Country").val(_data.country);
        $("#CourseType").val(_data.courseType);
        $("#Department").val(_data.department);
     $("#RegisteredDate").val(_data.registeredDate);
    });
    },
    displayStudents: function(){
        let query = "select all from Students";
        dbConnection.open(function(){
        context.executeQueryReader(query,(reader)=>{
            studentService.studentTable(reader);
        });
        });
    },
    removeStudent: function(id){
       dbConnection.open(function(){
           let query = "delete from Students where ID=@1";
            context.executeQuery(query,id,(done,error)=>{
              if(done){
                  $("#error").text("Student has removed successfully");
              }
              else
              {
                  $("#error").text(error);
              }
            });
       })
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
    }

};


window.onload = function(){
    studentService.adminDashboardHtml();
studentService.displayStudents();

    $("#studentModal").on('show.bs.modal', function (event) {
           
        var button = $(event.relatedTarget);
        var id = button.data('id');
        studentId = id;
          let query = "select all from Students where ID=@1";
          dbConnection.open(function(){
             context.executeQueryReader(query, id,(reader)=>{
                 studentService.studentModalData(reader);
             });
          });

    });
    $("#reject").on("click", function (e) {
        let yes = prompt("Are you sure to remove student. Once you remove , you will loose the information and cannot be retrived");
        if (yes == "yes") {
          
            if (studentId != -1) {
                 studentService.removeStudent(studentId);
                 window.location.reload();
            } else {
                alert("Student Can not be found");
            }
        }
        else {
            alert("please input yes to procced");
        }
    
        e.preventDefault();
    });
    $("#searchStudent").on("click",function(){
let value =$("#registrationNumber").val();
       let query ="select all from Students where RegistrationNumber=@1";
       dbConnection.open(function(){
context.executeQueryReader(query,value.toUpperCase(),(reader)=>{
studentService.studentTable(reader);
});
       });
    });
}