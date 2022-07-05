const dbConnection = new DbConnection();
const context = dbConnection.context;
let facultyId = -1;
let facultyArray = [];
let facultyService = {
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
    facultyTable: function (_facultyArray) {

        let _index = 1;
        $("#FacultyTable").html('');
        _facultyArray.forEach(function (_faculty, index) {

            let container = "<tr  data-toggle='modal' data-target='#facultyModal' data-id=" + "\"" + _faculty.id + "\"" + ">" +
                "<th scope='row'>" + _index + "</th>" +
                "<td>" + _faculty.name + "</td>" +
                "<td>" + _faculty.registrationDate + "</td>" +
                "</tr>";
            $("#FacultyTable").append(container);
            _index++;

        });



    },
    createF: function(name){
        let query = "add Name=@1, RegistrationDate=@2 into Faculty";
 
        dbConnection.open(function(){
       
            context.executeQuery(query,name,new Date().toUTCString(),(done,error)=>{
               if(done){
                   $("#error").text("Faculty Created Successfully");
               }
               else
               {
                   $("#error").text(error);
               }

            });


        });
       
       facultyService.displayFaculty();
       $("#facultyName").val('');
    },
    createFaculty: function(name){
  
$("#error").text("Processing Faculty");
 
  let facultyIndex = facultyArray.findIndex(x=> x.name == name);
  if(facultyIndex ==-1)
  {
     
  if(name.length > 0)
          {
            facultyService.createF(name);
          }
          else
          {
              $("#error").text("Faculty Name canot be Null or Empty");
          }
       
        
    }
    else{
        $("#error").text("Faculty Name already Exist");
    }
}
,
    displayFaculty: function(){
        let query ="select all from Faculty";
        dbConnection.open(function(){
         context.executeQueryReader(query,(reader)=>{

              facultyService.facultyTable(reader);
              facultyArray = reader.slice(0);
         });
        });
    },
    deleteFaculty: function(id){
          let query = "delete from Faculty where ID=@1";
          dbConnection.open(function(){
         context.executeQuery(query,id,(done,error)=>{
          if(done){
           $("#modalError").text("faculty Delete Successfully");
          }
          else{
             $("#modalError").text(error);
          }
         });
          });
    }

}

window.onload = function(){

facultyService.adminDashboardHtml();
facultyService.displayFaculty();
$("#createFaculty").on("click",function(e){
  let value = $("#facultyName").val();
   facultyService.createFaculty(value);
  e.preventDefault();
});




$("#facultyModal").on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget);
    var id = button.data('id');
     facultyId = id;
});
$("#delete").on("click", function (e) {
    let yes = prompt("Are you sure to Delete the faculty. Once Deleted it cannot be retrived");
    if (yes == "yes") {
      
        if (facultyId != -1) {
            facultyService.deleteFaculty(facultyId);

             window.location.reload();
        } else {
            alert("Faculty Name Cannot be found");
        }
    }
    else {
        alert("please input yes to procced");
    }

    e.preventDefault();
});
}