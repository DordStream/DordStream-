PROJECT TITLE: DordStream


DordStream is a software that helps web developers to develop a web application without back-end. 
Thus, three methods are approached
(1) Discovery of Html-like tags named DSHTML
(2) Discovery of SQl Query through Javascript named DSSQL Query
(3) Development of Content Management System  named DordStream CMS


DORDSTREAM CMS

Dordstream CMS is a free and open source content management system software written in C# and paired with MSSQL server which:
(1)	Allow to perform relational database operation through Javascript.
(2)	Allow to develop blog and website with Html Document.
(3)	Allow to develop web application.

DordStream CMS is a Template based CMS software I.e. The website or blog or web software has to be developed in template design structure and installed for usage.

DordStream CMS has the following features
1.	It allows multi user website or web application or blog.
2.	It is template-based.
3.	It allows adding and removing of widget.
4.	Its supported one website or web application per installation.
5.	Its support other web content types including mailing, media galleries and membership site.
6.	It runs on any computer platform that supports both web server capable of running .Net Core and a database (MSSQL Server) to the content and configuration (Internet Information Services IIS).
7.	It allows to watermark uploaded images.
8.	It allows direct publication to facebook page.
9.	It allows setting of role in database operation.
10.	It allows setting of role of accessing any page name contain either dord or custom (Template pages).
11.	It allows creation of posts.
12.	It allows creation of pages.
13.	It allows changing of Title (site title).
14.	It allows changing of the favicon (site logo on browser).
15.	It allows changing of Keywords.
16.	It allows changing of Description.
17.	It allows to enable anonymous user.
18.	It allows uploading of template.
19.	It allows to enable usage of cache.
20.	It allows to enable ip address verification.







DSHTML TAG

Dshtml tag is a set of custom tag which extend the function of html through the CMS. It is also html-like that is used to perform some tasks within the CMS and displayed, formatted the same as html content on web browser. It has the same syntax as html 


Example of Discovery Dshtml Tag

    <auth ds-text="Welcome!" >
        <p id="username">Bellie_Coin</p>
         <li><a href="#" id="register">Registration</a></li> 
          <li><a href="#" id="login">Login</a></li>
           </auth>

      
    


DSSQL QUERY

DSSQL queries is a query in form of commands written as statements and are aggregated into programs that enable users to add, modify, or retrieve data from the database table.
DSSQL Query is used through Javascript


Example of Discovery DSSQL Query


window.onload = function() {
let dbConnection= new DbConnection();
let context = dbConnection.context;
dbConnection.open(function() {
let addQuery="add Name=@1, Age=@2, Address=@3 into Student";
context.executeQuery(addQuery,"SomeoneName",15,"no 12 someone address",(done,error)=>{ alert(error); });
});}
Where the name, age, address are the columns and @number is the value identifier.





Advantages of DordStream to developer and newbie

•	It helps developer to develop web application with Html, Css and Javascript.
•	It helps Newbie Developer Journey easy.
•       It helps developer that has zero knowledge on back-end language (PHP, C#, Java e.t.c)
•	It helps developer to perform rational database operations without the knowledge of MYSQL or MSSQL e.t.c.






Security

•	IPAddress Verification
•	Role Based
•       Cross Site Script (XSS)
•	SQL Injection











References
•	Froala Editor
•	Microsoft Cooperation
•	Agility Html Pack

The demo was hosted on free server where SMTP server is not installed. Email service won't work.
Demo : http://dordstream-001-site1.etempurl.com/admin
Admin Login Details

•	Username: DordStream
•	Password: Admin32@
 
 Note: You are advise to add your credentials and delete the old credential


Released Version: Version 1.1


Released Date: July 1 2022


Download the zip code and read the full tutorial from DordStream.pdf 
Watch the tutorial on Youtube via our channel http://www.youtube.com/channel/UCpp87MTauAmcEx8M3MvNwqQ

Contact details

WhatsApp: https://wa.me/message/OWVXK2IC34Y4E1

Mobile Number: +2347013943034

Facebook: https://www.facebook.com/profile.php?id=100003468655180
