const Express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index');
const Promise = require('bluebird');
const hf = require('./htmlFetcher');
const url = require('url');
Promise.promisifyAll(hf);

const app = Express();

app.use(bodyParser.json());

app.post('/url', (req, res) => {
  // add url to job queue
  const ua = req.headers['user-agent'];
  const url = req.body.url;
  console.log(ua, url);
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
    console.log(error);
    res.status(400).json(error);
  })
});

app.post('/jobStatus', (req, res) => {
  console.log(req.body);
  // lookup job_id
  db.getJobStatus(req.body)
  .then(result => {
    res.status(201).json(result);
  })
  .catch(error => {
    console.log(error);
    res.status(400).json(error);
  })
});

// test endpoint
app.post('/getHtml', (req, res) => {
  var host = url.parse(req.body.url).host;
  console.log(host);
  db.checkURLExists(host)
  .then(result => {
    console.log('api ', result);
    // hf.fetchHtml(result[0])

    res.status(201).json(result);
  })
  .catch(error => {
    console.log(error);
    res.status(400).json(error);
  })
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Listening on Port 8080!');
});