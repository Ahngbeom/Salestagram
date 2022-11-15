import { useState, useEffect } from 'react';

import axios from 'axios';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import ProductModify from './modify';
import ProductRemove from './remove';

async function getProductList({ setProducts }) {
	const response = await axios.get('/product/list')
		.then(function (response) {
			setProducts(response.data);
			return response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
	return response;
}

function ProductList({ productList, setProductList }) {

	return (
		<ListGroup as="ol">
			{productList.map((item) => (
				<ListGroup.Item key={item.id} as="li" action="true" id={item.id}>
					<div className='d-flex justify-content-between align-items-start'>
						<div className="ms-2 me-auto">
							<Badge bg="secondary" pill>
								{item.id}
							</Badge>
							<div className="fw-bold">{item.name}</div>
							{item.details}
						</div>
						<Badge bg="primary" pill>
							?
						</Badge>
					</div>
					<div className='d-flex justify-content-end align-items-start gx-5'>
						<button type='button' className='btn btn-warning mx-1' 
							onClick={ProductModify}>
							수정
						</button>
						<Button className='mx-1' variant="danger"
							onClick={() => {
								ProductRemove(item.id);
								setProductList(productList.filter(product => product.id !== item.id))
							}}>삭제</Button>
					</div>
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}

export { ProductList as default, getProductList };