import React, { useEffect, useState } from "react";

function ProductList({ navigateToCart }) {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({}); // State to store quantities for each product

  useEffect(() => {
    fetch('http://localhost:8081/product')
      .then(res => res.json())
      .then(data => {
        // Initialize quantities state with default quantity of 1 for each product
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.product_id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
        setData(data);
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = async (product_id, product_name, quantity) => {
    try {
      const response = await fetch("http://localhost:8081/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id, product_name, quantity }), // Pass product_id, product_name, and quantity
      });

      if (response.ok) {
        console.log("Product added to cart:", product_name);
        // Add any additional logic here (e.g., update UI, show success message)
      } else {
        console.error("Failed to add product to cart:", response.statusText);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleQuantityChange = (product_id, event) => {
    const quantity = parseInt(event.target.value);
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [product_id]: quantity,
    }));
  };

  return (
    <div className="product-grid">
      {data.map((product, index) => (
        <div key={index} className="product-card">
          <img src={product.image} alt={product.product_name} />
          <div>
            <h3>{product.product_name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.pricing}</p>
            <p>Shipping Cost: {product.shipping_cost}</p>
            <input
              type="number"
              min="1"
              value={quantities[product.product_id] || 1}
              onChange={(event) => handleQuantityChange(product.product_id, event)} // Update quantity state
            />
            <button onClick={() => addToCart(product.product_id, product.product_name, quantities[product.product_id])}>Add to Cart</button>
          </div>
        </div>
      ))}
      <button onClick={navigateToCart}>Go to Cart</button>
    </div>
  );
}

export default ProductList;
