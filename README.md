### Application creates a job queue whose workers fetch data from a URL and store the results in a database. The job queue exposes a REST API for adding jobs and checking their status / results.

### Example:

User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com.

#### Setup:
* from inside 'my-app' directory
* npm install
* npm start
* npm run server
* mysql -u root -p < schema.sql

#### Usage:
* Enter URL (e.g. www.google.com) and click submit, returns a job ID for lookup
* Enter Job ID and click submit to check up on a job's status and results
