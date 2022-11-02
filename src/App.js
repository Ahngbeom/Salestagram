/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function ProductRegisterForm() {
  return (
    <form>
      <label>Product Name:
        <input type="text" />
      </label>
      <label>Product Price:
        <input type="text" />
      </label>
      <label>Product Stock:
        <input type="text" />
      </label>
    </form>
  )
}

function App() {
  let [상품명, 상품변경] = useState(['A', 'B', 'C']);


  return (
    <div className="App">
      <div className='black-nav'>
        <img src="https://img.icons8.com/nolan/32/gift.png" />
        <span style={{ padding: '10px' }}>
          Salestagram
        </span>
      </div>
      <div className='App-header'>
        <button>상품 등록</button>
        <ProductRegisterForm />
        <ul>
          <li>
            {상품명[0]}
          </li>
          <li>
            {상품명[1]}
          </li>
          <li>
            {상품명[2]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
