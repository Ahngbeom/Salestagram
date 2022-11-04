import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ProductRegisterForm() {

	const [Product, setFormValue] = useState({
		product_name: '',
		product_details: ''
	});

	const handleSubmit = () => {
		// store the states in the form data
		// const formData = new FormData();
		// formData.append("product_name", formValue.product_name);
		// formData.append("product_details", formValue.product_details);

		// make axios post request
		axios.post("http://localhost:8080/product/registration", {
			Product
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	const handleChange = (event) => {
		setFormValue({
			...Product,
			[event.target.name]: event.target.value
		});

		console.log(Product);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Product Name</Form.Label>
				<Form.Control type="text" name="product_name" value={Product.product_name} onChange={handleChange} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Product Details</Form.Label>
				<Form.Control as="textarea" rows={3} name="product_details" value={Product.product_details} onChange={handleChange} />
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export { ProductRegisterForm };