                                   
                              ABSTRACT
This research titled ‘Dord Stream’ aims to show the alternative procedure and of course a newly developed simple process for front-end developer to work as full-stack developer. This research has been worked on in order to make what has been seemingly difficult easy. Therefore, this research has been able to develop html-like tag (dshtml) and SQL query (Javascript) that can help front-end developer create a web application through the software. Arguably, the creation, building and development of web application is a taxing exercise. However, this research introduces another less-difficult procedure in the creation of web application. 






Aims and Objectives
This section explicates the aims and objective of the research which is to make or allow front-end developer to work as full-stack developer.






Methodology
This section expounds the methodology deployed in the creation of the software.

1.	Development of Content Management System (CMS) Software (DordStream).
2.	Introduction of DordStream Html (Dshtml) on the CMS.
3.	Introduction of Structured Query language (SQL) on the CMS




Results / Findings
This section shows the result and /or findings of the research.
1.	That a software that can be used to develop desire web application








Introduction to DordStream
Dordstream is a free and open source content management system software written in Asp.net and paired with MSSQL server.
DordSream is a CMS designed software which also server as translator i.e. translate Dshtml
DordStream is a Template based CMS software which the website or web application has to be developed in the template design structure and installed for usage.
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






DordStream Html Tag (dshtml tag)
Dshtml tag is a set of custom tag that extend the function of html through the CMS. It is also html-like that is used to perform some tasks within the CMS and displayed, formatted the same as html content on web browser. It has the same syntax as html 
Dshtml element can only be written as a child tag to html. i.e. it must be written inside html element.
Dshtml attributes can be written with dshtml element and html element.
Dshtml parameters can only be written inside dshtml element.
NOTE, Dshtml tag depend on dshtml attribute or dshtml parameter to perform the task.
These are the dshtml tags

1.	AudioList (audiolist) 
 Audio List is a dshtml tag which is used with audio html tag in order to get or display the audio files. Audio files can be retrieved with the dshtml parameters.
It is also case sensitive (lower case). 
It can be written as <audiolist> children element </audiolist>
Attributes:  Artist(ds-artist), Album(ds-album), Count(ds-count), Widget(widget), Index(ds-index), Name(ds-name), Description(ds-description).
Parameters: Title, Name, Src, Link, Artist, Album, ReleaseDate, Date, Size, FirstLetter, Time

Code example
The snippet code retrieved 30 davido’s audio files from the album named One mill and display on web browser.

<audiolist ds-artist="davido" ds-album="One Mill" ds-count="30" ds-name="Video List" ds-description="Audio List">
<audio controls id="video">
<source src="#" id="src">
</audio>
</audiolist>





SQL Queries and Examples


Creating of table, Columns and Adding values Query
The query below creates a table with the columns and insert the rows/values, if the table is not existing in the database otherwise, it will insert the rows/values.
Add Column1=Value1, Column2=Value2, Column3=Value3 Into TableName.
Note: the keywords are not case sensitive. i.e. it can be written Lowercase, Uppercase and Capitalize.
Example
The snippet code below creates student table with their name, age, address and insert their values if student table is not existing in the database otherwise, it will insert their values.
window.onload = function() {
let dbConnection= new DbConnection();
let context = dbConnection.context;
dbConnection.open(function() {
let addQuery=”add Name=@1, Age=@2, Address=@3 into Student”;
context.executeQuery(addQuery,”SomeoneName”,15,”no 12 someone address”,(done,error)=>{ alert(error); });
});}
Where the name, age, address are the columns and @number is the value identifier.


Download the zip code and read the full tutorial from DordStream.pdf 
Watch the tutorial on Youtube via our channel http://www.youtube.com/channel/UCpp87MTauAmcEx8M3MvNwqQ