const React = require("react");

class Help extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <h1>
            Alright, time to finish your to-do list, improve your grades, and
            keep up with your workouts! With this tool, you can log your
            progress. Try replacing 'help' with these:
          </h1>
          <ul>
            <h2>Grades Related Routes:</h2>
            <li>'http://localhost:5050/grades'</li>
            <li>'http://localhost:5050/grades/modify'</li>
            <li>'http://localhost:5050/api/grades'</li>
            <li>'http://localhost:5050/api/grades?courseName='</li>
            <li>'http://localhost:5050/api/grades/:courseName'</li>
            <li>'http://localhost:5050/api/grades/seed'</li>
            <br />
            <h2>Tasks Routes:</h2>
            <li>'http://localhost:5050/tasks'</li>
            <li>'http://localhost:5050/tasks/modify'</li>
            <li>'http://localhost:5050/api/tasks'</li>
            <li>'http://localhost:5050/api/tasks?task_number='</li>
            <li>'http://localhost:5050/api/tasks/:task_number'</li>
            <li>'http://localhost:5050/api/tasks/seed'</li>
            <br />
            <h2>Workouts Routes:</h2>
            <li>'http://localhost:5050/workouts'</li>
            <li>'http://localhost:5050/workouts/modify'</li>
            <li>'http://localhost:5050/api/workouts'</li>
            <li>'http://localhost:5050/api/workouts?workout_name='</li>
            <li>'http://localhost:5050/api/workouts/seed'</li>
          </ul>
          <p>
            Completing all daily activities (tasks and workouts) while obtaining
            all passing grades will prompt a special message!
          </p>
        </body>
      </html>
    );
  }
}

module.exports = Help;
