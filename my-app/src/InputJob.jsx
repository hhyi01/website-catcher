import React, { Component } from 'react';
import $ from 'jquery';
import ShowJobStatus from './ShowJobStatus';

class InputJob extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      job_id: '',
      job_status: '',
      html: ''
    };
    this.handleChangeJob = this.handleChangeJob.bind(this);
    this.handleSubmitJob = this.handleSubmitJob.bind(this);
    this.sendJob = this.sendJob.bind(this);
  }

  handleChangeJob(event) {
    this.setState({ job_id: event.target.value });
  }

  handleSubmitJob(event) {
    this.sendJob();
    event.preventDefault();
    event.target.reset();
  }

  sendJob() {
    const jobID = this.state.job_id;
    console.log(jobID, 'was sent');
    $.ajax({
      url: 'http://localhost:8080/jobStatus',
      type: 'POST',
      data: JSON.stringify({ job_id: jobID }),
      contentType: 'application/JSON',
      success: data => {
        console.log('job sent, from post req', data[0].html);
        if (data.length > 0) {
          this.setState({ job_status: data[0].job_status,
            html: data[0].html
          });
        } else {
          this.setState({ job_status: 'We don\'t have that job. Could you add the url?' })
        }
      },
      error: data => {
        console.log('failed to send job', data);
        this.setState({ job_status: 'Something went wrong. Please try again later.' })
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitJob}>
        <label>
          Enter Job ID:
          <input type="text" job_id={this.state.job_id} onChange={this.handleChangeJob} />
        </label>
        <input type="submit" url="Submit" />
          <ShowJobStatus job_status={this.state.job_status} html={this.state.html} />
      </form>
    )
  }
}

export default InputJob;

