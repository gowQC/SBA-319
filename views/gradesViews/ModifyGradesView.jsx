const React = require("react");

class ModifyGradesView extends React.Component {
  render() {
    const foundGrades = this.props.foundGrades;

    return (
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <ul>
            {foundGrades.map((grade) => (
              <li>
                {grade.passing ? (
                  <span>
                    {grade.course_name}: Grade of {grade.grade} : Passing{" "}
                  </span>
                ) : (
                  <>
                    <span>
                      {grade.course_name}: Grade of {grade.grade} : Failing{" "}
                    </span>
                  </>
                )}
                <br />
              </li>
            ))}
          </ul>
          <h3>PUT Form - Update existing grade</h3>
          <form action={`/api/grades?_method=PUT`} method="POST">
            <label htmlFor="course_name">Select Current Grade:</label>
            <select type="text" id="course_name_PUT" name="course_name">
              {foundGrades.map((grade) => (
                <option value={grade.course_name}>{grade.course_name}</option>
              ))}
            </select>
            <br />
            <label htmlFor="grade">Input New Grade:</label>
            <input
              type="number"
              name="grade"
              id="grade"
              min={0}
              max={100}
              required
            />
            <br />
            <input type="submit" name="" value="Modify Grade" />
          </form>
          <br />
          <h3>POST Form - Add a new grade</h3>
          <form action={`/api/grades`} method="POST">
            <label htmlFor="course_name">Input Course Name:</label>
            <input
              type="text"
              name="course_name"
              id="course_name_POST"
              required
            />
            <br />
            <label htmlFor="grade">Input Grade:</label>
            <input
              type="number"
              name="grade"
              id="grade"
              min={0}
              max={100}
              required
            />
            <br />
            <input type="submit" name="" value="Add Grade" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ModifyGradesView;
