// import logo from './logo.svg';
import './App.css';

import {useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductRegistration from './product/registration';
import ProductList from './product/list';



function App() {

  console.log("Rendering...");
  
  let [Products, setProducts] = useState([]);

	useEffect(() => {
		axios.get('/product/list')
			.then(function (response) {
				console.log(response.data);
				setProducts(response.data);
			})
			.catch(function (error) {
				console.error(error);
				setProducts([]);
			});
	}, []);


  return (
    <Container className='my-5'>
      <Row>
        <Col>
          <ProductList productList={Products} setProductList={setProducts}/>
        </Col>
        <Col>
          <ProductRegistration  productList={Products} setProductList={setProducts}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
