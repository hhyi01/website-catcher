import React, { Component } from 'react';
import JobResults from './JobResults';

class ShowJobStatus extends Component {
  render() {
    return (
      <div>
        <p>Status of your job:</p>
        <p>{this.props.job_status}</p>
        <JobResults html={this.props.html} />
      </div>
    )
  }
}

export default ShowJobStatus;