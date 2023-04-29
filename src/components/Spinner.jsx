import React, { Component } from 'react'
// import loading from './loading.gif'

class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        {/* <img src={loading} alt="loading" /> */}
        <h4>LOADING......</h4>
      </div>
    )
  }
}

export default Spinner