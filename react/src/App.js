/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from 'react';
import './App.css';
import { ProductRegisterForm } from './Product/Register'
import ProductListCard from './Product/List'
import { Button, Container } from 'react-bootstrap';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

class Salestagram extends React.Component {
  render() {
    return (
      <div className="App">
        <div className='black-nav'>
          <img src="https://img.icons8.com/nolan/32/gift.png" />
          <span style={{ padding: '10px' }}>
            Salestagram
          </span>
        </div>
        <Container className='App-header'>
          {this.props.children}
        </Container>
      </div>
    );
  }
}


function App() {
  return (
    <Salestagram>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/registration" element={<ProductRegisterForm />} />
        </Routes>
      </BrowserRouter>
    </Salestagram>
  );
}

function Main() {
  return (
    <>
      <Link to="/product/registration">
        <Button variant="primary">
          상품 등록
        </Button>
      </Link>
      <ProductListCard />
    </>
  );
}

export { App as default, Salestagram, Main };
