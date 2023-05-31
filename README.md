 DORDSTREAM (WEB MADE EASY) (Web Framework)
DordStream is a software development tools that provide set of tools, Modules and Application to support the development of website and web application.It provides a simple way and alternative method of creating or developing a web application. DordStream is a Cross-Platform and Open Source Software.


DordStream provides two mode of Development

1.  Website : DordStream will allow you to create a website from scratch without writing any backend code. just Html and CSS. such as blog and website
2. Web Application : DordStream will allow you to create or develop a web application with basic knowledge in C#. such as web software. e.g Amazon, Facebook, Attendance Sheet and so on


Benefits of Using DordStream

1. Faster development: It provides developers with pre-built components and modules that can be used to quickly build and deploy web application.
2. Code organization: It follows a structured approach to development, which helps in organizing code in a more readable and maintainable manner.
3. Scalability: It allows developers to build application that can scale easily with the increasing user base.
4. Security: It provides built-in security features such as input validation, CSRF protection, password hashing and run on secure protocol.
5. Extension: It provides extension point that allow developers or non-developers to add new functionality to the web application.
6. Community support: It have large and active communities that provide support, resources and updates to the developers. This make it easier for developers to get help and stay up-to-date with the latest developments in the field.




Features of DordStream

1. Model-View-Controller (MVC)
2. Routing
3. Templating
4. Database Integration
5. Security features
6. Content creation and editing
7. Content storage and organization
8. Content publishing
9. User Management 


Code Samples

1. Example of Database Integration. The following codes check if the table exist in database, if not it will create a new table and use the data from user to determine the suitable datatype for the column.(C#) 

```c#
//using add Ds-Sql to command the database table
string addQuery = "add Name=@1, Age=@2 into TableName";
//using DbValue to store the data
DbValue value = new DbValue();
value.Add("DordStream Student");
value.Add(15);
//calling IDbCommand interface which has be initialized in the Constructor
//using ExecuteQuery to execute the command in the database
//Create the database table if not exist
await command.ExecuteQueryAsync(addQuery,value);

```
2. The following codes upload files to the server (Javascript)

```javascript
var fileSystem = new FileSystem("formId");

function upload()
{
fileSystem.upload((response)=>{

alert(response);

},(progress)=>{});

}
```

3. The following code retrieve and display the recent posts on the website using recentposts tag.(Html)
```htm
<ul id="slider3">
<recentposts ds-count="8" ds-title-length="30" ds-content-length="50" id="callbacks1_s0">

                                <li id="li065">
                                    <div class="banner-info-slider" id="div0736">
                                        <ul id="ul0989">
                                            <li id="li0415"><a href="#" ds-name="1" id="a0988">Blogger</a></li>
                                            <li ds-date="1" id="li0578">30th August 2021</li>
                                        </ul>
                                        <h3 ds-title="1" id="h30898">Stress Full Business Man</h3>
                                        <p id="p0549"><span ds-content="1" id="span0316">Lorem ipsum dolor
                                            symptoms can include.</span>
                                    
                                    
                                        <span id="span0183">By <i ds-author="1" id="i0728">ullamcoman</i></span>
                                    </p>
                                        
                                        <div class="more" id="div0236">
                                            <a href="#" ds-link="1" class="type-1" id="a0944">
                                                <span id="span0798"> Read More </span>
                                                <span id="span0859"> Read More </span>
                                            </a>
                                        </div>
                                    </div>
                                </li>

                            </recentposts>
							
						</ul>
```

4. The following code create a search form and allow user to search and display the content on the website (Html)

```htm
<div id="cd-search" class="cd-search">
 <form action="#" method="post" ds-action="search" ds-name="My Seacrh Name" ds-description="Search Form">
                            <input name="Search" type="search" placeholder="search site" ds-title="1">
                        </form>
				
				</div>

```





Author Mobile: +2347013943034, +2348086977523, +2347031928980

Author Whatsapp: +2347013943034

Author Mail: barccomet04@gmail.com

Youtube Channel : http://www.youtube.com/channel/UCpp87MTauAmcEx8M3MvNwqQ 

Author Facebook: https://www.facebook.com/profile.php?id=100003468655180
