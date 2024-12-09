const React = require("react");

class WorkoutsView extends React.Component {
  render() {
    const propKey = Object.keys(this.props)[1];
    const myArray = this.props[propKey];
    let completedWorkouts = true;

    return (
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <ul>
            {myArray.map((workout) => (
              <li>
                {workout.completed ? (
                  <span>
                    {workout.workout_name}: Currently completed{" "}
                    {workout.currently_completed} reps : Current Best of{" "}
                    {workout.current_best} reps : Completed{" "}
                  </span>
                ) : (
                  <>
                    {(completedWorkouts = false)}
                    <span>
                      {workout.workout_name}: Currently completed{" "}
                      {workout.currently_completed} reps : Current Best of{" "}
                      {workout.current_best} reps : Incomplete{" "}
                    </span>
                  </>
                )}
                <br />
              </li>
            ))}
          </ul>
          <br />
          {myArray.length == 1 ? (
            <>
              <a href="http://localhost:5050/workouts">
                Click here to view all workouts.
              </a>
              <a href="http://localhost:5050/workouts/modify">
                Click here to modify all workouts.
              </a>
            </>
          ) : myArray.length <= 0 ? (
            <>
              <div>
                Either no workouts match the given query or... there are no
                workouts!
              </div>
              <a href="http://localhost:5050/workouts">
                Click here to view all grades.
              </a>
              <a href="http://localhost:5050/workouts/modify">
                Click here to modify all workouts.
              </a>
            </>
          ) : (
            <>
              {completedWorkouts ? (
                <h3>Good job finishing your workouts today!</h3>
              ) : (
                <h4>
                  Here are your workouts you need to finish today. You can do
                  it!
                </h4>
              )}
              <a href="http://localhost:5050/workouts/modify">
                Click here to start modifying data
              </a>
            </>
          )}
        </body>
      </html>
    );
  }
}

module.exports = WorkoutsView;
