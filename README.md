Introduction to DordStream

Dordstream is a free and open source content management system software written in C# and paired with MSSQL server.
DordSream is a content management system software that:
(1)	Allow to perform database operation through Javascript (Introduced SQL Query).
(2)	Allow to develop blog and website with Html Document (Intoduced Dshtml Tag).
(3)	Allow to develop web software.

DordStream is a Template based CMS software I.e. The website or blog or web software has to be developed in template design structure and installed for usage.

DordStream has the following features
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





Example of Introduced Dshtml Tag
<!--
 <auth ds-text="Welcome!">
   <p id="username">Bellie_Coin</p>
    <li><a href="#" id="register">Registration</a></li> 
     <li><a href="#" id="login">Login</a></li>
      </auth>
      -->
    



Example of Introduced SQL


window.onload = function() {
let dbConnection= new DbConnection();
let context = dbConnection.context;
dbConnection.open(function() {
let addQuery="add Name=@1, Age=@2, Address=@3 into Student";
context.executeQuery(addQuery,"SomeoneName",15,"no 12 someone address",(done,error)=>{ alert(error); });
});}
Where the name, age, address are the columns and @number is the value identifier.







Security

•	IPAddress Verification
•	Role Based
• Cross Site Script (XSS)
•	SQL Injection











References
•	Froala Editor
•	Microsoft Cooperation
•	Agility Html Pack


Admin Login Details

•	Username: DordStream
•	Password: Admin32@
 
 Note: You are advise to add your credentials and delete the old credential


Released Version: Version 1.1


Released Date: July 1 2022


Download the zip code and read the full tutorial from DordStream.pdf 
Watch the tutorial on Youtube via our channel http://www.youtube.com/channel/UCpp87MTauAmcEx8M3MvNwqQ