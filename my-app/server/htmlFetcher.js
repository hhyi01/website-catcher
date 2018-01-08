const rp = require('request-promise');
const db = require('../db/index');
const cron = require('node-cron');

// find first unfinished job in queue and fetch html
const getCreatedUnfinishedJob = () => {
  let job;
  db.getFirstUnfinishedJob('created')
  .then(results => {
    if (results.length > 0) {
      job = results[0];
      // results[0] keys: job_id, user_agent, url
      // call updateJobStatus(status, job_id) to 'in progress'
      db.updateJobStatus('in progress', job.job_id)
      .then(() => {
        // call fetchHtml here
        fetchHtml(job);
      })
    } else {
      console.log('No jobs to run right now.');
    }
  })
  .catch(err => {
    console.error(err);
    return err;
  })
}

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  getCreatedUnfinishedJob();
});

// find job in queue that has been in progress for more than 2 minutes
const getInProgressUnfinishedJob = () => {
  let job;
  db.getFirstUnfinishedJob('in progress')
  .then(results => {
    job = results[0];
    // then call fetchHtml here
    fetchHtml(job);
  })
  .catch(err => {
    console.error(err);
    // call db.jobFailed(job_id)
    return err;
  })
}

// cron.schedule('*/2 * * * *', function(){
//   console.log('running a task every two minutes');
  
// });

const fetchHtml = ({job_id, userAgent, url}) => {
  // set up request for url
  // grab user-agent info and add to header request
  // to make request on user's behalf
  let options = {
    method: 'GET',
    uri: url,
    headers: {
      'User-Agent': userAgent
    },
    resolveWithFullResponse: true 
  };
  let mimeType;
  let html;
  rp(options)
  .then(response => {
    mimeType = response.headers['content-type'];
    html = response.body;
      db.jobComplete(job_id, html, mimeType) 
      .then(results => console.log(results))
      .catch(err => console.log(err))
  })
  .catch(err => {
    console.log('crawling failed');
    db.jobFailed(job_id)
  })
};

module.exports = {
  fetchHtml,
  getCreatedUnfinishedJob,
  getInProgressUnfinishedJob
}