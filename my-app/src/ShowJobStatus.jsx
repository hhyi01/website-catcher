import React from 'react';

const ShowJobStatus = (props) => (
  <div>
    <p>Status of your job:</p>
    <p>{props.job_status}</p>
  </div>
)

export default ShowJobStatus;