const mysql = require('mysql');
const Promise = require('bluebird');

const urls = mysql.createConnection({
  host     : process.env.DBSERVER || 'localhost',
  user     : process.env.DBUSER || 'root',
  password : process.env.DBPASSWORD || '',
  database : process.env.DBNAME || 'siteData'
});

const connection = Promise.promisifyAll(urls);

const addJob = (url, userAgent) => {
  return connection.queryAsync(`insert into jobs set url = ?, user_agent = ?`, [url, userAgent])
  .then(results => results.insertId)
  .catch(err => {
    console.error(err);
    return err;
  })
}

const getFirstUnfinishedJob = job_status => {
  return connection.queryAsync(`select job_id, user_agent, url, job_created, last_updated from jobs \
    where job_status = ? order by job_id limit 1`, [job_status])
  .then(results => results)
  .catch(err => {
    console.error(err);
    return err;
  })
}

const getJobStatus = ({job_id}) => {
  return connection.queryAsync(`select job_status, mime_type, html from jobs where job_id = ?`, [`${job_id}`])
  .then(results => results)
  .catch(err => {
    console.error(err);
    return err;
  })
}

const updateJobStatus = (status, job_id) => {
  return connection.queryAsync(`update jobs set job_status = ? where job_id = ?`, [status, job_id])
  .then(results => results)
  .catch(err => {
    console.error(err);
    return err;
  })
}

const jobFailed = job_id => {
  return connection.queryAsync(`update jobs set job_status = 'failed' where job_id = ?`, [job_id])
  .then(results => results)
  .catch(err => {
    console.error(err);
    return err;
  })
}

const jobComplete = (job_id, html, mimeType) => {
  return connection.queryAsync(`update jobs set job_status = 'complete', html = ?, mime_type = ? \
    where job_id = ?`, [html, mimeType, job_id])
  .then(results => results)
  .catch(err => {
    console.error(err);
    return err;
  })
}

const checkURLExists = (url) => {
  return connection.queryAsync(`select job_id from jobs where url like ?`, ['%' + url + '%'])
  .then(results => results)
  .catch(err => {
    console.error(err);
    return err;
  })
}

module.exports = {
  addJob,
  getJobStatus,
  jobFailed,
  updateJobStatus,
  getFirstUnfinishedJob,
  jobComplete,
  checkURLExists
}