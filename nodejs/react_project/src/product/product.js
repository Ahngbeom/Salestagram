import { useState, useEffect } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

async function getProductList() {
	const response = await axios.get('/product/list');
	return response.data;
}

function ProductList() {

	// getProductList().then(result => console.log(result));
	// getProductList().then(result => console.log(result));

	let [Product, setProduct] = useState([]);

	useEffect(() => {
		// setProduct(getProductList());

		axios.get('/product/list')
			.then(function (response) {
				setProduct(response.data);
				console.log(Product);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	return (
		<ListGroup as="ol">
			{/* {Product.map((item) => (
				<ListGroup.Item key={item.id} as="li" action="true" id={item.id}>
					<div className='d-flex justify-content-between align-items-start'>
						<div className="ms-2 me-auto">
							<div className="fw-bold">{item.name}</div>
							{item.details}
						</div>
						<Badge bg="primary" pill>
							?
						</Badge>
					</div>
					<div className='d-flex justify-content-end align-items-start gx-5'>
						<button type='button' className='btn btn-warning mx-1'>수정</button>
						<Button className='mx-1' variant="danger" onClick={ProductRemove}>삭제</Button>
					</div>
				</ListGroup.Item>
			))} */}
		</ListGroup>
	)
}

function ProductRemove(e) {
	console.log(e.target.parentElement.parentElement.id);
}

export default ProductList;