import React, { Component } from 'react';
import $ from 'jquery';
import ShowJobId from './ShowJobId';
import url from 'url';

class InputURL extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: ''
    };
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleSubmitURL = this.handleSubmitURL.bind(this);
    this.sendURL = this.sendURL.bind(this);
    this.validateURL = this.validateURL.bind(this);
  }

  handleChangeURL(event) {
    let address = this.validateURL(event.target.value);
    this.setState({ url: address });
  }

  validateURL(uri) {
    let address = url.parse(uri);
    let formatURL = address.href;
    if (!address.protocol) {
      // for now, assuming missing protocol is https
      formatURL = 'https://' + formatURL;
    }
    return formatURL.toLowerCase();
  }

  handleSubmitURL(event) {
    this.sendURL();
    event.preventDefault();
    event.target.reset();
  }

  sendURL() {
    const address = this.state.url;
    console.log(address, 'was sent');
    $.ajax({
      url: 'http://localhost:8080/url',
      type: 'POST',
      data: JSON.stringify({ url: address }),
      contentType: 'application/JSON',
      success: data => {
        console.log('url sent, from post req', data);
        this.setState({ job_id: data })
      },
      error: data => {
        console.log('failed to send', data);
        this.setState({ job_id: 'Something went wrong. Please try again later.' })
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitURL}>
      <br />
        <label>
          Enter URL:
          <input type="text" url={this.state.url} onChange={this.handleChangeURL} />
        </label>
        <input type="submit" url="Submit" />
          <ShowJobId job_id={this.state.job_id} />
      </form>
    )
  }
}

export default InputURL;

