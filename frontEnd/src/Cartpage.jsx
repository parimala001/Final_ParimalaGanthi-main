// Cartpage.jsx
import React, { useState, useEffect } from "react";
import "./cart.css"; // Import CSS file

function Cartpage({ username }) {
  const [cart, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8081/cart');
        if (!response.ok) {
          throw new Error(`Failed to fetch cart items: ${response.statusText}`);
        }
        const data = await response.json();
        setCartItems(data.cart);
      } catch (error) {
        console.error("Error retrieving cart items:", error);
        setError("Failed to retrieve cart items. Please try again later.");
      }
    };

    fetchCartItems();
  }, []);

  // Delete item from cart
  const handleDelete = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:8081/cart/${cartId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete item from cart: ${response.statusText}`);
      }
      // Update cart items after deletion
      setCartItems(cart.filter(item => item.cart_id !== cartId));
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      setError("Failed to delete item from cart. Please try again later.");
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    // Perform checkout process here
    // For demo purpose, just display order placed message
    setOrderPlaced(true);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Cart</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.cart_id} className="cart-item">
                <div>
                  <p><strong>Name:</strong> {item.products}</p>
                  <p><strong>Quantity:</strong> {item.quantities}</p>
                </div>
                <button onClick={() => handleDelete(item.cart_id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout} className="checkout-button">Checkout</button>
          {orderPlaced && <p className="order-placed">Order placed successfully!</p>}
        </div>
      )}
    </div>
  );
}

export default Cartpage;
