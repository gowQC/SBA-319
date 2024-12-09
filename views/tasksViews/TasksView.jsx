const React = require("react");

class TasksView extends React.Component {
  render() {
    const propKey = Object.keys(this.props)[1];
    const myArray = this.props[propKey];
    let displayText = true;

    return (
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <ul>
            {myArray.map((task) => (
              <li key={task.task_number}>
                {task.completed ? (
                  <span>{task.description} : True </span>
                ) : (
                  <>
                    {(displayText = false)}
                    <span>{task.description} : False </span>
                  </>
                )}
                <br />
              </li>
            ))}
          </ul>
          <a href="http://localhost:5050/tasks/modify">
            Click here to start modifying data
          </a>
          {myArray.length > 1 && displayText ? (
            <>
              <p>
                Good job! Here's your image of a golden star.
                <br />
              </p>
              <img src="https://i0.wp.com/bookertalk.com/wp-content/uploads/2016/05/gold-star.jpg?ssl=1" />
            </>
          ) : (
            <p>Finish your tasks for an image reward!</p>
          )}
        </body>
      </html>
    );
  }
}

module.exports = TasksView;
