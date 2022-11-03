/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from 'react';
import './App.css';
import ProductRegister from './Product/Register'
import ProductListCard from './Product/List'

function App() {
  let [상품명, 상품변경] = useState(['A', 'B', 'C']);
  let [Like, increaseLike] = useState(0);

  return (
    <div className="App">
      <div className='black-nav'>
        <img src="https://img.icons8.com/nolan/32/gift.png" />
        <span style={{ padding: '10px' }}>
          Salestagram
        </span>
      </div>
      <div className='App-header'>
        {/* <Button variant="primary">상품 등록</Button> */}
        <ProductRegister />
        <ul>
          <li>
            {상품명[0]}
            <span className=' ' onClick={() => { increaseLike(Like + 1) }}>👍 {Like}</span>
          </li>
          <li>
            {상품명[1]}
            <span className=' ' onClick={() => { increaseLike(Like + 1) }}>👍 {Like}</span>
          </li>
          <li>
            {상품명[2]}
            <span className=' ' onClick={() => { increaseLike(Like + 1) }}>👍 {Like}</span>
          </li>
        </ul>
      </div>
      <div>
        <ProductListCard />
      </div>
    </div>
  );
}

export default App;
