# SBA-319

This project is a derivative of my SBA-318. Branching off the original work, this project still allows for the querying and manipulation of data, except the data is received from a MongoDB collection and retrieved as documents using Mongoose. Various HTTP methods are supported as found in the my prior SBA-318. Below will be some documentation on how the URL structure should look in a browser (assuming it is run locally on a desktop) and what options the route will provide for its user. Respecting the original SBA's design. the first piece of custom middleware will time the user to complete workouts and tasks on the to-do list within a certain amount of time (the code uses five minutes, but in a real world application we can make the difference 24 hours to simulate a daily routine). The second piece of custom middleware not only logs what HTTP method is occuring and where within the routes it is happening, but also checks for the passing of all grades documents and completion of both tasks and workouts documents.

# Default Routes

- http://localhost:5050

Default page that will suggest that the user appends '/help' to the end of the URL to get to the next page.

- http://localhost:5050/help

This page presents all the options available for the user to navigate through.

# Grades Related Routes

- http://localhost:5050/grades

* Shows user the current data of the 'grades' collection in a rendered view
* Presents a navigational link that directs towards 'http://localhost:5050/grades/modify'
* Supports GET requests

- http://localhost:5050/grades/modify

* Displays small form underneath the current data of the 'grades' collection
* Form allows for either the addition of a new grade or the modification of an already existing grade, then redirects the user to the render of the http://localhost:5050/grades page containing only the modified data as an li element
* Supports GET requests

- http://localhost:5050/api/grades

* Shows user the current data of the 'grades' collection as an array of objects
* Supports GET, POST, and PUT requests
* GET method allows for ?courseName={string} query, searching through the course_name field of documents

- http://localhost:5050/api/grades/:courseName

* Shows the user the data requested through the use of the 'courseName' request parameter, sourced from the 'grades' collection as an object
* Supports GET requests

- http://localhost:5050/api/grades/seed

* Used to initialize the data of the 'grades' collection
* Supports GET requests

# Tasks Related Routes

- http://localhost:5050/tasks

* Shows user the current data of the 'tasks' collection in a rendered view
* Presents a navigational link that directs towards 'http://localhost:5050/tasks/modify'
* Supports GET requests

- http://localhost:5050/tasks/modify

* Displays small form underneath the current data of the 'tasks' collection
* Form allows for the modification of the preset tasks, then redirects the user to the render of the http://localhost:5050/tasks page containing only the modified data as an li element
* Supports GET requests

- http://localhost:5050/api/tasks

* Shows user the current data of the 'tasks' collection as an array of objects
* Supports GET and PUT requests
* GET method allows for ?task_number={number} query, searching through the task_number field of documents

- http://localhost:5050/api/tasks/:task_number

* Shows the user the data requested through the use of the 'task_number' request parameter, sourced from the 'tasks' collection as an object
* Supports GET requests

- http://localhost:5050/api/tasks/seed

* Used to initialize the data of the 'tasks' collection
* Supports GET requests

# Workouts Related Routes

- http://localhost:5050/workouts

* Shows user the current data of the 'workouts' collection in a rendered view
* Presents a navigational link that directs towards 'http://localhost:5050/workouts/modify'
* Supports GET requests

- http://localhost:5050/workouts/modify

* Displays small form underneath the current data of the 'workouts' collection
* Form allows for the addition of a new workout, the modification of an already existing workout, or the deletion of an existing workout, then redirects the user to the render of the http://localhost:5050/workouts page
* Supports GET requests

- http://localhost:5050/api/workouts

* Shows user the current data of the 'workouts' collection as an array of objects
* Supports GET, POST, PUT, and DELETE requests
* GET method allows for ?workout_name={string} query, searching through the workout_name field of documents

- http://localhost:5050/api/workouts/seed

* Used to initialize the data of the 'workouts' collection
* Supports GET requests
