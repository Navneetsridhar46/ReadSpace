import React from 'react'
import Table from 'react-bootstrap/Table';

function BookList() {
  return (
    <div className='container-fluid'>
      <h2 className='text-center mt-3'>Book List</h2>
      <div className='d-flex justify-content-center'>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        </Table>
      </div>
    </div>
  )
}

export default BookList