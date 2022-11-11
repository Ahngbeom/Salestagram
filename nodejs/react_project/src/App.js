// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ProductRegistration from './product/registration';
import ProductList, { getProductList } from './product/list';

function App() {

  

  return (
    <Container className='my-5'>
      {/* <ProductList></ProductList> */}
      <Row>
        <Col>
          <ProductList />
        </Col>
        <Col>
          <ProductRegistration />
        </Col>
      </Row>
    </Container>

  );
}

export default App;
