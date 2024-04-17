import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Cartpage from "./Cartpage";

function App() {
  const [currentPage, setCurrentPage] = useState('products');

  const navigateToCart = () => {
    setCurrentPage('cart');
  };

  return (
    <div className="container">
      <h1>{currentPage === 'products' ? 'Product List' : 'Cart Page'}</h1>
      {currentPage === 'products' && <ProductList navigateToCart={navigateToCart} />}
      {currentPage === 'cart' && <Cartpage />}
    </div>
  );
}

export default App;
