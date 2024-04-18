import React, { useState } from "react";
import LoginPage from "./UserLogin";
import RegisterPage from "./UserRegister";
import ProductList from "./ProductList";
import Cartpage from "./Cartpage";

import "./App.css";


function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState();

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
    setCurrentPage('products');
  };

  return (
    <div className="container">
      <nav className="nav-bar">
      <div className="nav-logo">The EBook Store</div>
        <button className="nav-button" onClick={() => navigateTo('login')}>
          Login
        </button>
        <button className="nav-button" onClick={() => navigateTo('register')}>
          Register
        </button>
        <button className="nav-button" onClick={() => navigateTo('products')}>
          Products
        </button>
        <button className="nav-button" onClick={() => navigateTo('cart')}>
          Cart
        </button>
      </nav>
      <div>
        {currentPage === 'login' && <LoginPage handleLoginSuccess={handleLoginSuccess} />}
        {currentPage === 'register' && <RegisterPage />}
        {currentPage === 'products' && <ProductList />}
        {currentPage === 'cart' && <Cartpage /> }
      </div>
    </div>
  );
}


export default App;
