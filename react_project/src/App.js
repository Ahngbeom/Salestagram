
import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductRegistration from './product/registration';
import ProductList from './product/list';

function reducer(state, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

function ProductViewsCounter() {
	const [views, dispatch] = useReducer(reducer, 0);

	const onIncrease = () => {
		dispatch({ type: 'INCREMENT' });
	}
	const onDecrease = () => {
		dispatch({ type: 'DECREMENT' });
	}
	return (
		<div>
			<h1>{views}</h1>
			<button onClick={onDecrease}>-1</button>
			<button onClick={onIncrease}>+1</button>
		</div>
	);
}

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
					<ProductList productList={Products} setProductList={setProducts} />
				</Col>
				<Col>
					<ProductRegistration productList={Products} setProductList={setProducts} />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
