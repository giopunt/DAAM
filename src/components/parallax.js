import React, { Component } from "react"
import Rellax from "rellax"

class Parallax extends Component {

  componentDidMount() {
    new Rellax(this.rellaxRef)
  }

  render() {
    return(
      <div 
        ref={ref => { this.rellaxRef = ref}}
        {
          ...this.props
        }
      >
        {this.props.children}
      </div>
    )
  }
}

export default Parallax