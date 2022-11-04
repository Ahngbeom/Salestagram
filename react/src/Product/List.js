import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

function ProductList() {

	axios.get('http://localhost:8080/product/list')
		.then(function (response) {
			console.log(response);
			return response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
}

function ProductListCard() {
	let [상품명, 상품변경] = useState([]);

	// const product_list = ProductList();
	// console.log(product_list);

	useEffect(() => {
		axios.get('http://localhost:8080/product/list')
			.then(function (response) {
				console.log(response.data);
				상품변경(response.data);
				console.log(상품명);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	console.log(상품명);

	return (
		<Row xs={1} md={4} className="g-4">
			{상품명.map((product, index) => (
				<Col key={index}>
					<Card>
						<Card.Img variant="top" src="" />
						<Card.Body>
							<Card.Title>
								{product.product_name}
							</Card.Title>
							<Card.Text>
								{product.product_details}
							</Card.Text>
						</Card.Body>
						{/* <Card.Footer>
				<span className=' ' onClick={() => { }}>👍 {product.Like}</span>
			  </Card.Footer> */}
					</Card>
				</Col>
			))}
		</Row>
	);
}

export default ProductListCard;
