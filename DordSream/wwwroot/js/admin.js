
let dbConnection = new DbConnection();
let context = dbConnection.context;
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
        
    "</li>";
     $("#dashboard_Container").html(htmlContent);
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
                "<td>" + _student.name + "</td>" +
                "<td>" + _student.registrationNumber + "</td>" +
                "<td>" + _student.registeredDate + "</td>" +
                "</tr>";
            $("#studentTable").append(container);
            studentArray.push(_student);
            _index++;

        });
      
       


    }

};

if ($("#layout").val("layout")) {

    dataBaseService.adminDashboardHtml();
}
else {
    dataBaseService.authorDashboardHtml();


}
let page = $("#page").val();

if (page == "admin") {

    window.onload = function () {

        $("#searchForm").css("display", "none");

        dbConnection.open(function () {

            let query = "select all from Applicants";
            context.executeQueryReader(query, (reader) => {
                dataBaseService.applicatantHtmlContainer(reader);

                $("#no_Appliacant").text(reader.length);
            });
        });

        dbConnection.open(function () {

            let query = "select all from Students";
            context.executeQueryReader(query, (reader) => {

                dataBaseService.studentTable(reader);
                $("#no_Student").text(reader.length);
            });
        });







    }
}
   

