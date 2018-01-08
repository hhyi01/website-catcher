import React, { Component } from 'react';

class ShowJobStatus extends Component {
  render() {
    return (
      <div>
        <p>Status of your job:</p>
        <p>{this.props.job_status}</p>
      </div>
    )
  }
}

export default ShowJobStatus;