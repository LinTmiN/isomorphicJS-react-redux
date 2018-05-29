import React from 'react'
import {withRouter} from 'react-router-dom'
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if(this.props.location.state&&this.props.location.state.keepTop){return}
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)