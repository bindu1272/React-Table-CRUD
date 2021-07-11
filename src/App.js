import React, { Component } from 'react'
import TableReact from './Components/TableReact/TableReact'
import './Components/Utils/TableStyles.css';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TableReact/>
    )
  }
}

export default App
