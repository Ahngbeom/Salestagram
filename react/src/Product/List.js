import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function ProductListCard() {
	let [상품명, 상품변경] = useState([
	  { Name: 'A', Details: "AAAAA"},
	  { Name: 'B', Details: "BBBBB"},
	  { Name: 'C', Details: "CCCCC"},
	  { Name: 'D', Details: "DDDDD"},
	]);
  
	return (
	  <Row xs={1} md={4} className="g-4">
		{상품명.map((product, index) => (
		  <Col key={index}>
			<Card>
			  <Card.Img variant="top" src="" />
			  <Card.Body>
				<Card.Title>
				  {product.Name}
				</Card.Title>
				<Card.Text>
				  {product.Details}
				</Card.Text>
			  </Card.Body>
			  {/* <Card.Footer>
				<span className=' ' onClick={() => { }}>👍 {product.Like}</span>
			  </Card.Footer> */}
			</Card>
		  </Col>
		))}
	  </Row>
	)
  }

export default ProductListCard;
