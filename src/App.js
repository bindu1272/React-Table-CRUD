import React, { Component } from 'react'
import ReactTable from 'react-table'
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
}
const fakeData = [
  { name: 'name1', age: 50, address: 'address1' },
  { name: 'name2', age: 20, address: 'address2' },
  { name: 'name3', age: 70, address: 'address3' }
]
const columns = [
	{
        Header: 'Name',
        accessor: 'name',
        show: true
      },
      {
        Header: 'Age',
        accessor: 'age',
        show: true
      },
      {
        Header: 'Address',
        accessor: 'address',
        show: true
      },
]
function App(){
    return (
      <div>
        <ReactTable data={fakeData} minRows={0} columns={columns} />
      </div>
    )
}
export default App
