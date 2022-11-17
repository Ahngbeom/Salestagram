import { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ProductRegistration({ productList, setProductList }) {

  let [ProductInputs, setProductInputs] = useState({
    name: '',
    details: ''
  });

  const { name, details } = ProductInputs;

  function onProductRegisterChange(e) {
    const { value, name } = e.target;
    setProductInputs({
      ...ProductInputs, [name]: value
    });
  }

  function onProductRegistration(e) {
    console.log(ProductInputs);

    axios.post('/product/registration', ProductInputs)
      .then(function (response) {
        console.log(response.data);
        setProductList([response.data, ...productList]);
      });

    setProductInputs({
      name: '',
      details: ''
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control onChange={onProductRegisterChange} type="text" name='name' value={name} placeholder="Enter product name" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Details</Form.Label>
        <Form.Control onChange={onProductRegisterChange}
          as="textarea" name='details' value={details}
          placeholder="Enter product details"
          style={{ height: '100px' }}
        />
      </Form.Group>
      <Button variant="primary" type="button" onClick={onProductRegistration}>
        Submit
      </Button>
    </Form>
  );
}

export default ProductRegistration;