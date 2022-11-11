import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ProductRegistration() {
	return (
		<Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name='name' placeholder="Enter product name" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Details</Form.Label>
              <Form.Control
                as="textarea" name='details'
                placeholder="Enter product details"
                style={{ height: '100px' }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
	);
}

export default ProductRegistration;