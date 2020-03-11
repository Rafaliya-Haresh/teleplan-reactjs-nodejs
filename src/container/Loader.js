import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <span>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;
      </span>
    );
  }
}

export default Loader;

