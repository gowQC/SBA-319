# SBA-319

This project is a derivative of my SBA-318. Branching off the original work, this project still allows for the querying and manipulation of data, except the data is received from a MongoDB collection and retrieved as documents using Mongoose. Various HTTP methods are supported as found in the my prior SBA-318. Below will be some documentation on how the URL structure should look in a browser (assuming it is run locally on a desktop) and what options the route will provide for its user. Respecting the original SBA's design. the first piece of custom middleware will time the user to complete workouts and tasks on the to-do list within a certain amount of time (the code uses five minutes, but in a real world application we can make the difference 24 hours to simulate a daily routine). The second piece of custom middleware not only logs what HTTP method is occuring and where within the routes it is happening, but also checks for the passing of all grades documents and completion of both tasks and workouts documents.

# Default Routes

- http://localhost:5050

Default page that will suggest that the user appends '/help' to the end of the URL to get to the next page.

- http://localhost:5050/help

This page presents all the options available for the user to navigate through.

# Grades Related Routes

- http://localhost:3000/grades

* Shows user the current data of the 'grades' collection in a rendered view
* Presents a navigational link that directs towards 'http://localhost:3000/grades/modify'
* Supports GET requests

- http://localhost:3000/grades/modify

* Displays small form underneath the current data of the 'grades' collection
* Form allows for either the addition of a new grade or the modification of an already existing grade, then redirects the user to the render of the http://localhost:3000/grades page containing only the modified data as an li element
* Supports GET requests

- http://localhost:5050/api/grades

* Shows user the current data of the 'grades' collection as an array of objects
* Supports GET, POST, and PUT methods
* GET methods allow for ?courseName={string} query, searching through course_name field of documents

- http://localhost:5050/api/grades/:courseName

* Shows the user the data rquested through the use of the 'courseName' request parameter, sourced from the 'grades' collection as an object
* Supports GET methods

- http://localhost:5050/api/grades/seed

* Used to initialize the data of the 'grades' collection

# Tasks Related Routes

# Workouts Related Routes
