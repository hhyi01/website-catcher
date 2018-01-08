const Express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index');
const Promise = require('bluebird');
const hf = require('./htmlFetcher');
const url = require('url');
const utf8 = require('utf8');
const { StringDecoder } = require('string_decoder');
Promise.promisifyAll(hf);

const app = Express();

app.use(bodyParser.json());

app.post('/url', (req, res) => {
  // add url to job queue
  const ua = req.headers['user-agent'];
  const url = req.body.url;
  db.checkURLExists(url)
  .then(result => {
    if (result.length > 0) {
      res.status(201).json(result[0].job_id);
    } else {
      db.addJob(url, ua)
      .then(result => {
        res.status(201).json(result);
      })
    }
  })
  .catch(error => {
    res.status(400).json(error);
  })
});

app.post('/jobStatus', (req, res) => {
  // lookup job_id
  db.getJobStatus(req.body)
  .then(result => {
    if (result.length > 0) {
      if (result[0].job_status === 'complete' && result[0].mime_type.includes('text/html')) {
        const decoder = new StringDecoder('utf8');
        result[0].html = decoder.end(Buffer.from(result[0].html));
      }
    }
    res.status(201).json(result);
  })
  .catch(error => {
    res.status(400).json(error);
  })
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Listening on Port 8080!');
});