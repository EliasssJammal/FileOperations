File Operations has 3 operations it can execute: 

1. Reads a file and returns an error if the process doesn't work, or returns the file contents if the process works.

2. Writes specified content to a file, it will create a file if the file does not already exist,
or replace the file content with the new content if the file does exist.

3. Deletes a specified file or returns an error if the file does not exist.

Server has a route to display a list of all workouts, a POST route to handle the creation of a new workout and adds it to the workouts array, a PUT route to handle an update of a workout based on its ID, and a DELETE route to handle the deletion of a workout based on its ID. Server also has a filtering feature which works by using a query parameter to check for the name and filter the workouts by name if the name is in the query parameters. Another feature Server has is a sorting feature which works by using a query parameter to check for sorting and sort the workouts by name if the value of sort is 'name'. Server has versioning for the APIs and a global error handler.
