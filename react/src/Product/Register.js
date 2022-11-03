import Accordion from 'react-bootstrap/Accordion';
import { Button, Form } from 'react-bootstrap';
function ProductRegister() {
	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>상품 등록</Accordion.Header>
				<Accordion.Body>
					<ProductRegisterForm />
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

function ProductRegisterForm() {
	return (
		<Form>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Product Name</Form.Label>
				<Form.Control type="text" placeholder="name@example.com" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Product Details</Form.Label>
				<Form.Control as="textarea" rows={3} />
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	)
}

export default ProductRegister;