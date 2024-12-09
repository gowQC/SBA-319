const React = require("react");

class ModifyTasksView extends React.Component {
  render() {
    const foundTasks = this.props.foundTasks;

    return (
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <ul>
            {foundTasks.map((task) => (
              <li key={task.task_number}>
                {task.completed ? (
                  <span>{task.description} : True </span>
                ) : (
                  <>
                    <span>{task.description} : False </span>
                  </>
                )}
                <br />
              </li>
            ))}
          </ul>
          <form action={`/api/tasks?_method=PUT`} method="POST">
            <label htmlFor="task_number">Select Task:</label>
            <select type="text" id="task_number" name="task_number">
              <option value={0}>Walk the dog</option>
              <option value={1}>Go shopping</option>
              <option value={2}>Clean the house</option>
              <option value={3}>Start dinner</option>
              <option value={4}>Finish assignments</option>
            </select>
            <br />
            <label htmlFor="completed">Check if Task is Complete:</label>
            <input type="checkbox" id="completed" name="completed" /> <br />
            <input type="submit" name="" value="Modify Task" />
          </form>
          <br />
          <a href="http://localhost:5050/tasks">
            Click here to go back to standard tasks view.
          </a>
        </body>
      </html>
    );
  }
}

module.exports = ModifyTasksView;
